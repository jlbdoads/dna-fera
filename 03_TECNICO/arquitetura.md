# Arquitetura — DNA FERA

## Stack Tecnológica

### Frontend
- **Framework:** Next.js (React)
- **Styling:** TailwindCSS
- **Mobile:** PWA (Progressive Web App)
- **Deploy:** Vercel

### Backend
- **API:** Next.js API Routes
- **Banco:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Google, Email)
- **Arquivo:** Supabase Storage

### IA & Serviços
- **Chatbot:** OpenAI GPT-4 / Anthropic Claude
- **Análise de imagem:** OpenAI Vision / Claude Vision
- **Email:** Resend / SendGrid

### Pagamentos
- **Gateway:** Mercado Pago (Brasil) / Stripe
- **Assinaturas:** Mercado Pago Subscriptions

---

## Estrutura de Pastas

```
/dna-fera/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Landing
│   │   ├── quiz/            # Quiz pages
│   │   ├── resultado/       # Result pages
│   │   ├── api/             # API routes
│   │   └── admin/           # Dashboard admin
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   ├── hooks/               # Custom hooks
│   └── styles/              # Global styles
├── public/                  # Static files
├── supabase/                # DB migrations
└── vercel.json              # Vercel config
```

---

## Diagrama de Dados

```
users
├── id (uuid)
├── email
├── name
├── avatar_url
├── created_at
└── plan (free/basic/premium)

quiz_responses
├── id (uuid)
├── user_id (fk)
├── quiz_id
├── answers (jsonb)
├── score
└── created_at

results
├── id (uuid)
├── user_id (fk)
├── style_type
├── color_palette (jsonb)
├── recommendations (jsonb)
└── created_at

creators (white-label)
├── id (uuid)
├── user_id (fk)
├── subdomain
├── custom_colors (jsonb)
├── logo_url
├── affiliate_links (jsonb)
└── plan

subscriptions
├── id (uuid)
├── user_id (fk)
├── plan
├── status
├── mercado_pago_id
└── created_at
```

---

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/quiz/submit | Enviar respostas |
| GET | /api/result/:id | Buscar resultado |
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Cadastro |
| POST | /api/webhook/mercadopago | Webhook pagamento |
| POST | /api/ai/recommend | Recomendação IA |
| GET | /api/creator/:subdomain | Dados do creator |
