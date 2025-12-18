/**
 * Página inicial
 * Redireciona para login se não autenticado, ou dashboard se autenticado
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona baseado no estado de autenticação
    if (isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <p style={{ color: '#94a3b8' }}>Carregando...</p>
    </div>
  );
}

