import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GameCard from "./GameCard";
import { Calendar, Clock } from "lucide-react";

const UpcomingGames = () => {
  const upcomingGames = [
    {
      homeTeam: "Santos",
      awayTeam: "São Paulo",
      homeOdds: "3.20",
      drawOdds: "3.10",
      awayOdds: "2.15",
      time: "16:00",
      league: "Brasileirão Série A",
      isLive: false
    },
    {
      homeTeam: "Grêmio",
      awayTeam: "Internacional",
      homeOdds: "2.80",
      drawOdds: "3.25",
      awayOdds: "2.55",
      time: "18:30",
      league: "Brasileirão Série A",
      isLive: false
    },
    {
      homeTeam: "Atlético-MG",
      awayTeam: "Cruzeiro",
      homeOdds: "2.05",
      drawOdds: "3.40",
      awayOdds: "3.70",
      time: "21:00",
      league: "Brasileirão Série A",
      isLive: false
    },
    {
      homeTeam: "Manchester City",
      awayTeam: "Arsenal",
      homeOdds: "1.95",
      drawOdds: "3.60",
      awayOdds: "4.20",
      time: "16:30",
      league: "Premier League",
      isLive: false
    },
    {
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeOdds: "1.75",
      drawOdds: "3.80",
      awayOdds: "4.90",
      time: "15:30",
      league: "Bundesliga",
      isLive: false
    },
    {
      homeTeam: "PSG",
      awayTeam: "Marseille",
      homeOdds: "1.60",
      drawOdds: "4.20",
      awayOdds: "5.50",
      time: "20:45",
      league: "Ligue 1",
      isLive: false
    }
  ];

  return (
    <section className="py-4 sm:py-8 bg-accent/30">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-card-foreground">Próximos Jogos</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Faça suas apostas antecipadas</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark text-xs sm:text-sm">
            <span className="hidden sm:inline">Ver agenda completa</span>
            <span className="sm:hidden">Ver mais</span>
          </Button>
        </div>

        {/* Time Filter */}
        <Card className="p-3 sm:p-4 mb-4 sm:mb-6 shadow-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 overflow-x-auto">
            <div className="flex items-center space-x-2 shrink-0">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm font-medium text-card-foreground">Filtrar por horário:</span>
            </div>
            <div className="flex space-x-2 overflow-x-auto w-full">
              {["Hoje", "Amanhã", "Esta semana", "Próximos 7 dias"].map((period, index) => (
                <Button
                  key={period}
                  variant={index === 0 ? "primary" : "ghost"}
                  size="sm"
                  className="shrink-0 text-xs sm:text-sm px-2 sm:px-3"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {upcomingGames.map((game, index) => (
            <GameCard
              key={index}
              homeTeam={game.homeTeam}
              awayTeam={game.awayTeam}
              homeOdds={game.homeOdds}
              drawOdds={game.drawOdds}
              awayOdds={game.awayOdds}
              time={game.time}
              league={game.league}
              isLive={game.isLive}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 sm:mt-8 text-center">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground text-sm sm:text-base px-4 sm:px-6">
            Carregar mais jogos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingGames;