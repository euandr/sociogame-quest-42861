-- Create rankings table for storing player scores
CREATE TABLE IF NOT EXISTS public.rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_rankings_score ON public.rankings(score DESC, created_at ASC);

-- Enable Row Level Security
ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read rankings (public leaderboard)
CREATE POLICY "Anyone can view rankings"
ON public.rankings
FOR SELECT
USING (true);

-- Create policy to allow anyone to insert their score
CREATE POLICY "Anyone can insert rankings"
ON public.rankings
FOR INSERT
WITH CHECK (true);