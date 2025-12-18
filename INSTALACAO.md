# Instruções de Instalação - ClickAgenda

## Passo a Passo

### 1. Instalar Dependências

Execute no diretório raiz:
```bash
npm run install:all
```

Ou instale manualmente:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configurar Backend

1. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cd backend
copy env.example .env
```

2. Edite o arquivo `.env` e configure:
   - `JWT_SECRET`: Use uma string aleatória e segura (ex: `meu_secret_super_seguro_123`)
   - `PORT`: Porta do servidor (padrão: 3001)
   - `FRONTEND_URL`: Apenas necessário em produção (em dev, aceita qualquer porta do localhost)

### 2.1. Configurar Frontend (Opcional)

Se o backend estiver em outra porta, crie um arquivo `.env.local` no frontend:
```bash
cd frontend
copy .env.local.example .env.local
# Edite se necessário (padrão: http://localhost:3001/api)
```

### 3. Executar Migrations

Crie o banco de dados e as tabelas:
```bash
cd backend
npm run migrate
```

Isso criará:
- Tabela de usuários
- Tabela de agendamentos
- Usuário admin padrão (email: `admin@clickagenda.com`, senha: `admin123`)

### 4. Iniciar Aplicação

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

### 5. Acessar Aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Credenciais Padrão

**Administrador:**
- Email: `admin@clickagenda.com`
- Senha: `admin123`

**⚠️ IMPORTANTE:** Altere a senha do admin em produção!

## Estrutura de Horários

O sistema trabalha com horários de **9h às 18h**, de hora em hora:
- 09:00, 10:00, 11:00, 12:00
- 13:00, 14:00, 15:00, 16:00, 17:00, 18:00

## Funcionalidades

### Usuário Comum
- Registro e login
- Ver horários disponíveis
- Criar agendamentos
- Cancelar próprios agendamentos

### Administrador
- Ver todos os agendamentos
- Filtrar por data ou mês
- Gerar relatórios mensais
- Ver todos os usuários

