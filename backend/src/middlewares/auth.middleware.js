/**
 * Middleware de autenticação
 * Verifica se o token JWT é válido e adiciona informações do usuário ao request
 */

import jwt from 'jsonwebtoken';
import db from '../database/db.js';

/**
 * Middleware que verifica se o usuário está autenticado
 * Extrai o token do header Authorization e valida
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extrai o token do header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca o usuário no banco para garantir que ainda existe
    const user = await db.get('SELECT id, email, role FROM users WHERE id = ?', [decoded.userId]);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Adiciona informações do usuário ao request para uso nas rotas
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(500).json({ error: 'Erro ao autenticar' });
  }
};

/**
 * Middleware que verifica se o usuário é administrador
 * Deve ser usado após o middleware authenticate
 */
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

