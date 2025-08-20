import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Star, Bell } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const ProximosJogos = () => {
  const { addSelection } = useBetSlipContext();

  const upcomingGames = [
    {
      id: 1,
      homeTeam: "Flamengo",
      awayTeam: "Corinthians",
      league: "Brasileirão Série A",
      date: "2024-01-25",
      time: "20:00",
      venue: "Maracanã - Rio de Janeiro",
      importance: "high",
      odds: { home: "1.85", draw: "3.40", away: "4.20" }
    },
    {
      id: 2,
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      league: "La Liga",
      date: "2024-01-26",
      time: "16:00",
      venue: "Santiago Bernabéu - Madrid",
      importance: "high",
      odds: { home: "2.10", draw: "3.25", away: "3.50" }
    },
    {
      id: 3,
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      league: "Premier League",
      date: "2024-01-27",
      time: "17:30",
      venue: "Old Trafford - Manchester",
      importance: "medium",
      odds: { home: "2.75", draw: "3.10", away: "2.60" }
    },
    {
      id: 4,
      homeTeam: "PSG",
      awayTeam: "Marseille",
      league: "Ligue 1",
      date: "2024-01-28",
      time: "21:00",
      venue: "Parc des Princes - Paris",
      importance: "medium",
      odds: { home: "1.65", draw: "3.80", away: "5.20" }
    },
    {
      id: 5,
      homeTeam: "Palmeiras",
      awayTeam: "São Paulo",
      league: "Brasileirão Série A",
      date: "2024-01-29",
      time: "18:00",
      venue: "Allianz Parque - São Paulo",
      importance: "high",
      odds: { home: "2.20", draw: "3.15", away: "3.40" }
    }
  ];

  const handleOddsClick = (game: any, type: string, odds: string) => {
    const selection = {
      id: `${game.id}-${type}`,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      league: game.league,
      market: "Resultado Final",
      selection: type === "home" ? game.homeTeam : type === "draw" ? "Empate" : game.awayTeam,
      odds: parseFloat(odds)
    };
    addSelection(selection);
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "high":
        return <Badge className="bg-destructive text-destructive-foreground">Destaque</Badge>;
      case "medium":
        return <Badge variant="secondary">Importante</Badge>;
      default:
        return <Badge variant="outline">Regular</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const gameDate = new Date(dateString);
    const today = new Date();
    const diffTime = gameDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    return `Em ${diffDays} dias`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Próximos Jogos</h1>
              <p className="text-muted-foreground">Não perca os melhores jogos da semana</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {upcomingGames.map((game) => (
            <Card key={game.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Game Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getImportanceBadge(game.importance)}
                    <Badge variant="outline">{game.league}</Badge>
                    <span className="text-sm text-muted-foreground">{getDaysUntil(game.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{game.homeTeam}</h3>
                      <span className="text-sm text-muted-foreground">Casa</span>
                    </div>
                    <div className="text-center px-4">
                      <span className="text-2xl font-bold text-muted-foreground">VS</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{game.awayTeam}</h3>
                      <span className="text-sm text-muted-foreground">Fora</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(game.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{game.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{game.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Odds */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 lg:w-20 h-12 flex flex-col justify-center hover:border-success hover:bg-success/10"
                    onClick={() => handleOddsClick(game, "home", game.odds.home)}
                  >
                    <span className="text-xs">Casa</span>
                    <span className="font-bold text-success">{game.odds.home}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 lg:w-20 h-12 flex flex-col justify-center hover:border-success hover:bg-success/10"
                    onClick={() => handleOddsClick(game, "draw", game.odds.draw)}
                  >
                    <span className="text-xs">Empate</span>
                    <span className="font-bold text-success">{game.odds.draw}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 lg:w-20 h-12 flex flex-col justify-center hover:border-success hover:bg-success/10"
                    onClick={() => handleOddsClick(game, "away", game.odds.away)}
                  >
                    <span className="text-xs">Fora</span>
                    <span className="font-bold text-success">{game.odds.away}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="lg:ml-2">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Calendário Completo
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProximosJogos;