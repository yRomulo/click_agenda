/**
 * Rotas de autenticação
 * Define endpoints para login e registro
 */

import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/register - Registra novo usuário (apenas role 'user')
router.post('/register', register);

// POST /api/auth/login - Realiza login
router.post('/login', login);

export default router;

