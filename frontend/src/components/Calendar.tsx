/**
 * Componente de calendário
 * Exibe um calendário mensal com destaque para dias com agendamentos
 */

'use client';

interface CalendarProps {
  year: number;
  month: number;
  appointmentsByDate: { [key: string]: number };
  selectedDate: string | null;
  onDateClick: (date: string) => void;
}

export default function Calendar({ year, month, appointmentsByDate, selectedDate, onDateClick }: CalendarProps) {
  // Nomes dos dias da semana
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Gera array de dias do mês
  const days = [];
  
  // Dias vazios antes do primeiro dia do mês
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    days.push({
      day,
      date: dateStr,
      hasAppointments: appointmentsByDate[dateStr] > 0,
      count: appointmentsByDate[dateStr] || 0
    });
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div style={{ 
      background: '#1e293b', 
      borderRadius: '12px', 
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      border: '1px solid #334155'
    }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center', color: '#cbd5e1' }}>
        {monthNames[month]} {year}
      </h3>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '8px',
        marginBottom: '8px'
      }}>
        {weekDays.map(day => (
          <div key={day} style={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: '#94a3b8',
            padding: '8px'
          }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '8px'
      }}>
        {days.map((dayData, index) => {
          if (dayData === null) {
            return <div key={index} style={{ padding: '12px' }} />;
          }

          const isSelected = selectedDate === dayData.date;
          const isToday = dayData.date === new Date().toISOString().split('T')[0];

          return (
            <button
              key={dayData.date}
              onClick={() => onDateClick(dayData.date)}
              style={{
                padding: '12px',
                border: isSelected ? '2px solid #64748b' : isToday ? '2px solid #4ade80' : '2px solid #334155',
                borderRadius: '8px',
                background: isSelected ? '#475569' : isToday ? '#1e3a2e' : dayData.hasAppointments ? '#3a3a2a' : '#0f172a',
                color: isSelected ? '#f1f5f9' : isToday ? '#4ade80' : dayData.hasAppointments ? '#fbbf24' : '#cbd5e1',
                cursor: 'pointer',
                fontWeight: isToday ? 'bold' : 'normal',
                position: 'relative',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = dayData.hasAppointments ? '#4a4a3a' : '#1e293b';
                  e.currentTarget.style.borderColor = '#475569';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = dayData.hasAppointments ? '#3a3a2a' : '#0f172a';
                  e.currentTarget.style.borderColor = isToday ? '#4ade80' : '#334155';
                }
              }}
            >
              <div>{dayData.day}</div>
              {dayData.hasAppointments && (
                <div style={{
                  fontSize: '10px',
                  marginTop: '4px',
                  fontWeight: 'bold',
                  color: isSelected ? '#f1f5f9' : '#fbbf24'
                }}>
                  {dayData.count}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        gap: '16px', 
        justifyContent: 'center',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#1e3a2e', border: '2px solid #4ade80', borderRadius: '4px' }} />
          <span>Hoje</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#3a3a2a', border: '2px solid #334155', borderRadius: '4px' }} />
          <span>Com agendamentos</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#475569', border: '2px solid #64748b', borderRadius: '4px' }} />
          <span>Selecionado</span>
        </div>
      </div>
    </div>
  );
}

