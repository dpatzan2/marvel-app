
import { useState } from 'react';
import { Search, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  onShowFavorites: () => void;
}

const Header = ({ searchTerm, onSearchChange, favoritesCount, onShowFavorites }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-strong bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-orbitron font-bold text-sm">M</span>
            </div>
            <h1 className="text-2xl font-orbitron font-bold text-primary text-glow">
              MARVEL NEXUS
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar héroes, villanos, cómics..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-80 bg-secondary/50 border-primary/30 focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={onShowFavorites}
              className="relative border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favoritos
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 animate-slide-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar héroes, villanos, cómics..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full bg-secondary/50 border-primary/30 focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={onShowFavorites}
              className="w-full relative border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favoritos ({favoritesCount})
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
