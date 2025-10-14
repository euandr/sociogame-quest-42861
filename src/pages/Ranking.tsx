import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { PlayerScore } from '@/types/game';
import { Trophy, Medal, Award, Home, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const Ranking = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState<PlayerScore[]>([]);
  const [loading, setLoading] = useState(true);
  const playerName = localStorage.getItem('playerName');

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      const { data, error } = await supabase
        .from('rankings')
        .select('*')
        .order('score', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(10);

      if (error) throw error;
      
      setRankings(data || []);
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      toast.error('Erro ao carregar ranking');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    navigate('/concepts');
  };

  const handleGoHome = () => {
    localStorage.removeItem('playerName');
    navigate('/');
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-6 h-6 text-accent" />;
      case 1:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 2:
        return <Award className="w-6 h-6 text-primary" />;
      default:
        return <span className="w-6 text-center font-bold text-muted-foreground">{position + 1}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full mb-6 animate-pulse-glow">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Ranking Global
          </h1>
          <p className="text-muted-foreground text-lg">
            Top 10 Melhores Pontuações
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-border/50">
          {rankings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhuma pontuação registrada ainda.</p>
              <p className="text-sm text-muted-foreground mt-2">Seja o primeiro a jogar!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rankings.map((entry, index) => {
                const isCurrentPlayer = entry.player_name === playerName;
                const isTopThree = index < 3;
                
                return (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
                      isTopThree 
                        ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30' 
                        : 'bg-muted/30'
                    } ${
                      isCurrentPlayer ? 'ring-2 ring-primary shadow-lg' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center w-12">
                      {getMedalIcon(index)}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-bold ${isCurrentPlayer ? 'text-primary' : 'text-foreground'}`}>
                        {entry.player_name}
                        {isCurrentPlayer && <span className="text-xs ml-2 text-primary">(Você)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{entry.score}</p>
                      <p className="text-xs text-muted-foreground">pontos</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handlePlayAgain}
            variant="game"
            size="lg"
            className="flex-1 h-14"
          >
            <RotateCcw className="mr-2" />
            Jogar Novamente
          </Button>
          
          <Button
            onClick={handleGoHome}
            variant="outline"
            size="lg"
            className="flex-1 h-14"
          >
            <Home className="mr-2" />
            Tela Inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
