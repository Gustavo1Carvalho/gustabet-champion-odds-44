import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GameCard from "./GameCard";
import { Play, TrendingUp, Users } from "lucide-react";

const LiveSection = () => {
  const liveGames = [
    {
      homeTeam: "Flamengo",
      awayTeam: "Vasco",
      homeOdds: "1.85",
      drawOdds: "3.20",
      awayOdds: "4.50",
      time: "73'",
      league: "Brasileirão Série A",
      isLive: true,
      viewers: "12.4K"
    },
    {
      homeTeam: "Palmeiras",
      awayTeam: "Corinthians",
      homeOdds: "2.10",
      drawOdds: "3.00",
      awayOdds: "3.80",
      time: "45'",
      league: "Brasileirão Série A",
      isLive: true,
      viewers: "8.7K"
    },
    {
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      homeOdds: "2.45",
      drawOdds: "3.10",
      awayOdds: "2.90",
      time: "12'",
      league: "La Liga",
      isLive: true,
      viewers: "24.1K"
    }
  ];

  return (
    <section className="py-4 sm:py-6">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-success rounded-xl flex items-center justify-center">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-success-foreground fill-current" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-card-foreground">Jogos Ao Vivo</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Aposte em tempo real</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark text-xs sm:text-sm">
            Ver todos
          </Button>
        </div>

        {/* Live Stats */}
        <Card className="bg-gradient-primary text-primary-foreground mb-4 sm:mb-6 shadow-elevated">
          <div className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="font-semibold text-sm sm:text-base">23 jogos ao vivo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">45.2K assistindo</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">+12% de odds premium</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {liveGames.map((game, index) => (
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
              viewers={game.viewers}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
          <Badge variant="secondary" className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            Gols +2.5
          </Badge>
          <Badge variant="secondary" className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:bg-success hover:text-success-foreground transition-colors cursor-pointer">
            Ambas marcam
          </Badge>
          <Badge variant="secondary" className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:bg-warning hover:text-warning-foreground transition-colors cursor-pointer">
            Escanteios +9.5
          </Badge>
          <Badge variant="secondary" className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            Cartões +3.5
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default LiveSection;