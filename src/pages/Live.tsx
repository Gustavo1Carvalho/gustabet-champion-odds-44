import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, TrendingUp, Play, Pause } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const Live = () => {
  const { addSelection } = useBetSlipContext();
  const [filter, setFilter] = useState("all");

  const liveGames = [
    {
      id: 1,
      homeTeam: "Flamengo",
      awayTeam: "Palmeiras",
      league: "Brasileirão Série A",
      time: "85'",
      score: { home: 2, away: 1 },
      homeOdds: "3.25",
      drawOdds: "4.50",
      awayOdds: "2.15",
      isLive: true,
      viewers: 15420,
      redCards: { home: 0, away: 1 },
      corners: { home: 6, away: 4 }
    },
    {
      id: 2,
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      league: "La Liga",
      time: "62'",
      score: { home: 1, away: 1 },
      homeOdds: "2.10",
      drawOdds: "3.85",
      awayOdds: "3.40",
      isLive: true,
      viewers: 32750,
      redCards: { home: 0, away: 0 },
      corners: { home: 8, away: 5 }
    },
    {
      id: 3,
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      league: "Premier League",
      time: "45'+2",
      score: { home: 0, away: 2 },
      homeOdds: "4.75",
      drawOdds: "4.25",
      awayOdds: "1.65",
      isLive: true,
      viewers: 28900,
      redCards: { home: 1, away: 0 },
      corners: { home: 3, away: 7 }
    },
    {
      id: 4,
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      league: "NBA",
      time: "Q3 8:45",
      score: { home: 89, away: 92 },
      homeOdds: "1.95",
      drawOdds: null,
      awayOdds: "1.85",
      isLive: true,
      viewers: 19200,
      sport: "basquete"
    },
    {
      id: 5,
      homeTeam: "T1",
      awayTeam: "Gen.G",
      league: "LCK",
      time: "Game 2",
      score: { home: 1, away: 0 },
      homeOdds: "1.75",
      drawOdds: null,
      awayOdds: "2.05",
      isLive: true,
      viewers: 45600,
      sport: "esports"
    }
  ];

  const filters = [
    { id: "all", label: "Todos", count: liveGames.length },
    { id: "futebol", label: "Futebol", count: 3 },
    { id: "basquete", label: "Basquete", count: 1 },
    { id: "esports", label: "eSports", count: 1 }
  ];

  const filteredGames = filter === "all" 
    ? liveGames 
    : liveGames.filter(game => {
        if (filter === "futebol") return !game.sport || game.sport === "futebol";
        return game.sport === filter;
      });

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-danger/20 to-warning/20 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-danger rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-danger-foreground animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Jogos Ao Vivo</h1>
                <p className="text-muted-foreground">Acompanhe e aposte em tempo real</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-danger rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">{liveGames.length} jogos ao vivo</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">
                  {liveGames.reduce((total, game) => total + game.viewers, 0).toLocaleString()} espectadores
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {filters.map((filterItem) => (
            <Button
              key={filterItem.id}
              variant={filter === filterItem.id ? "default" : "outline"}
              onClick={() => setFilter(filterItem.id)}
              className="whitespace-nowrap"
            >
              {filterItem.label}
              <Badge variant="secondary" className="ml-2">
                {filterItem.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Live Games */}
        <div className="space-y-4">
          {filteredGames.map((game) => (
            <Card key={game.id} className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-danger">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-danger text-danger-foreground animate-pulse">
                    <div className="w-2 h-2 bg-danger-foreground rounded-full mr-2"></div>
                    AO VIVO
                  </Badge>
                  <span className="text-sm text-muted-foreground">{game.league}</span>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    <span>{game.viewers.toLocaleString()}</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold bg-accent px-2 py-1 rounded">
                  {game.time}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Game Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-1">
                          {game.homeTeam.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{game.homeTeam}</span>
                      </div>
                      
                      <div className="text-center mx-6">
                        <div className="text-2xl font-bold text-foreground">
                          {game.score.home} - {game.score.away}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-muted-foreground mb-1">
                          {game.awayTeam.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{game.awayTeam}</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Stats */}
                  {game.sport !== "basquete" && game.sport !== "esports" && (
                    <div className="flex space-x-4 text-xs text-muted-foreground">
                      <span>Escanteios: {game.corners?.home || 0} - {game.corners?.away || 0}</span>
                      {(game.redCards?.home > 0 || game.redCards?.away > 0) && (
                        <span className="text-danger">
                          Cartões vermelhos: {game.redCards.home} - {game.redCards.away}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Betting Odds */}
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                      onClick={() => handleOddsClick(game, "home", game.homeOdds)}
                    >
                      <span className="text-xs">Casa</span>
                      <span className="font-bold text-success">{game.homeOdds}</span>
                    </Button>
                    
                    {game.drawOdds && (
                      <Button
                        variant="outline"
                        className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                        onClick={() => handleOddsClick(game, "draw", game.drawOdds)}
                      >
                        <span className="text-xs">Empate</span>
                        <span className="font-bold text-success">{game.drawOdds}</span>
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      className={`h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10 ${!game.drawOdds ? 'col-span-2' : ''}`}
                      onClick={() => handleOddsClick(game, "away", game.awayOdds)}
                    >
                      <span className="text-xs">Fora</span>
                      <span className="font-bold text-success">{game.awayOdds}</span>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-xs"
                    asChild
                  >
                    <Link to={`/game/${game.id}`} state={{ gameData: game }}>
                      Mais Mercados
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Pause className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum jogo ao vivo</h3>
            <p className="text-muted-foreground">
              Não há jogos {filter !== "all" ? `de ${filter}` : ""} acontecendo agora.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Live;