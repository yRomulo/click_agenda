/**
 * Controller de agendamentos
 * Gerencia criação, listagem e cancelamento de agendamentos
 */

import db from '../database/db.js';
import { isValidDate, isValidTime } from '../utils/validation.js';

/**
 * Lista horários disponíveis para uma data específica
 */
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!isValidDate(date)) {
      return res.status(400).json({ error: 'Data inválida. Use formato YYYY-MM-DD' });
    }

    const allSlots = [
      '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
    ];

    const bookedSlots = await db.all(
      `SELECT time FROM appointments 
       WHERE date = ? AND status = 'scheduled'`,
      [date]
    );

    const bookedTimes = bookedSlots.map(slot => slot.time);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.json({
      date,
      availableSlots
    });
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error);
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis' });
  }
};

/**
 * Cria um novo agendamento
 */
export const createAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;
    const userId = req.user.id;

    if (!isValidDate(date)) {
      return res.status(400).json({ error: 'Data inválida. Use formato YYYY-MM-DD' });
    }

    if (!isValidTime(time)) {
      return res.status(400).json({ error: 'Horário inválido. Use formato HH:MM' });
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      return res.status(400).json({ error: 'Não é possível agendar para datas passadas' });
    }

    const existingAppointment = await db.get(
      `SELECT id FROM appointments 
       WHERE date = ? AND time = ? AND status = 'scheduled'`,
      [date, time]
    );

    if (existingAppointment) {
      return res.status(400).json({ error: 'Horário já está ocupado' });
    }

    const result = await db.run(
      `INSERT INTO appointments (user_id, date, time, status) 
       VALUES (?, ?, ?, 'scheduled')`,
      [userId, date, time]
    );

    res.status(201).json({
      appointment: {
        id: result.lastID,
        date,
        time,
        status: 'scheduled'
      }
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
};

/**
 * Lista agendamentos do usuário autenticado
 */
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await db.all(
      `SELECT id, date, time, status, created_at 
       FROM appointments 
       WHERE user_id = ? 
       ORDER BY date DESC, time DESC`,
      [req.user.id]
    );

    res.json({ appointments });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
};

/**
 * Cancela um agendamento do usuário
 */
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.run(
      'UPDATE appointments SET status = ? WHERE id = ? AND user_id = ?',
      ['cancelled', id, req.user.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }

    res.json({ message: 'Agendamento cancelado com sucesso' });
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({ error: 'Erro ao cancelar agendamento' });
  }
};

