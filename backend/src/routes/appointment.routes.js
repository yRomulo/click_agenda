/**
 * Rotas de agendamentos
 * Define endpoints para gerenciar agendamentos de usuários
 */

import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  getAvailableSlots,
  createAppointment,
  getMyAppointments,
  cancelAppointment
} from '../controllers/appointment.controller.js';

const router = express.Router();

// GET /api/appointments/available - Lista horários disponíveis (público)
router.get('/available', getAvailableSlots);

// Todas as rotas abaixo exigem autenticação
router.use(authenticate);

// GET /api/appointments/my - Lista agendamentos do usuário autenticado
router.get('/my', getMyAppointments);

// POST /api/appointments - Cria novo agendamento
router.post('/', createAppointment);

// DELETE /api/appointments/:id - Cancela agendamento
router.delete('/:id', cancelAppointment);

export default router;

