-- Tabelas para o DNA FERA

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'premium'))
);

-- Tabela de respostas do quiz
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  answers JSONB NOT NULL,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de resultados
CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  style_type TEXT,
  color_palette JSONB,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de criadores (white-label)
CREATE TABLE IF NOT EXISTS creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  subdomain TEXT UNIQUE,
  custom_colors JSONB,
  logo_url TEXT,
  affiliate_links JSONB,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'premium')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de assinaturas
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  mercado_pago_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Allow public access to quiz_responses" ON quiz_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public access to results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public access to users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public access to users insert" ON users FOR INSERT WITH CHECK (true);
