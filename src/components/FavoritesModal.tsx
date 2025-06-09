import { X, Trash2, ExternalLink } from 'lucide-react';
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

interface FavoritesModalProps {
  favorites: Character[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFavorite: (character: Character) => void;
  onShowDetails: (character: Character) => void;
}

const FavoritesModal = ({ 
  favorites, 
  isOpen, 
  onClose, 
  onRemoveFavorite, 
  onShowDetails 
}: FavoritesModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-card/95 backdrop-blur border-primary/30 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <h2 className="text-2xl font-orbitron font-bold text-primary text-glow">
            MIS FAVORITOS
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-accent"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💫</span>
              </div>
              <h3 className="text-xl font-rajdhani font-semibold text-muted-foreground mb-2">
                No tienes favoritos aún
              </h3>
              <p className="text-muted-foreground">
                Explora el universo Marvel y añade tus personajes favoritos
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {favorites.map((character) => {
                const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                const isValidImage = !imageUrl.includes('image_not_available');
                const detailUrl = character.urls.find(url => url.type === 'detail')?.url;

                return (
                  <Card 
                    key={character.id} 
                    className="bg-secondary/50 border-primary/20 hover:border-primary/40 transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Image */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                          {isValidImage ? (
                            <img
                              src={imageUrl}
                              alt={character.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <span className="text-lg font-orbitron font-bold text-primary/50">
                                {character.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-orbitron font-bold text-primary mb-1">
                            {character.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {character.description || 'Sin descripción disponible'}
                          </p>
                          <div className="flex space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {character.comics.available} Cómics
                            </Badge>
                            <Badge variant="outline" className="text-xs border-primary/30">
                              {character.series.available} Series
                            </Badge>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => onShowDetails(character)}
                            className="bg-primary/20 hover:bg-primary/30 text-primary border-primary/30"
                          >
                            Ver
                          </Button>
                          
                          {detailUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(detailUrl, '_blank')}
                              className="border-secondary hover:bg-secondary/20"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onRemoveFavorite(character)}
                            className="border-accent/30 hover:border-accent hover:bg-accent/10 text-accent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesModal;
