# Sequência de Deploy - Passo a Passo

## 📋 Resumo

**1 repositório → 2 deploys diferentes**

- Mesmo repositório GitHub
- Frontend no Vercel (pasta `frontend/`)
- Backend no Railway (pasta `backend/`)

## 🎯 Sequência Recomendada

### Passo 1: Deploy do Backend (Railway)

1. Acesse [railway.app](https://railway.app)
2. Login com GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecione seu repositório `clickAgenda`
5. **IMPORTANTE**: Clique em "Settings" → "Root Directory" → Digite: `backend`
6. Variáveis de ambiente:
   ```
   JWT_SECRET=sua_chave_secreta_aqui
   NODE_ENV=production
   ```
   (FRONTEND_URL você adiciona depois)
7. Anote a URL gerada: `https://seu-app.railway.app`
8. Execute migrations no terminal do Railway: `npm run migrate`

### Passo 2: Deploy do Frontend (Vercel)

1. Acesse [vercel.com](https://vercel.com)
2. Login com GitHub
3. "Add New Project"
4. Importe o **MESMO** repositório `clickAgenda`
5. **IMPORTANTE**: Em "Root Directory", digite: `frontend`
6. Framework será detectado como Next.js automaticamente
7. Variável de ambiente:
   ```
   NEXT_PUBLIC_API_URL=https://seu-app.railway.app/api
   ```
   (Use a URL do Passo 1)
8. Deploy

### Passo 3: Atualizar CORS do Backend

1. Volte no Railway
2. Adicione a variável de ambiente:
   ```
   FRONTEND_URL=https://seu-app.vercel.app
   ```
   (Use a URL gerada pelo Vercel)
3. Reinicie o serviço se necessário

## ✅ Checklist Final

- [ ] Backend rodando em `https://seu-app.railway.app`
- [ ] Frontend rodando em `https://seu-app.vercel.app`
- [ ] Teste: `https://seu-app.railway.app/api/health` retorna `{"status":"ok"}`
- [ ] Teste: Frontend conecta ao backend (faça login)

## 🔍 Verificação

1. Acesse: `https://seu-app.railway.app/api/health`
   - Deve retornar: `{"status":"ok","message":"Servidor funcionando"}`

2. Acesse: `https://seu-app.vercel.app`
   - Deve carregar a página de login

3. Tente fazer login
   - Se funcionar, está tudo certo! ✅

## ❓ Problemas Comuns

**Erro de CORS:**
- Verifique se `FRONTEND_URL` no Railway está correto
- Deve ser exatamente a URL do Vercel (sem barra no final)

**Frontend não conecta:**
- Verifique se `NEXT_PUBLIC_API_URL` no Vercel está correto
- Deve terminar com `/api`

**Backend não inicia:**
- Verifique se `JWT_SECRET` está configurado no Railway
- Verifique logs no Railway

