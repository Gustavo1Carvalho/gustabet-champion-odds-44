import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { useNavigate } from "react-router-dom";
import type { BetSelection } from "@/hooks/useBetSlip";

interface GameCardProps {
  homeTeam: string;
  awayTeam: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
  time: string;
  league: string;
  isLive?: boolean;
  viewers?: string;
}

const GameCard = ({ 
  homeTeam, 
  awayTeam, 
  homeOdds, 
  drawOdds, 
  awayOdds, 
  time, 
  league, 
  isLive = false,
  viewers 
}: GameCardProps) => {
  const { addSelection } = useBetSlipContext();
  const navigate = useNavigate();

  const createBetSelection = (market: string, selection: string, odds: string): BetSelection => ({
    id: `${homeTeam}-${awayTeam}-${market}-${selection}`,
    homeTeam,
    awayTeam,
    league,
    market,
    selection,
    odds: parseFloat(odds)
  });

  const handleOddsClick = (market: string, selection: string, odds: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const betSelection = createBetSelection(market, selection, odds);
    addSelection(betSelection);
  };

  const handleCardClick = () => {
    const gameId = `${homeTeam.toLowerCase().replace(/\s+/g, '-')}-vs-${awayTeam.toLowerCase().replace(/\s+/g, '-')}`;
    const gameData = {
      homeTeam,
      awayTeam,
      homeOdds,
      drawOdds,
      awayOdds,
      time,
      league,
      isLive,
      viewers
    };
    navigate(`/game/${gameId}`, { state: { gameData } });
  };
  return (
    <Card 
      className="bg-card shadow-card hover:shadow-elevated transition-all duration-300 border-border/50 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Badge 
              variant={isLive ? "destructive" : "secondary"}
              className={`text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 ${isLive ? "bg-danger text-danger-foreground animate-pulse" : ""}`}
            >
              {isLive ? "AO VIVO" : time}
            </Badge>
            <span className="text-[10px] sm:text-xs text-muted-foreground truncate">{league}</span>
          </div>
          {isLive && viewers && (
            <div className="flex items-center space-x-1 text-[10px] sm:text-xs text-muted-foreground">
              <Users className="h-2 w-2 sm:h-3 sm:w-3" />
              <span>{viewers}</span>
            </div>
          )}
        </div>

        {/* Teams */}
        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-primary rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary-foreground">
                {homeTeam.charAt(0)}
              </div>
              <span className="font-medium text-card-foreground text-xs sm:text-sm truncate">{homeTeam}</span>
            </div>
            {isLive && (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
                <span className="text-xs sm:text-sm font-bold">2</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-muted rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-muted-foreground">
                {awayTeam.charAt(0)}
              </div>
              <span className="font-medium text-card-foreground text-xs sm:text-sm truncate">{awayTeam}</span>
            </div>
            {isLive && (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm font-bold">1</span>
              </div>
            )}
          </div>
        </div>

        {/* Odds */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-col h-10 sm:h-12 hover:bg-success/10 hover:border-success hover:text-success transition-all p-1 sm:p-2"
            onClick={(e) => handleOddsClick("Resultado Final", "Casa", homeOdds, e)}
          >
            <span className="text-[10px] sm:text-xs text-muted-foreground">Casa</span>
            <span className="font-bold text-xs sm:text-sm">{homeOdds}</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-col h-10 sm:h-12 hover:bg-warning/10 hover:border-warning hover:text-warning transition-all p-1 sm:p-2"
            onClick={(e) => handleOddsClick("Resultado Final", "Empate", drawOdds, e)}
          >
            <span className="text-[10px] sm:text-xs text-muted-foreground">Empate</span>
            <span className="font-bold text-xs sm:text-sm">{drawOdds}</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-col h-10 sm:h-12 hover:bg-success/10 hover:border-success hover:text-success transition-all p-1 sm:p-2"
            onClick={(e) => handleOddsClick("Resultado Final", "Fora", awayOdds, e)}
          >
            <span className="text-[10px] sm:text-xs text-muted-foreground">Fora</span>
            <span className="font-bold text-xs sm:text-sm">{awayOdds}</span>
          </Button>
        </div>

        {/* Additional markets */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
            <span>+87 mercados</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-2 w-2 sm:h-3 sm:w-3" />
              <span>73'</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;