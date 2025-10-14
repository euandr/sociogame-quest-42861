import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Trophy, BookOpen, Play } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 animate-pulse-glow">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Quiz de Sociologia
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Teste seus conhecimentos e alcance o topo do ranking!
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 mb-6 animate-scale-in border border-border/50">
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/player-name')}
              variant="game"
              size="lg"
              className="w-full h-16 text-xl"
            >
              <Play className="w-6 h-6 mr-2" />
              Jogar
            </Button>

            <Button 
              onClick={() => navigate('/concepts')}
              variant="outline"
              size="lg"
              className="w-full h-16 text-xl"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              Conceitos Importantes
            </Button>

            <Button 
              onClick={() => navigate('/ranking')}
              variant="outline"
              size="lg"
              className="w-full h-16 text-xl"
            >
              <Trophy className="w-6 h-6 mr-2" />
              Ranking
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/50 backdrop-blur rounded-xl p-4 text-center border border-border/30">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-sm mb-1">Estude</h3>
            <p className="text-xs text-muted-foreground">10 conceitos essenciais</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-xl p-4 text-center border border-border/30">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
            <h3 className="font-semibold text-sm mb-1">Pontue</h3>
            <p className="text-xs text-muted-foreground">1, 2 ou 3 pontos por acerto</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur rounded-xl p-4 text-center border border-border/30">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold text-sm mb-1">Compita</h3>
            <p className="text-xs text-muted-foreground">30 perguntas desafiadoras</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
