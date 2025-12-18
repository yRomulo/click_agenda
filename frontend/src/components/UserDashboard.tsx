/**
 * Dashboard do usuário comum
 * Permite visualizar horários disponíveis e criar agendamentos
 */

'use client';

import { useState, useEffect } from 'react';
import { appointmentAPI } from '@/lib/api';

export default function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [myAppointments, setMyAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Define data padrão como hoje
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  // Carrega horários disponíveis quando data muda
  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots();
      loadMyAppointments();
    }
  }, [selectedDate]);

  const loadAvailableSlots = async () => {
    try {
      const data = await appointmentAPI.getAvailableSlots(selectedDate);
      setAvailableSlots(data.availableSlots);
    } catch (err: any) {
      setMessage(`Erro: ${err.message}`);
    }
  };

  const loadMyAppointments = async () => {
    try {
      const data = await appointmentAPI.getMyAppointments();
      setMyAppointments(data.appointments);
    } catch (err: any) {
      console.error('Erro ao carregar agendamentos:', err);
    }
  };

  const handleCreateAppointment = async (time: string) => {
    setLoading(true);
    setMessage('');

    try {
      await appointmentAPI.createAppointment(selectedDate, time);
      setMessage('Agendamento criado com sucesso!');
      loadAvailableSlots();
      loadMyAppointments();
    } catch (err: any) {
      setMessage(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id: number) => {
    if (!confirm('Deseja realmente cancelar este agendamento?')) return;

    try {
      await appointmentAPI.cancelAppointment(id);
      setMessage('Agendamento cancelado com sucesso!');
      loadMyAppointments();
      loadAvailableSlots();
    } catch (err: any) {
      setMessage(`Erro: ${err.message}`);
    }
  };

  return (
    <div>
      <div className="card">
        <h2 style={{ marginBottom: '16px', color: '#cbd5e1' }}>Novo Agendamento</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label className="label">Data</label>
          <input
            type="date"
            className="input"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {message && (
          <div className={message.includes('Erro') ? 'error' : 'success'}>
            {message}
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          <h3 style={{ marginBottom: '12px', color: '#cbd5e1' }}>Horários Disponíveis</h3>
          {availableSlots.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Não há horários disponíveis para esta data.</p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '12px'
            }}>
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  className="btn btn-primary"
                  onClick={() => handleCreateAppointment(slot)}
                  disabled={loading}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '16px', color: '#cbd5e1' }}>Meus Agendamentos</h2>
        {myAppointments.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>Você não possui agendamentos.</p>
        ) : (
          <div>
            {myAppointments
              .filter(apt => apt.status === 'scheduled')
              .map((apt) => (
                <div
                  key={apt.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    borderBottom: '1px solid #334155',
                  }}
                >
                  <div style={{ color: '#cbd5e1' }}>
                    <strong>{apt.date}</strong> às <strong>{apt.time}</strong>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelAppointment(apt.id)}
                  >
                    Cancelar
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

