import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import HeroCard from '@/components/HeroCard';
import HeroModal from '@/components/HeroModal';
import FavoritesModal from '@/components/FavoritesModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap, Shield } from 'lucide-react';
import { fetchMarvelCharacters } from '@/services/marvelApi';

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

interface MarvelResponse {
  data: {
    results: Character[];
    total: number;
    count: number;
    limit: number;
    offset: number;
  };
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [totalComics, setTotalComics] = useState(0);
  const [totalSeries, setTotalSeries] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const limit = 20;
  const offset = currentPage * limit;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('marvel-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('marvel-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['marvel-characters', searchTerm, offset],
    queryFn: async (): Promise<MarvelResponse> => {
      const result = await fetchMarvelCharacters(limit, offset, searchTerm || undefined);
      
      // Calculate total comics and series (optimized for mobile)
      if (result.data.results.length > 0 && !isMobile) {
        const comics = result.data.results.reduce((sum: number, char: Character) => sum + char.comics.available, 0);
        const series = result.data.results.reduce((sum: number, char: Character) => sum + char.series.available, 0);
        setTotalComics(prev => prev + comics);
        setTotalSeries(prev => prev + series);
      }
      
      return result;
    },
    retry: 2,
    staleTime: isMobile ? 300000 : 60000, // Longer cache on mobile
  });

  const handleToggleFavorite = (character: Character) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === character.id);
      if (isFavorite) {
        toast({
          title: "Removido de favoritos",
          description: `${character.name} ha sido removido de tus favoritos.`,
        });
        return prev.filter(fav => fav.id !== character.id);
      } else {
        toast({
          title: "Añadido a favoritos",
          description: `${character.name} ha sido añadido a tus favoritos.`,
        });
        return [...prev, character];
      }
    });
  };

  const handleShowDetails = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleRemoveFavorite = (character: Character) => {
    setFavorites(prev => prev.filter(fav => fav.id !== character.id));
    toast({
      title: "Removido de favoritos",
      description: `${character.name} ha sido removido de tus favoritos.`,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  const totalPages = data ? Math.ceil(data.data.total / limit) : 0;
  const characters = data?.data.results || [];

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Shield className="w-16 h-16 text-accent mx-auto" />
          <h1 className="text-2xl font-orbitron font-bold text-accent">
            Error de Conexión
          </h1>
          <p className="text-muted-foreground max-w-md">
            {error instanceof Error ? error.message : 'Error desconocido al conectar con Marvel API'}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-primary hover:bg-primary/90"
          >
            Reintentar Conexión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        favoritesCount={favorites.length}
        onShowFavorites={() => setIsFavoritesModalOpen(true)}
      />

      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Optimized Hero Section */}
          <div className="text-center mb-12 animate-slide-in">
            <h1 className={`text-4xl md:text-6xl font-orbitron font-bold mb-4 bg-clip-text text-transparent ${
              isMobile 
                ? 'bg-gradient-to-r from-primary to-accent' 
                : 'hero-gradient'
            }`}>
              MARVEL NEXUS
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Acceso autorizado a la base de datos interdimensional de héroes y villanos. 
              Explora el multiverso Marvel con tecnología de última generación.
            </p>
          </div>

          {/* Conditional Stats for performance */}
          {!isMobile && (
            <StatsCard
              totalCharacters={data?.data.total || 0}
              totalFavorites={favorites.length}
              totalComics={totalComics}
              totalSeries={totalSeries}
            />
          )}

          {/* Loading */}
          {isLoading && <LoadingSpinner />}

          {/* Characters Grid with optimized rendering */}
          {!isLoading && characters.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {characters.map((character, index) => (
                  <div
                    key={character.id}
                    className={`${!isMobile ? 'animate-slide-in' : ''}`}
                    style={!isMobile ? { animationDelay: `${index * 0.05}s` } : {}}
                  >
                    <HeroCard
                      character={character}
                      isFavorite={favorites.some(fav => fav.id === character.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onShowDetails={handleShowDetails}
                    />
                  </div>
                ))}
              </div>

              {/* Simplified pagination for mobile */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>

                  <span className="text-muted-foreground font-rajdhani">
                    Página {currentPage + 1} de {Math.min(totalPages, 100)}
                  </span>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentPage >= totalPages - 1 || currentPage >= 99}
                    className="border-primary/30 hover:border-primary hover:bg-primary/10"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!isLoading && characters.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-12 h-12 text-primary/50" />
              </div>
              <h3 className="text-xl font-rajdhani font-semibold text-muted-foreground mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground">
                No hay personajes que coincidan con "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <HeroModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <FavoritesModal
        favorites={favorites}
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        onRemoveFavorite={handleRemoveFavorite}
        onShowDetails={handleShowDetails}
      />
    </div>
  );
};

export default Index;
