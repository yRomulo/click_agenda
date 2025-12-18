# Deploy Rápido - ClickAgenda

## 📦 Estrutura do Repositório

**Você usa o MESMO repositório para ambos!** A estrutura é:
```
clickAgenda/
├── backend/          ← Backend vai no Railway
├── frontend/         ← Frontend vai no Vercel
└── README.md
```

Ambos os serviços permitem especificar o "Root Directory" durante o deploy.

## 🚀 Deploy do Frontend no Vercel

### Método 1: Via Site (Mais Fácil)

1. **Acesse [vercel.com](https://vercel.com)** e faça login com GitHub
2. Clique em **"Add New Project"**
3. **Importe seu repositório** (o mesmo repositório que terá o backend)
4. Configure:
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `frontend` ⬅️ **IMPORTANTE: Especifique esta pasta**
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)
5. **Adicione variável de ambiente**:
   - Nome: `NEXT_PUBLIC_API_URL`
   - Valor: `https://seu-backend.railway.app/api` (você adiciona depois do deploy do backend)
6. Clique em **"Deploy"**

### Método 2: Via CLI

```bash
cd frontend
npm i -g vercel
vercel
# Quando perguntar sobre o diretório, confirme "frontend"
```

## 🔧 Deploy do Backend (Railway - Recomendado)

1. **Acesse [railway.app](https://railway.app)** e faça login
2. Clique em **"New Project"** → **"Deploy from GitHub repo"**
3. **Selecione o MESMO repositório** que usou no Vercel
4. Configure:
   - **Root Directory**: `backend` ⬅️ **IMPORTANTE: Especifique esta pasta**
5. **Adicione variáveis de ambiente**:
   - `JWT_SECRET`: Gere uma string aleatória (ex: `openssl rand -hex 32`)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: URL do seu frontend no Vercel (ex: `https://seu-app.vercel.app`) - adicione depois do deploy do frontend
6. Railway gerará uma URL automaticamente (ex: `https://seu-app.railway.app`)
7. **Execute migrations**:
   - No terminal do Railway, execute: `npm run migrate`

## 📝 Checklist Final

- [ ] Backend deployado no Railway
- [ ] Frontend deployado no Vercel
- [ ] `NEXT_PUBLIC_API_URL` configurado no Vercel com a URL do Railway
- [ ] `FRONTEND_URL` configurado no Railway com a URL do Vercel
- [ ] `JWT_SECRET` configurado no Railway
- [ ] Migrations executadas no Railway
- [ ] Teste: Acesse `https://seu-backend.railway.app/api/health`

## 🔗 URLs de Exemplo

Após o deploy, você terá:
- **Frontend**: `https://seu-app.vercel.app`
- **Backend**: `https://seu-app.railway.app`
- **API Health**: `https://seu-app.railway.app/api/health`

