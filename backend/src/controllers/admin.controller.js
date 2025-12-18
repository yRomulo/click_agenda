/**
 * Controller de administração
 * Funcionalidades exclusivas para administradores
 */

import db from '../database/db.js';
import { isValidDate } from '../utils/validation.js';

/**
 * Lista todos os agendamentos (apenas admin)
 * Pode filtrar por data ou mês
 */
export const getAllAppointments = async (req, res) => {
  try {
    const { date, month } = req.query;

    let query = `
      SELECT 
        a.id,
        a.date,
        a.time,
        a.status,
        a.created_at,
        u.email as user_email
      FROM appointments a
      INNER JOIN users u ON a.user_id = u.id
    `;
    const params = [];

    // Filtro por data específica
    if (date && isValidDate(date)) {
      query += ' WHERE a.date = ?';
      params.push(date);
    }
    // Filtro por mês (formato YYYY-MM)
    else if (month) {
      query += ' WHERE strftime("%Y-%m", a.date) = ?';
      params.push(month);
    }

    query += ' ORDER BY a.date DESC, a.time DESC';

    const appointments = await db.all(query, params);

    res.json({ appointments });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
};

/**
 * Gera relatório de agendamentos por mês (apenas admin)
 * Retorna estatísticas e lista de agendamentos
 */
export const getMonthlyReport = async (req, res) => {
  try {
    const { month } = req.query; // Formato YYYY-MM

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ error: 'Mês inválido. Use formato YYYY-MM' });
    }

    // Busca todos os agendamentos do mês
    const appointments = await db.all(
      `SELECT 
        a.id,
        a.date,
        a.time,
        a.status,
        a.created_at,
        u.email as user_email
      FROM appointments a
      INNER JOIN users u ON a.user_id = u.id
      WHERE strftime("%Y-%m", a.date) = ?
      ORDER BY a.date, a.time`,
      [month]
    );

    // Calcula estatísticas
    const total = appointments.length;
    const scheduled = appointments.filter(a => a.status === 'scheduled').length;
    const cancelled = appointments.filter(a => a.status === 'cancelled').length;

    // Agrupa por data
    const byDate = {};
    appointments.forEach(apt => {
      if (!byDate[apt.date]) {
        byDate[apt.date] = [];
      }
      byDate[apt.date].push(apt);
    });

    res.json({
      month,
      statistics: {
        total,
        scheduled,
        cancelled
      },
      appointmentsByDate: byDate,
      appointments
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório' });
  }
};

/**
 * Lista todos os usuários do sistema (apenas admin)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await db.all(
      `SELECT id, email, role, created_at 
       FROM users 
       ORDER BY created_at DESC`
    );

    res.json({ users });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

