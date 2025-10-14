import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getRandomQuestion } from '@/data/questions';
import { Question } from '@/types/game';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, X, CheckCircle2, Brain } from 'lucide-react';
import { toast } from 'sonner';

const Game = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    if (!name) {
      navigate('/');
      return;
    }
    setPlayerName(name);
    loadNextQuestion();
  }, []);

  const loadNextQuestion = () => {
    const question = getRandomQuestion(usedQuestions);
    if (question) {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Todas as perguntas respondidas
      endGame();
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = async () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const newScore = score + currentQuestion.points;
      setScore(newScore);
      
      toast.success(`Correto! +${currentQuestion.points} ponto${currentQuestion.points > 1 ? 's' : ''}`, {
        description: `Pontuação total: ${newScore}`
      });

      // Aguarda um pouco antes de carregar próxima pergunta
      setTimeout(() => {
        setUsedQuestions([...usedQuestions, currentQuestion.id]);
        loadNextQuestion();
      }, 2000);
    } else {
      toast.error('Resposta incorreta!', {
        description: 'O jogo terminou. Vamos salvar sua pontuação!'
      });
      
      setTimeout(() => {
        endGame();
      }, 2000);
    }
  };

  const endGame = async () => {
    setGameOver(true);
    
    // Salvar pontuação no banco
    try {
      const { error } = await supabase
        .from('rankings')
        .insert({
          player_name: playerName,
          score: score
        });

      if (error) throw error;
      
      toast.success('Pontuação salva!', {
        description: `${playerName}: ${score} pontos`
      });

      // Redireciona para tela inicial após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar pontuação:', error);
      toast.error('Erro ao salvar pontuação');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-secondary';
      case 'hard': return 'text-accent';
      default: return 'text-primary';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Média';
      case 'hard': return 'Difícil';
      default: return '';
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="text-center animate-scale-in">
          <Trophy className="w-20 h-20 mx-auto mb-6 text-accent animate-bounce-subtle" />
          <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
          <p className="text-2xl mb-2">Pontuação final: <span className="font-bold text-primary">{score}</span></p>
          <p className="text-muted-foreground">Voltando para tela inicial...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header com pontuação */}
        <div className="bg-card rounded-2xl shadow-lg p-6 mb-6 border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jogador</p>
              <p className="text-xl font-bold text-foreground">{playerName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Pontuação</p>
              <p className="text-3xl font-bold text-primary">{score}</p>
            </div>
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-card rounded-2xl shadow-xl p-8 mb-6 border border-border/50 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <span className={`text-sm font-semibold ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {getDifficultyLabel(currentQuestion.difficulty)} • {currentQuestion.points} ponto{currentQuestion.points > 1 ? 's' : ''}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-8 text-foreground leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;
              
              let buttonStyle = 'bg-muted/50 hover:bg-muted border-2 border-transparent';
              
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonStyle = 'bg-success/20 border-success border-2';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-destructive/20 border-destructive border-2';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-primary/20 border-primary border-2';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] ${buttonStyle} flex items-center justify-between group`}
                >
                  <span className="font-medium text-foreground">{option}</span>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X className="w-5 h-5 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>

          {!showResult && (
            <Button
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
              variant="game"
              size="lg"
              className="w-full mt-8 h-14"
            >
              Confirmar Resposta
            </Button>
          )}

          {showResult && isCorrect && (
            <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-xl text-center">
              <p className="text-success font-semibold">
                Excelente! Preparando próxima pergunta...
              </p>
            </div>
          )}

          {showResult && !isCorrect && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-center">
              <p className="text-destructive font-semibold mb-2">
                Que pena! A resposta correta era:
              </p>
              <p className="font-medium text-foreground">
                {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
