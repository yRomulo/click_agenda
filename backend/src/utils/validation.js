/**
 * Utilitários de validação
 * Funções auxiliares para validar dados do sistema
 */

/**
 * Valida formato de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - true se válido, false caso contrário
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de data (YYYY-MM-DD)
 * @param {string} date - Data a ser validada
 * @returns {boolean} - true se válido, false caso contrário
 */
export const isValidDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Valida formato de horário (HH:MM)
 * @param {string} time - Horário a ser validado
 * @returns {boolean} - true se válido, false caso contrário
 */
export const isValidTime = (time) => {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Valida se a senha tem pelo menos 6 caracteres
 * @param {string} password - Senha a ser validada
 * @returns {boolean} - true se válido, false caso contrário
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

