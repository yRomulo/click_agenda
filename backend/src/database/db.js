/**
 * Configuração e conexão com o banco de dados SQLite
 * Gerencia a conexão única com o banco
 */

import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import './migrate'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria diretório do banco se não existir
const dbDir = path.join(__dirname, '../../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dbDir, 'agenda.db');

// Cria conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Promisifica métodos do banco para usar async/await
// Salva referência original do run antes de sobrescrever
const originalRun = db.run.bind(db);

// db.run precisa preservar lastID
db.run = function(sql, params) {
  return new Promise((resolve, reject) => {
    originalRun(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

db.get = promisify(db.get.bind(db));
db.all = promisify(db.all.bind(db));

export default db;

