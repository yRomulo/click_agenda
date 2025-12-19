/**
 * Servidor principal da aplicação
 * Configura Express, rotas e middlewares
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Carrega variáveis de ambiente
dotenv.config();

// Valida variáveis de ambiente obrigatórias
if (!process.env.JWT_SECRET) {
  console.error('ERRO: JWT_SECRET não configurado no arquivo .env');
  console.error('Copie o arquivo env.example para .env e configure o JWT_SECRET');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsing JSON
app.use(express.json());

// Middleware CORS - permite requisições do frontend
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
    ];

    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, origin); // ⚠️ CRÍTICO
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

