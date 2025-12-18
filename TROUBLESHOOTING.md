# Guia de Solução de Problemas

## Erro "Failed to fetch"

Este erro geralmente ocorre quando o frontend não consegue se comunicar com o backend.

### Verificações:

1. **Backend está rodando?**
   - Abra um terminal e execute: `cd backend && npm run dev`
   - Você deve ver: `Servidor rodando na porta 3001`
   - Se não aparecer, verifique se a porta 3001 está livre

2. **Backend tem as dependências instaladas?**
   ```bash
   cd backend
   npm install
   ```

3. **Backend tem o arquivo .env configurado?**
   ```bash
   cd backend
   copy env.example .env
   # Edite o .env e configure JWT_SECRET
   ```

4. **Migrations foram executadas?**
   ```bash
   cd backend
   npm run migrate
   ```

5. **Frontend está usando a URL correta?**
   - Por padrão, o frontend tenta conectar em `http://localhost:3001/api`
   - Se o backend estiver em outra porta, crie um arquivo `.env.local` no frontend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

6. **CORS está configurado?**
   - O backend aceita automaticamente qualquer porta do localhost em desenvolvimento
   - Se o Next.js mudar a porta (ex: 3002), o CORS já está configurado para aceitar
   - Em produção, configure `FRONTEND_URL` no `.env` do backend

### Teste Manual:

1. Abra o navegador e acesse: `http://localhost:3001/api/health`
2. Você deve ver: `{"status":"ok","message":"Servidor funcionando"}`
3. Se não funcionar, o backend não está rodando corretamente

### Erros Comuns:

**"Cannot find module"**
- Execute `npm install` no diretório do backend

**"Port 3001 is already in use"**
- Altere a porta no arquivo `.env` do backend
- Atualize também a URL no frontend

**"Database locked"**
- Feche outras conexões com o banco
- Reinicie o servidor backend

**"JWT_SECRET is required"**
- Configure o JWT_SECRET no arquivo `.env` do backend

