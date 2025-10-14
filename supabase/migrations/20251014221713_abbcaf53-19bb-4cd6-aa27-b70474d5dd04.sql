-- Criar tabela de ranking para armazenar pontuações dos jogadores
CREATE TABLE IF NOT EXISTS public.rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS - Permitir leitura pública do ranking
CREATE POLICY "Todos podem ver o ranking"
  ON public.rankings
  FOR SELECT
  USING (true);

-- Permitir inserção pública de novas pontuações
CREATE POLICY "Todos podem adicionar pontuações"
  ON public.rankings
  FOR INSERT
  WITH CHECK (true);

-- Criar índice para melhor performance nas consultas ordenadas
CREATE INDEX idx_rankings_score ON public.rankings(score DESC, created_at DESC);