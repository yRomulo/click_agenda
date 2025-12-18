/**
 * Rotas de administração
 * Define endpoints exclusivos para administradores
 */

import express from 'express';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';
import {
  getAllAppointments,
  getMonthlyReport,
  getAllUsers
} from '../controllers/admin.controller.js';

const router = express.Router();

// Todas as rotas de admin exigem autenticação e permissão de admin
router.use(authenticate);
router.use(isAdmin);

// GET /api/admin/appointments - Lista todos os agendamentos
router.get('/appointments', getAllAppointments);

// GET /api/admin/reports/monthly - Gera relatório mensal
router.get('/reports/monthly', getMonthlyReport);

// GET /api/admin/users - Lista todos os usuários
router.get('/users', getAllUsers);

export default router;

