# ClickAgenda

Sistema de agendamento de horários com autenticação JWT, roles de usuário e admin, e relatórios mensais.

## Estrutura do Projeto

```
clickAgenda/
├── backend/          # API Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── routes/         # Definição de rotas
│   │   ├── middlewares/    # Autenticação e autorização
│   │   ├── database/       # Configuração e migrations
│   │   └── utils/          # Funções auxiliares
│   └── package.json
├── frontend/        # Next.js
│   ├── src/
│   │   ├── app/           # Páginas e rotas
│   │   ├── components/    # Componentes React
│   │   └── lib/          # Utilitários e API client
│   └── package.json
└── README.md
```

## Funcionalidades

### Usuário Comum
- Login e registro (apenas role 'user')
- Visualizar horários disponíveis
- Criar agendamentos
- Cancelar próprios agendamentos
- Ver lista de seus agendamentos

### Administrador
- Visualizar todos os agendamentos
- Filtrar por data ou mês
- Gerar relatórios mensais com estatísticas
- Ver todos os usuários do sistema

## Instalação

1. Instalar dependências:
```bash
npm run install:all
```

2. Configurar variáveis de ambiente:
```bash
cd backend
cp .env.example .env
# Edite o .env e configure JWT_SECRET
```

3. Executar migrations:
```bash
cd backend
npm run migrate
```

4. Iniciar servidores:

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

## Credenciais Padrão

**Admin:**
- Email: `admin@clickagenda.com`
- Senha: `admin123`

**Importante:** Altere a senha do admin em produção!

## Tecnologias

- **Backend:** Node.js, Express, SQLite, JWT, bcrypt
- **Frontend:** Next.js 14, React, TypeScript
- **Autenticação:** JWT com middleware de verificação
- **Banco de Dados:** SQLite (pode ser migrado para PostgreSQL)

## Segurança

- Senhas são hasheadas com bcrypt
- Validação de email no backend
- Middleware de autenticação em todas as rotas protegidas
- Verificação de role para rotas de admin
- Validação de dados no backend (não confia no frontend)

# clickAgenda
