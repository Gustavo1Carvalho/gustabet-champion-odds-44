import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, Star, Clock, Globe } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const Futebol = () => {
  const { addSelection } = useBetSlipContext();

  const leagues = [
    {
      id: "brasileirao",
      name: "Brasileirão Série A",
      country: "Brasil",
      logo: "🇧🇷",
      games: [
        {
          id: 1,
          homeTeam: "Flamengo",
          awayTeam: "Corinthians",
          date: "2024-01-20",
          time: "16:00",
          homeOdds: "1.85",
          drawOdds: "3.40",
          awayOdds: "4.20"
        },
        {
          id: 2,
          homeTeam: "Palmeiras",
          awayTeam: "São Paulo",
          date: "2024-01-20",
          time: "18:30",
          homeOdds: "2.10",
          drawOdds: "3.25",
          awayOdds: "3.50"
        }
      ]
    },
    {
      id: "premier",
      name: "Premier League",
      country: "Inglaterra",
      logo: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      games: [
        {
          id: 3,
          homeTeam: "Manchester City",
          awayTeam: "Arsenal",
          date: "2024-01-21",
          time: "14:30",
          homeOdds: "1.95",
          drawOdds: "3.60",
          awayOdds: "3.80"
        },
        {
          id: 4,
          homeTeam: "Liverpool",
          awayTeam: "Chelsea",
          date: "2024-01-21",
          time: "17:00",
          homeOdds: "1.70",
          drawOdds: "3.90",
          awayOdds: "4.50"
        }
      ]
    },
    {
      id: "laliga",
      name: "La Liga",
      country: "Espanha",
      logo: "🇪🇸",
      games: [
        {
          id: 5,
          homeTeam: "Real Madrid",
          awayTeam: "Atlético Madrid",
          date: "2024-01-21",
          time: "21:00",
          homeOdds: "2.25",
          drawOdds: "3.10",
          awayOdds: "3.20"
        },
        {
          id: 6,
          homeTeam: "Barcelona",
          awayTeam: "Sevilla",
          date: "2024-01-22",
          time: "16:00",
          homeOdds: "1.50",
          drawOdds: "4.25",
          awayOdds: "6.50"
        }
      ]
    }
  ];

  const popularMatches = [
    {
      id: 7,
      homeTeam: "PSG",
      awayTeam: "Marseille",
      league: "Ligue 1",
      date: "2024-01-22",
      time: "16:00",
      homeOdds: "1.60",
      drawOdds: "4.00",
      awayOdds: "5.25",
      featured: true
    },
    {
      id: 8,
      homeTeam: "Bayern Munich",
      awayTeam: "Dortmund",
      league: "Bundesliga",
      date: "2024-01-22",
      time: "18:30",
      homeOdds: "1.75",
      drawOdds: "3.80",
      awayOdds: "4.30",
      featured: true
    }
  ];

  const handleOddsClick = (game: any, type: string, odds: string) => {
    const selection = {
      id: `${game.id}-${type}`,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      league: game.league || "Futebol",
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
          <div className="bg-gradient-to-r from-primary/20 to-success/20 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Futebol</h1>
                <p className="text-muted-foreground">As melhores odds do futebol mundial</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{leagues.length} ligas disponíveis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">
                  {leagues.reduce((total, league) => total + league.games.length, 0)} jogos hoje
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured">Destaques</TabsTrigger>
            <TabsTrigger value="leagues">Por Liga</TabsTrigger>
            <TabsTrigger value="today">Hoje</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Star className="h-5 w-5 text-warning" />
              <span>Jogos em Destaque</span>
            </h2>
            
            <div className="grid gap-4">
              {popularMatches.map((game) => (
                <Card key={game.id} className="p-4 border-l-4 border-l-warning">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-warning text-warning-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </Badge>
                      <span className="text-sm text-muted-foreground">{game.league}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{game.date}</span>
                      <Clock className="h-4 w-4" />
                      <span>{game.time}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-1">
                              {game.homeTeam.charAt(0)}
                            </div>
                            <span className="text-sm font-medium">{game.homeTeam}</span>
                          </div>
                          
                          <div className="text-center mx-6">
                            <span className="text-lg font-bold text-muted-foreground">VS</span>
                          </div>
                          
                          <div className="text-center">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-muted-foreground mb-1">
                              {game.awayTeam.charAt(0)}
                            </div>
                            <span className="text-sm font-medium">{game.awayTeam}</span>
                          </div>
                        </div>
                      </div>
                    </div>

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
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "draw", game.drawOdds)}
                        >
                          <span className="text-xs">Empate</span>
                          <span className="font-bold text-success">{game.drawOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
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
          </TabsContent>

          <TabsContent value="leagues" className="space-y-6">
            <h2 className="text-xl font-bold">Ligas Principais</h2>
            
            {leagues.map((league) => (
              <Card key={league.id} className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{league.logo}</span>
                  <div>
                    <h3 className="font-semibold">{league.name}</h3>
                    <p className="text-sm text-muted-foreground">{league.country}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {league.games.map((game) => (
                    <div key={game.id} className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-3 bg-neutral-light rounded-lg">
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground mb-1">
                                {game.homeTeam.charAt(0)}
                              </div>
                              <span className="text-xs font-medium">{game.homeTeam}</span>
                            </div>
                            
                            <div className="text-center mx-4">
                              <span className="text-sm font-bold text-muted-foreground">VS</span>
                            </div>
                            
                            <div className="text-center">
                              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground mb-1">
                                {game.awayTeam.charAt(0)}
                              </div>
                              <span className="text-xs font-medium">{game.awayTeam}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">{game.date}</div>
                            <div className="text-sm font-bold">{game.time}</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 flex flex-col justify-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "home", game.homeOdds)}
                        >
                          <span className="text-xs font-bold text-success">{game.homeOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 flex flex-col justify-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "draw", game.drawOdds)}
                        >
                          <span className="text-xs font-bold text-success">{game.drawOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 flex flex-col justify-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "away", game.awayOdds)}
                        >
                          <span className="text-xs font-bold text-success">{game.awayOdds}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="today" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Jogos de Hoje</span>
            </h2>
            
            <div className="space-y-4">
              {leagues.flatMap(league => 
                league.games.map(game => ({ ...game, league: league.name }))
              ).map((game) => (
                <Card key={game.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{game.league}</span>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{game.time}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-1">
                            {game.homeTeam.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{game.homeTeam}</span>
                        </div>
                        
                        <div className="text-center mx-6">
                          <span className="text-lg font-bold text-muted-foreground">VS</span>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-muted-foreground mb-1">
                            {game.awayTeam.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{game.awayTeam}</span>
                        </div>
                      </div>
                    </div>

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
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "draw", game.drawOdds)}
                        >
                          <span className="text-xs">Empate</span>
                          <span className="font-bold text-success">{game.drawOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Futebol;