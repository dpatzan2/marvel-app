
import { useState } from 'react';
import { Heart, Info, ExternalLink, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
  };
  series: {
    available: number;
  };
  urls: Array<{
    type: string;
    url: string;
  }>;
}

interface HeroCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (character: Character) => void;
  onShowDetails: (character: Character) => void;
}

const HeroCard = ({ character, isFavorite, onToggleFavorite, onShowDetails }: HeroCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  const isValidImage = !imageUrl.includes('image_not_available');

  const detailUrl = character.urls.find(url => url.type === 'detail')?.url;

  return (
    <Card 
      className="group relative overflow-hidden bg-card/80 backdrop-blur border-primary/20 hover:border-primary/60 transition-all duration-700 hover:scale-105 card-glow cyber-grid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 hero-gradient opacity-5 group-hover:opacity-20 transition-opacity duration-500"></div>
      
      {/* Líneas de escaneo */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative h-80 overflow-hidden">
        {/* Imagen con efectos mejorados */}
        {isValidImage && !imageError ? (
          <>
            <img
              src={imageUrl}
              alt={character.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-120 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {/* Overlay con degradado dinámico */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-60' : 'opacity-20'
            }`}>
              <div className="absolute inset-0 image-overlay"></div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 flex items-center justify-center relative overflow-hidden">
            <div className="cyber-grid absolute inset-0 opacity-20"></div>
            <div className="text-center z-10">
              <Shield className="w-16 h-16 text-primary mb-2 animate-pulse mx-auto" />
              <span className="text-5xl font-orbitron font-bold text-primary/60 text-glow">
                {character.name.charAt(0)}
              </span>
            </div>
            {/* Partículas flotantes */}
            {isHovered && (
              <>
                <div className="absolute top-4 left-4 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-6 w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-6 left-8 w-1 h-1 bg-primary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </>
            )}
          </div>
        )}

        {/* Overlay con botones mejorados */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => onShowDetails(character)}
                className="bg-primary/90 hover:bg-primary text-primary-foreground glow-blue transition-all duration-300 hover:scale-110 group/btn"
              >
                <Info className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                Detalles
                <Zap className="w-3 h-3 ml-1 animate-pulse" />
              </Button>
              
              {detailUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(detailUrl, '_blank')}
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:scale-110 glass-morphism"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleFavorite(character)}
              className={`transition-all duration-500 hover:scale-125 ${
                isFavorite
                  ? 'text-accent bg-accent/20 hover:bg-accent/30 glow-red'
                  : 'text-white hover:text-accent hover:bg-accent/20'
              }`}
            >
              <Heart className={`w-5 h-5 transition-all duration-300 ${
                isFavorite ? 'fill-current scale-110' : ''
              }`} />
            </Button>
          </div>
        </div>

        {/* Indicador de favorito mejorado */}
        {isFavorite && (
          <div className="absolute top-3 right-3">
            <div className="relative">
              <Heart className="w-7 h-7 text-accent fill-current animate-pulse glow-red" />
              <div className="absolute inset-0 animate-ping">
                <Heart className="w-7 h-7 text-accent/50 fill-current" />
              </div>
            </div>
          </div>
        )}

        {/* Elementos holográficos */}
        <div className="absolute top-2 left-2 w-8 h-0.5 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 left-2 w-0.5 h-8 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 right-2 w-8 h-0.5 bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 right-2 w-0.5 h-8 bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <CardContent className="p-4 relative glass-morphism">
        {/* Línea de energía */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 group-hover:via-primary group-hover:from-primary/20 group-hover:to-primary/20 transition-all duration-500"></div>
        
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-orbitron font-bold text-lg text-primary text-glow group-hover:text-xl transition-all duration-300">
            {character.name}
          </h3>
          <Zap className="w-4 h-4 text-accent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
          {character.description || 'Información clasificada por S.H.I.E.L.D. - Requiere autorización de seguridad nivel Alpha.'}
        </p>

        <div className="flex space-x-2">
          <Badge 
            variant="secondary" 
            className="text-xs bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors duration-300"
          >
            {character.comics.available} Cómics
          </Badge>
          <Badge 
            variant="outline" 
            className="text-xs border-accent/40 text-accent hover:border-accent hover:bg-accent/10 transition-colors duration-300"
          >
            {character.series.available} Series
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroCard;
