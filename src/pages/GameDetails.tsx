import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpecialOddsCards from "@/components/SpecialOddsCards";
import MarketTabs from "@/components/MarketTabs";
import MarketBlocks from "@/components/MarketBlocks";

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("principais");

  // Get game data from navigation state or use fallback
  const gameStateData = location.state?.gameData;
  const gameData = gameStateData ? {
    ...gameStateData,
    score: gameStateData.isLive ? { home: Math.floor(Math.random() * 4), away: Math.floor(Math.random() * 4) } : null
  } : {
    homeTeam: "Time Casa",
    awayTeam: "Time Visitante", 
    league: "Liga",
    time: "20:00",
    isLive: false,
    homeOdds: "2.00",
    drawOdds: "3.00", 
    awayOdds: "4.00",
    score: null
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border/50 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-accent p-1 sm:p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-3">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-primary-foreground">
                    {gameData.homeTeam.charAt(0)}
                  </div>
                  <span className="font-semibold text-sm sm:text-base truncate">{gameData.homeTeam}</span>
                  {gameData.isLive && (
                    <span className="text-base sm:text-lg font-bold text-success">{gameData.score.home}</span>
                  )}
                </div>
                
                <span className="text-muted-foreground text-sm">x</span>
                
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {gameData.isLive && (
                    <span className="text-base sm:text-lg font-bold text-success">{gameData.score.away}</span>
                  )}
                  <span className="font-semibold text-sm sm:text-base truncate">{gameData.awayTeam}</span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-muted-foreground">
                    {gameData.awayTeam.charAt(0)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs sm:text-sm text-muted-foreground truncate">{gameData.league}</span>
                {gameData.isLive ? (
                  <span className="text-xs bg-danger text-danger-foreground px-2 py-1 rounded-full animate-pulse whitespace-nowrap">
                    AO VIVO
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{gameData.time}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Special Odds Cards */}
        <SpecialOddsCards gameData={gameData} />
        
        {/* Market Navigation */}
        <MarketTabs onTabChange={setActiveTab} />
        
        {/* Market Blocks */}
        <MarketBlocks gameData={gameData} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default GameDetails;