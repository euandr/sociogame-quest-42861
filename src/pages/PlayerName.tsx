import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';

const PlayerName = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName.trim());
      navigate('/countdown');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Qual é o seu nome?</h2>
            <p className="text-muted-foreground">Digite seu nome para começar</p>
          </div>

          <div className="space-y-6">
            <Input
              type="text"
              placeholder="Digite seu nome aqui"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              className="text-lg h-14"
              maxLength={50}
              autoFocus
            />

            <div className="space-y-3">
              <Button 
                onClick={handleStart}
                disabled={!playerName.trim()}
                variant="game"
                size="lg"
                className="w-full h-14 text-lg"
              >
                Continuar
              </Button>

              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg"
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerName;
