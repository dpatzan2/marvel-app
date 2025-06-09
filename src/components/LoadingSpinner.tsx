
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-primary font-orbitron font-semibold text-glow">
          ACCEDIENDO A LA BASE DE DATOS
        </p>
        <p className="text-muted-foreground text-sm animate-pulse">
          Conectando con los servidores de S.H.I.E.L.D...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
