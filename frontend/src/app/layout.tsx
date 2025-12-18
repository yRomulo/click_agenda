/**
 * Layout principal da aplicação
 * Define estrutura HTML base e estilos globais
 */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClickAgenda - Sistema de Agendamento',
  description: 'Sistema de agendamento de horários',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

