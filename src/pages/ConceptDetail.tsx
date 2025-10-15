import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { sociologyConcepts } from '@/data/concepts';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ConceptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const concept = sociologyConcepts.find(c => c.id === id);

  if (!concept) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Conceito não encontrado</h2>
          <Button onClick={() => navigate('/concepts')}>Voltar aos Conceitos</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => navigate('/concepts')}
          variant="outline"
          size="lg"
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/50 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">{concept.icon}</div>
            <h1 className="text-4xl font-bold text-foreground">{concept.title}</h1>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">O que é?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {concept.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-primary mb-3">Exemplos práticos:</h2>
              <ul className="space-y-3">
                {concept.examples.map((example, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-3 text-xl">•</span>
                    <span className="text-lg text-muted-foreground">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {concept.details && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">Aprofundamento:</h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {concept.details}
                </p>
              </div>
            )}

            {concept.references && concept.references.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3">Saiba mais:</h2>
                <div className="space-y-2">
                  {concept.references.map((reference, idx) => (
                    <a
                      key={idx}
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {reference.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetail;
