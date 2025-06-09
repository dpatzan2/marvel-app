
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          className="absolute top-6 right-6 z-20 text-white hover:text-accent hover:bg-accent/20 glow-blue rounded-full w-10 h-10 transition-all duration-300 hover:scale-110"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header con efectos */}
        <div className="absolute top-0 left-0 right-0 h-2 hero-gradient"></div>

        <CardContent className="p-0 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Sección de imagen mejorada */}
            <div className="relative h-80 lg:h-[600px] overflow-hidden group">
              {isValidImage ? (
                <>
                  {/* Imagen principal */}
                  <img
                    src={imageUrl}
                    alt={character.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  {/* Overlay con degradado dinámico */}
                  <div className="absolute inset-0 image-overlay opacity-60"></div>
                  {/* Degradado de difusión hacia el fondo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-card opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 flex items-center justify-center relative overflow-hidden">
                  <div className="cyber-grid absolute inset-0 opacity-30"></div>
                  <div className="text-center z-10">
                    <Shield className="w-24 h-24 text-primary mb-4 animate-pulse-glow mx-auto" />
                    <span className="text-6xl font-orbitron font-bold text-primary/70 text-glow">
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
            <div className="p-8 space-y-8 relative glass-morphism">
              {/* Header del personaje */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-8 h-8 text-primary animate-pulse" />
                  <div>
                    <h2 className="text-4xl font-orbitron font-bold text-primary text-glow">
                      {character.name}
                    </h2>
                    <Badge className="bg-primary/20 text-primary border-primary/50 mt-2 glow-blue">
                      <Shield className="w-3 h-3 mr-1" />
                      Archivo S.H.I.E.L.D. Clasificado
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Descripción mejorada */}
              <div className="space-y-3">
                <h3 className="text-xl font-rajdhani font-bold text-accent flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Información Clasificada
                </h3>
                <div className="p-4 bg-secondary/30 rounded-lg border border-primary/20 backdrop-blur-sm">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {character.description || 'Los detalles sobre este individuo están clasificados en los archivos de S.H.I.E.L.D. Se requiere autorización de nivel superior para acceder a información adicional. El sujeto ha sido catalogado como de interés estratégico para la organización.'}
                  </p>
                </div>
              </div>

              {/* Stats con efectos mejorados */}
              <div className="space-y-4">
                <h3 className="text-xl font-rajdhani font-bold text-accent flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Métricas de Actividad
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 glow-blue">
                      <Book className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Cómics Registrados</p>
                        <p className="text-2xl font-bold text-primary font-orbitron">{character.comics.available}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300 glow-red">
                      <Tv className="w-6 h-6 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Series Documentadas</p>
                        <p className="text-2xl font-bold text-accent font-orbitron">{character.series.available}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-secondary/40 hover:border-secondary/60 transition-all duration-300">
                      <Users className="w-6 h-6 text-secondary-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Historias Archivadas</p>
                        <p className="text-2xl font-bold text-secondary-foreground font-orbitron">{character.stories.available}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <Zap className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">Eventos Críticos</p>
                        <p className="text-2xl font-bold text-primary font-orbitron">{character.events.available}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enlaces mejorados */}
              <div className="space-y-4">
                <h3 className="text-xl font-rajdhani font-bold text-accent flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Enlaces de Acceso Autorizado
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(detailUrl, 'Marvel')}
                    className="border-primary/40 hover:border-primary hover:bg-primary/10 transition-all duration-300 glow-blue group"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Base de Datos Marvel
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(comicUrl, 'Cómics')}
                    className="border-accent/40 hover:border-accent hover:bg-accent/10 transition-all duration-300 glow-red group"
                  >
                    <Book className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Archivo de Cómics
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(wikiUrl, 'Wiki')}
                    className="border-secondary/50 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 group"
                  >
                    <Shield className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Wiki S.H.I.E.L.D.
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3 mt-4">
                  * Algunos enlaces pueden requerir autorización adicional o estar temporalmente inaccesibles.
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
