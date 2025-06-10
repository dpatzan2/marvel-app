import { X, ExternalLink, Book, Tv, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

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
  stories: {
    available: number;
  };
  events: {
    available: number;
  };
  urls: Array<{
    type: string;
    url: string;
  }>;
}

interface HeroModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

const HeroModal = ({ character, isOpen, onClose }: HeroModalProps) => {
  if (!isOpen || !character) return null;

  const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  const isValidImage = !imageUrl.includes('image_not_available');

  const handleLinkClick = (url: string | undefined, linkType: string) => {
    if (!url) {
      toast({
        title: "Enlace no disponible",
        description: `El enlace de ${linkType} no está disponible para este personaje.`,
        variant: "destructive"
      });
      return;
    }
    
    // Verificar si el enlace es válido antes de abrirlo
    if (url.includes('marvel.com')) {
      window.open(url, '_blank');
    } else {
      toast({
        title: "Enlace no válido",
        description: `El enlace de ${linkType} no es válido o ya no está disponible.`,
        variant: "destructive"
      });
    }
  };

  const detailUrl = character.urls.find(url => url.type === 'detail')?.url;
  const comicUrl = character.urls.find(url => url.type === 'comiclink')?.url;
  const wikiUrl = character.urls.find(url => url.type === 'wiki')?.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop mejorado con efectos */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-strong"
        onClick={onClose}
      >
        {/* Partículas flotantes */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        
        {/* Línea de escaneo */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-50"></div>
      </div>
      
      {/* Modal con efectos épicos */}
      <Card className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden bg-card/90 backdrop-blur-strong border-primary/40 animate-slide-in card-glow hologram">
        {/* Close Button mejorado */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 text-white hover:text-accent hover:bg-accent/20 glow-blue rounded-full w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 hover:scale-110"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        {/* Header con efectos */}
        <div className="absolute top-0 left-0 right-0 h-2 hero-gradient"></div>

        <CardContent className="p-0 relative overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 max-h-[95vh] overflow-y-auto scrollbar-hidden">
            {/* Sección de imagen mejorada */}
            <div className="relative min-h-[250px] sm:min-h-[300px] lg:min-h-[600px] overflow-hidden group flex items-center justify-center flex-shrink-0">
              {isValidImage ? (
                <>
                  {/* Imagen principal */}
                  <img
                    src={imageUrl}
                    alt={character.name}
                    className="w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[600px] object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Overlay con degradado dinámico */}
                  <div className="absolute inset-0 image-overlay opacity-60"></div>
                  {/* Degradado de difusión hacia el fondo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-card opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[600px] h-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 flex items-center justify-center relative overflow-hidden">
                  <div className="cyber-grid absolute inset-0 opacity-30"></div>
                  <div className="text-center z-10">
                    <Shield className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-primary mb-4 animate-pulse-glow mx-auto" />
                    <span className="text-3xl sm:text-4xl lg:text-6xl font-orbitron font-bold text-primary/70 text-glow">
                      {character.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 image-overlay opacity-40"></div>
                </div>
              )}
              
              {/* Efectos de borde brillante */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Sección de contenido mejorada */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 relative glass-morphism overflow-y-auto scrollbar-hidden">
              {/* Header del personaje */}
              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold text-primary text-glow leading-tight">
                      {character.name}
                    </h2>
                    <Badge className="bg-primary/20 text-primary border-primary/50 mt-1 sm:mt-2 glow-blue text-xs">
                      <Shield className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                      Archivo S.H.I.E.L.D. Clasificado
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Descripción mejorada */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl font-rajdhani font-bold text-accent flex items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  Información Clasificada
                </h3>
                <div className="p-3 sm:p-4 bg-secondary/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                    {character.description || 'Los detalles sobre este individuo están clasificados en los archivos de S.H.I.E.L.D. Se requiere autorización de nivel superior para acceder a información adicional. El sujeto ha sido catalogado como de interés estratégico para la organización.'}
                  </p>
                </div>
              </div>

              {/* Stats con efectos mejorados */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-rajdhani font-bold text-accent flex items-center">
                  <Book className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  Métricas de Actividad
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  <div className="relative group">
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 glow-blue">
                      <Book className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">Cómics</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary font-orbitron">{character.comics.available}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300 glow-red">
                      <Tv className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-accent flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">Series</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-accent font-orbitron">{character.series.available}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-secondary/40 hover:border-secondary/60 transition-all duration-300">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-secondary-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">Historias</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-foreground font-orbitron">{character.stories.available}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">Eventos</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary font-orbitron">{character.events.available}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enlaces mejorados */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-rajdhani font-bold text-accent flex items-center">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  Enlaces de Acceso
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(detailUrl, 'Marvel')}
                    className="border-primary/40 hover:border-primary hover:bg-primary/10 transition-all duration-300 glow-blue group text-xs sm:text-sm"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
                    Marvel DB
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(comicUrl, 'Cómics')}
                    className="border-accent/40 hover:border-accent hover:bg-accent/10 transition-all duration-300 glow-red group text-xs sm:text-sm"
                  >
                    <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
                    Cómics
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(wikiUrl, 'Wiki')}
                    className="border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 group text-xs sm:text-sm"
                  >
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:scale-110 transition-transform" />
                    Wiki
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2 sm:pl-3 mt-3 sm:mt-4">
                  * Algunos enlaces pueden requerir autorización adicional.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroModal;

const customScrollbarStyles = `
  .scrollbar-hidden {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  .scrollbar-hidden::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  /* Alternative: Custom styled scrollbar that blends with design */
  .scrollbar-cyber {
    scrollbar-width: thin;
    scrollbar-color: rgba(var(--primary), 0.3) transparent;
  }
  
  .scrollbar-cyber::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollbar-cyber::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
  
  .scrollbar-cyber::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, rgba(var(--primary), 0.5), rgba(var(--accent), 0.3));
    border-radius: 2px;
    border: 1px solid rgba(var(--primary), 0.2);
  }
  
  .scrollbar-cyber::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, rgba(var(--primary), 0.8), rgba(var(--accent), 0.5));
  }
`;
