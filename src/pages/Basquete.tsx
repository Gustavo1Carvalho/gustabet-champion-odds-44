import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Calendar, Star, Clock, Globe, TrendingUp } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const Basquete = () => {
  const { addSelection } = useBetSlipContext();

  const leagues = [
    {
      id: "nba",
      name: "NBA",
      country: "Estados Unidos",
      logo: "🇺🇸",
      games: [
        {
          id: 1,
          homeTeam: "Lakers",
          awayTeam: "Warriors",
          date: "2024-01-20",
          time: "22:00",
          homeOdds: "1.95",
          awayOdds: "1.85",
          total: { over: "1.90", under: "1.90", line: "220.5" }
        },
        {
          id: 2,
          homeTeam: "Celtics",
          awayTeam: "Heat",
          date: "2024-01-20",
          time: "23:30",
          homeOdds: "1.75",
          awayOdds: "2.05",
          total: { over: "1.95", under: "1.85", line: "212.5" }
        }
      ]
    },
    {
      id: "nbb",
      name: "NBB",
      country: "Brasil",
      logo: "🇧🇷",
      games: [
        {
          id: 3,
          homeTeam: "Flamengo",
          awayTeam: "Corinthians",
          date: "2024-01-21",
          time: "19:00",
          homeOdds: "1.65",
          awayOdds: "2.25",
          total: { over: "1.85", under: "1.95", line: "158.5" }
        },
        {
          id: 4,
          homeTeam: "São Paulo",
          awayTeam: "Minas",
          date: "2024-01-21",
          time: "20:30",
          homeOdds: "2.10",
          awayOdds: "1.70",
          total: { over: "1.90", under: "1.90", line: "162.5" }
        }
      ]
    },
    {
      id: "euroleague",
      name: "EuroLeague",
      country: "Europa",
      logo: "🇪🇺",
      games: [
        {
          id: 5,
          homeTeam: "Real Madrid",
          awayTeam: "Barcelona",
          date: "2024-01-21",
          time: "16:00",
          homeOdds: "1.80",
          awayOdds: "2.00",
          total: { over: "1.95", under: "1.85", line: "165.5" }
        }
      ]
    }
  ];

  const liveGames = [
    {
      id: 6,
      homeTeam: "Nuggets",
      awayTeam: "Clippers",
      league: "NBA",
      quarter: "Q3",
      time: "8:45",
      score: { home: 89, away: 92 },
      homeOdds: "2.05",
      awayOdds: "1.75"
    }
  ];

  const popularBets = [
    {
      id: "mvp",
      title: "MVP da Temporada NBA",
      options: [
        { player: "Luka Dončić", odds: "3.25" },
        { player: "Jayson Tatum", odds: "4.50" },
        { player: "Nikola Jokić", odds: "5.00" },
        { player: "Giannis Antetokounmpo", odds: "6.50" }
      ]
    },
    {
      id: "champion",
      title: "Campeão NBA 2024",
      options: [
        { team: "Boston Celtics", odds: "3.75" },
        { team: "Denver Nuggets", odds: "4.25" },
        { team: "Phoenix Suns", odds: "5.50" },
        { team: "Milwaukee Bucks", odds: "6.00" }
      ]
    }
  ];

  const handleOddsClick = (game: any, type: string, odds: string) => {
    const selection = {
      id: `${game.id}-${type}`,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      league: game.league || "Basquete",
      market: type === "over" ? `Total Mais ${game.total?.line}` : 
              type === "under" ? `Total Menos ${game.total?.line}` : "Vencedor",
      selection: type === "home" ? game.homeTeam : 
                type === "away" ? game.awayTeam :
                type === "over" ? `Mais ${game.total?.line}` : `Menos ${game.total?.line}`,
      odds: parseFloat(odds)
    };
    addSelection(selection);
  };

  const handleSpecialBetClick = (bet: any, option: any) => {
    const selection = {
      id: `${bet.id}-${option.player || option.team}`,
      homeTeam: "",
      awayTeam: "",
      league: "NBA",
      market: bet.title,
      selection: option.player || option.team,
      odds: parseFloat(option.odds)
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
          <div className="bg-gradient-to-r from-warning/20 to-primary/20 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Basquete</h1>
                <p className="text-muted-foreground">NBA, NBB e as principais ligas mundiais</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-warning" />
                <span className="text-muted-foreground">{leagues.length} ligas disponíveis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {leagues.reduce((total, league) => total + league.games.length, 0)} jogos hoje
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="games">Jogos</TabsTrigger>
            <TabsTrigger value="live">Ao Vivo</TabsTrigger>
            <TabsTrigger value="futures">Futuros</TabsTrigger>
            <TabsTrigger value="leagues">Ligas</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            <h2 className="text-xl font-bold">Próximos Jogos</h2>
            
            <div className="space-y-4">
              {leagues.flatMap(league => 
                league.games.map(game => ({ ...game, league: league.name }))
              ).map((game) => (
                <Card key={game.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{game.league}</span>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{game.date}</span>
                      <Clock className="h-4 w-4" />
                      <span>{game.time}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-sm font-bold text-warning-foreground mb-1">
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
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "home", game.homeOdds)}
                        >
                          <span className="text-xs">{game.homeTeam}</span>
                          <span className="font-bold text-success">{game.homeOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "away", game.awayOdds)}
                        >
                          <span className="text-xs">{game.awayTeam}</span>
                          <span className="font-bold text-success">{game.awayOdds}</span>
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 flex flex-col justify-center hover:border-primary hover:bg-primary/10"
                          onClick={() => handleOddsClick(game, "over", game.total.over)}
                        >
                          <span className="text-xs">Mais {game.total.line}</span>
                          <span className="text-sm font-bold text-primary">{game.total.over}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 flex flex-col justify-center hover:border-primary hover:bg-primary/10"
                          onClick={() => handleOddsClick(game, "under", game.total.under)}
                        >
                          <span className="text-xs">Menos {game.total.line}</span>
                          <span className="text-sm font-bold text-primary">{game.total.under}</span>
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

          <TabsContent value="live" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <div className="w-2 h-2 bg-danger rounded-full animate-pulse"></div>
              <span>Jogos Ao Vivo</span>
            </h2>
            
            <div className="space-y-4">
              {liveGames.map((game) => (
                <Card key={game.id} className="p-4 border-l-4 border-l-danger">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-danger text-danger-foreground animate-pulse">
                        <div className="w-2 h-2 bg-danger-foreground rounded-full mr-2"></div>
                        AO VIVO
                      </Badge>
                      <span className="text-sm text-muted-foreground">{game.league}</span>
                    </div>
                    <span className="font-mono text-sm font-bold bg-accent px-2 py-1 rounded">
                      {game.quarter} {game.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-sm font-bold text-warning-foreground mb-1">
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
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "home", game.homeOdds)}
                        >
                          <span className="text-xs">{game.homeTeam}</span>
                          <span className="font-bold text-success">{game.homeOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                          onClick={() => handleOddsClick(game, "away", game.awayOdds)}
                        >
                          <span className="text-xs">{game.awayTeam}</span>
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

          <TabsContent value="futures" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>Apostas de Longo Prazo</span>
            </h2>
            
            <div className="grid gap-6">
              {popularBets.map((bet) => (
                <Card key={bet.id} className="p-4">
                  <h3 className="font-semibold mb-4">{bet.title}</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {bet.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-16 flex flex-col justify-center items-center hover:border-success hover:bg-success/10"
                        onClick={() => handleSpecialBetClick(bet, option)}
                      >
                        <span className="text-xs mb-1 text-center leading-tight">
                          {option.player || option.team}
                        </span>
                        <span className="font-bold text-success">{option.odds}</span>
                      </Button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leagues" className="space-y-6">
            <h2 className="text-xl font-bold">Ligas de Basquete</h2>
            
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
                              <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center text-xs font-bold text-warning-foreground mb-1">
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

                      <div className="grid grid-cols-2 gap-1">
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
        </Tabs>
      </main>
    </div>
  );
};

export default Basquete;