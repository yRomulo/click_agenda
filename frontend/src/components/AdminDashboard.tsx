/**
 * Dashboard do administrador
 * Visualização de agendamentos através de calendário
 */

'use client';

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import Calendar from './Calendar';

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dayAppointments, setDayAppointments] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [appointmentsByDate, setAppointmentsByDate] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  // Carrega todos os agendamentos do mês atual ao montar e ao mudar mês
  useEffect(() => {
    loadMonthAppointments();
  }, [currentMonth, currentYear]);

  // Carrega agendamentos do dia selecionado
  useEffect(() => {
    if (selectedDate) {
      loadDayAppointments();
    } else {
      setDayAppointments([]);
    }
  }, [selectedDate]);

  const loadMonthAppointments = async () => {
    setLoading(true);
    try {
      const month = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
      const data = await adminAPI.getAllAppointments(undefined, month);
      
      // Agrupa agendamentos por data e conta quantos tem em cada dia
      const byDate: { [key: string]: number } = {};
      data.appointments.forEach((apt: any) => {
        byDate[apt.date] = (byDate[apt.date] || 0) + 1;
      });
      
      setAppointmentsByDate(byDate);
    } catch (err: any) {
      console.error('Erro ao carregar agendamentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDayAppointments = async () => {
    if (!selectedDate) return;

    setLoading(true);
    try {
      const data = await adminAPI.getAllAppointments(selectedDate);
      setDayAppointments(data.appointments);
    } catch (err: any) {
      console.error('Erro ao carregar agendamentos do dia:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentYear, currentMonth + direction, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setSelectedDate(null);
  };

  const goToMonth = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
    setSelectedDate(null);
    setShowMonthPicker(false);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(null);
    setShowMonthPicker(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center', marginBottom: '24px', position: 'relative' }}>
        <button
          className="btn btn-secondary"
          onClick={() => changeMonth(-1)}
          style={{ justifySelf: 'start' }}
        >
          ← Mês Anterior
        </button>
        
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-primary"
            onClick={() => setShowMonthPicker(!showMonthPicker)}
          >
            {showMonthPicker ? 'Fechar' : 'Selecionar data'}
          </button>
          
          {showMonthPicker && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '8px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              minWidth: '300px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label className="label" style={{ marginBottom: '8px' }}>Ano</label>
                <input
                  type="number"
                  className="input"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(parseInt(e.target.value) || currentYear)}
                  min="2020"
                  max="2100"
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label className="label" style={{ marginBottom: '8px' }}>Mês</label>
                <select
                  className="input"
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                >
                  <option value="0">Janeiro</option>
                  <option value="1">Fevereiro</option>
                  <option value="2">Março</option>
                  <option value="3">Abril</option>
                  <option value="4">Maio</option>
                  <option value="5">Junho</option>
                  <option value="6">Julho</option>
                  <option value="7">Agosto</option>
                  <option value="8">Setembro</option>
                  <option value="9">Outubro</option>
                  <option value="10">Novembro</option>
                  <option value="11">Dezembro</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => goToMonth(currentYear, currentMonth)}
                  style={{ flex: 1 }}
                >
                  Ir
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={goToToday}
                  style={{ flex: 1 }}
                >
                  Hoje
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => changeMonth(1)}
          style={{ justifySelf: 'end' }}
        >
          Próximo Mês →
        </button>
      </div>

      <Calendar
        year={currentYear}
        month={currentMonth}
        appointmentsByDate={appointmentsByDate}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
      />

      {selectedDate && (
        <div className="card" style={{ marginTop: '24px' }}>
          <h2 style={{ marginBottom: '16px', color: '#cbd5e1' }}>
            Agendamentos - {formatDate(selectedDate)}
          </h2>
          {loading ? (
            <p style={{ color: '#94a3b8' }}>Carregando...</p>
          ) : dayAppointments.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>Nenhum agendamento para esta data.</p>
          ) : (
            <div>
              {dayAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((apt) => (
                  <div
                    key={apt.id}
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #334155',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '18px', color: '#94a3b8' }}>
                        {apt.time}
                      </strong>
                      <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                        {apt.user_email}
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      background: apt.status === 'scheduled' ? '#1e3a2e' : '#3a1e1e',
                      color: apt.status === 'scheduled' ? '#4ade80' : '#f87171',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: `1px solid ${apt.status === 'scheduled' ? '#4ade80' : '#f87171'}`
                    }}>
                      {apt.status === 'scheduled' ? 'Agendado' : 'Cancelado'}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

