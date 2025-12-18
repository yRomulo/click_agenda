# Guia de Deploy - ClickAgenda

## Estrutura de Deploy

Esta aplicação tem duas partes:
- **Frontend (Next.js)**: Hospedado no Vercel
- **Backend (Node.js/Express)**: Hospedado em Railway, Render ou similar

## 1. Deploy do Backend

### Opção A: Railway (Recomendado)

1. Acesse [Railway.app](https://railway.app) e faça login
2. Clique em "New Project" → "Deploy from GitHub repo"
3. Selecione o repositório e configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Adicione variáveis de ambiente:
   - `JWT_SECRET`: Gere uma string aleatória segura
   - `PORT`: Deixe Railway definir automaticamente
   - `NODE_ENV`: `production`
5. Railway gerará uma URL automática (ex: `https://seu-app.railway.app`)
6. Anote essa URL para usar no frontend

### Opção B: Render

1. Acesse [Render.com](https://render.com) e faça login
2. Clique em "New" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Adicione as mesmas variáveis de ambiente do Railway
6. Render gerará uma URL (ex: `https://seu-app.onrender.com`)

### Configuração do Backend para Produção

No arquivo `backend/package.json`, certifique-se de ter:

```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

## 2. Deploy do Frontend no Vercel

### Passo a Passo:

1. **Instale a CLI do Vercel** (opcional, pode usar o site):
   ```bash
   npm i -g vercel
   ```

2. **Configure variáveis de ambiente**:
   - Crie um arquivo `.env.production` no diretório `frontend`:
   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api
   ```
   - Substitua pela URL do seu backend

3. **Deploy via CLI**:
   ```bash
   cd frontend
   vercel
   ```
   - Siga as instruções
   - Quando perguntar sobre o diretório, confirme `frontend`

4. **Deploy via GitHub** (Recomendado):
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe seu repositório GitHub
   - Configure:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build` (automático)
     - **Output Directory**: `.next` (automático)
   - Adicione variável de ambiente:
     - `NEXT_PUBLIC_API_URL`: URL do seu backend
   - Clique em "Deploy"

5. **Configurar CORS no Backend**:
   - No arquivo `backend/src/server.js`, atualize:
   ```javascript
   FRONTEND_URL=https://seu-app.vercel.app
   ```
   - Ou adicione no `.env` do backend em produção

## 3. Configurações Finais

### Backend (.env em produção):
```env
PORT=3000
JWT_SECRET=sua_chave_secreta_super_segura_aqui
NODE_ENV=production
FRONTEND_URL=https://seu-app.vercel.app
DB_PATH=./database/agenda.db
```

### Frontend (.env.production no Vercel):
```
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api
```

## 4. Executar Migrations em Produção

Após o deploy do backend, execute as migrations:

**Via Railway:**
- Use o terminal do Railway ou SSH
- Execute: `npm run migrate`

**Via Render:**
- Use o shell do Render
- Execute: `npm run migrate`

## 5. Verificações

1. ✅ Backend acessível em `https://seu-backend.railway.app/api/health`
2. ✅ Frontend acessível em `https://seu-app.vercel.app`
3. ✅ CORS configurado corretamente
4. ✅ Variáveis de ambiente configuradas
5. ✅ Migrations executadas

## Troubleshooting

**Erro de CORS:**
- Verifique se `FRONTEND_URL` no backend está correto
- Certifique-se que o CORS aceita a URL do Vercel

**Erro 500 no backend:**
- Verifique logs no Railway/Render
- Certifique-se que `JWT_SECRET` está configurado
- Verifique se as migrations foram executadas

**Frontend não conecta ao backend:**
- Verifique se `NEXT_PUBLIC_API_URL` está correto no Vercel
- Certifique-se que a URL termina com `/api`
- Verifique se o backend está rodando

## URLs de Exemplo

- Frontend: `https://clickagenda.vercel.app`
- Backend: `https://clickagenda-backend.railway.app`
- API Health: `https://clickagenda-backend.railway.app/api/health`

