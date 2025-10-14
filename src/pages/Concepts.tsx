import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { sociologyConcepts } from '@/data/concepts';
import { ArrowLeft } from 'lucide-react';

const Concepts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Conceitos Importantes
          </h1>
          <p className="text-lg text-muted-foreground">
            Selecione um tema para estudar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sociologyConcepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => navigate(`/concept/${concept.id}`)}
              className="bg-card rounded-2xl shadow-lg p-6 border border-border/50 hover:shadow-xl transition-all hover:scale-[1.02] animate-fade-in text-left w-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl flex-shrink-0">{concept.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">
                    {concept.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Clique para ver mais detalhes
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Concepts;
