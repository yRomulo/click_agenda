/**
 * Script de migração do banco de dados
 * Cria todas as tabelas necessárias para o sistema
 */

import db from './db.js';

/**
 * Executa todas as migrações
 */
async function migrate() {
  try {
    console.log('Iniciando migrações...');

    // Tabela de usuários
    await db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Tabela users criada');

    // Tabela de agendamentos
    await db.run(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'scheduled',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    console.log('✓ Tabela appointments criada');

    // Índices para melhor performance
    await db.run(`CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date)`);
    await db.run(`CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id)`);
    console.log('✓ Índices criados');

    // Cria usuário admin padrão (senha: admin123)
    // IMPORTANTE: Altere a senha em produção
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash('admin123', 10);
    
    try {
      await db.run(
        `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        ['admin@clickagenda.com', hashedPassword, 'admin']
      );
      console.log('✓ Usuário admin padrão criado (email: admin@clickagenda.com, senha: admin123)');
    } catch (err) {
      if (err.message.includes('UNIQUE constraint')) {
        console.log('ℹ Usuário admin já existe');
      } else {
        throw err;
      }
    }

    console.log('Migrações concluídas com sucesso!');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
  }
}

migrate();

