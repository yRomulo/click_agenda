/**
 * Utilitário para verificar se o backend está acessível
 * Útil para diagnóstico de problemas de conexão
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Verifica se o backend está respondendo
 */
export async function checkBackendConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return { connected: true, message: 'Backend está funcionando' };
    } else {
      return { connected: false, message: 'Backend retornou erro' };
    }
  } catch (error: any) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        connected: false,
        message: 'Backend não está acessível. Verifique se está rodando na porta 3001.',
      };
    }
    return { connected: false, message: `Erro: ${error.message}` };
  }
}

