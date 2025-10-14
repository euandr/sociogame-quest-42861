import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Countdown = () => {
  const [count, setCount] = useState<number | string>('Preparado?');
  const navigate = useNavigate();

  useEffect(() => {
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
      navigate('/');
      return;
    }

    const timer1 = setTimeout(() => setCount(3), 1500);
    const timer2 = setTimeout(() => setCount(2), 2500);
    const timer3 = setTimeout(() => setCount(1), 3500);
    const timer4 = setTimeout(() => navigate('/game'), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="text-center animate-scale-in">
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse-glow">
          {count}
        </h1>
      </div>
    </div>
  );
};

export default Countdown;
