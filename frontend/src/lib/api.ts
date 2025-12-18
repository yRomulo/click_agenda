/**
 * Cliente API para comunicação com o backend
 * Centraliza todas as chamadas HTTP
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Função auxiliar para fazer requisições
 * Trata erros de rede e de resposta do servidor
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Se a resposta não for ok, tenta extrair mensagem de erro
    if (!response.ok) {
      let errorMessage = 'Erro na requisição';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // Se não conseguir parsear JSON, usa mensagem padrão baseada no status
        if (response.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
        } else if (response.status === 403) {
          errorMessage = 'Acesso negado.';
        } else if (response.status === 404) {
          errorMessage = 'Recurso não encontrado.';
        } else if (response.status >= 500) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        }
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    // Trata erros de rede (backend não está rodando, CORS, etc)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 3001.');
    }
    // Re-lança outros erros
    throw error;
  }
}

// Autenticação
export const authAPI = {
  register: (email: string, password: string) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email: string, password: string) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// Agendamentos
export const appointmentAPI = {
  getAvailableSlots: (date: string) =>
    fetchAPI(`/appointments/available?date=${date}`),

  createAppointment: (date: string, time: string) =>
    fetchAPI('/appointments', {
      method: 'POST',
      body: JSON.stringify({ date, time }),
    }),

  getMyAppointments: () =>
    fetchAPI('/appointments/my'),

  cancelAppointment: (id: number) =>
    fetchAPI(`/appointments/${id}`, {
      method: 'DELETE',
    }),
};

// Admin
export const adminAPI = {
  getAllAppointments: (date?: string, month?: string) => {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (month) params.append('month', month);
    return fetchAPI(`/admin/appointments?${params.toString()}`);
  },

  getMonthlyReport: (month: string) =>
    fetchAPI(`/admin/reports/monthly?month=${month}`),

  getAllUsers: () =>
    fetchAPI('/admin/users'),
};

