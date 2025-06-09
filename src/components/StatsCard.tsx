
import { TrendingUp, Users, Book, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  totalCharacters: number;
  totalFavorites: number;
  totalComics: number;
  totalSeries: number;
}

const StatsCard = ({ totalCharacters, totalFavorites, totalComics, totalSeries }: StatsCardProps) => {
  const stats = [
    {
      label: 'Personajes Registrados',
      value: totalCharacters.toLocaleString(),
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'En Favoritos',
      value: totalFavorites.toLocaleString(),
      icon: Zap,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Cómics Disponibles',
      value: totalComics.toLocaleString(),
      icon: Book,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      label: 'Series Activas',
      value: totalSeries.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={stat.label} 
          className="bg-card/60 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
