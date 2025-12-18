/**
 * Utilitários de autenticação
 * Gerencia token e informações do usuário no localStorage
 */

export interface User {
  id: number;
  email: string;
  role: 'user' | 'admin';
}

/**
 * Salva token e informações do usuário
 */
export const saveAuth = (token: string, user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

/**
 * Remove dados de autenticação
 */
export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

/**
 * Obtém token salvo
 */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Obtém usuário salvo
 */
export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

/**
 * Verifica se usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

/**
 * Verifica se usuário é admin
 */
export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === 'admin';
};

