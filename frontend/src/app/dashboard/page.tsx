/**
 * Dashboard principal
 * Mostra diferentes interfaces para admin e usuário comum
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, isAdmin, clearAuth, User } from '@/lib/auth';
import UserDashboard from '@/components/UserDashboard';
import AdminDashboard from '@/components/AdminDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  if (loading) {
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

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h1 style={{ color: '#cbd5e1' }}>ClickAgenda</h1>
        <div>
          <span style={{ color: '#94a3b8', marginRight: '16px' }}>
            {user?.email} ({user?.role})
          </span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      {isAdmin() ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}

