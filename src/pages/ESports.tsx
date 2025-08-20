import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Calendar, Star, Clock, Trophy, Users, Zap } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const ESports = () => {
  const { addSelection } = useBetSlipContext();

  const games = [
    {
      id: 1,
      homeTeam: "T1",
      awayTeam: "Gen.G",
      game: "League of Legends",
      tournament: "LCK Spring 2024",
      date: "2024-01-20",
      time: "07:00",
      homeOdds: "1.75",
      awayOdds: "2.05",
      format: "BO3",
      isLive: false
    },
    {
      id: 2,
      homeTeam: "LOUD",
      awayTeam: "FURIA",
      game: "VALORANT",
      tournament: "VCT Americas",
      date: "2024-01-20",
      time: "20:00",
      homeOdds: "1.95",
      awayOdds: "1.85",
      format: "BO3",
      isLive: false
    },
    {
      id: 3,
      homeTeam: "G2 Esports",
      awayTeam: "Fnatic",
      game: "League of Legends",
      tournament: "LEC Spring 2024",
      date: "2024-01-21",
      time: "16:00",
      homeOdds: "2.25",
      awayOdds: "1.65",
      format: "BO1",
      isLive: false
    },
    {
      id: 4,
      homeTeam: "Astralis",
      awayTeam: "NAVI",
      game: "CS2",
      tournament: "IEM Katowice",
      date: "2024-01-21",
      time: "14:00",
      homeOdds: "2.40",
      awayOdds: "1.55",
      format: "BO3",
      isLive: false
    },
    {
      id: 5,
      homeTeam: "paiN Gaming",
      awayTeam: "MIBR",
      game: "CS2",
      tournament: "ESL Pro League",
      date: "2024-01-21",
      time: "18:00",
      homeOdds: "1.80",
      awayOdds: "2.00",
      format: "BO3",
      isLive: false
    }
  ];

  const liveGames = [
    {
      id: 6,
      homeTeam: "FaZe Clan",
      awayTeam: "Cloud9",
      game: "CS2",
      tournament: "BLAST Premier",
      currentMap: "Mirage",
      score: { home: 14, away: 10 },
      homeOdds: "1.45",
      awayOdds: "2.75",
      format: "BO3",
      isLive: true
    }
  ];

  const tournaments = [
    {
      name: "League of Legends World Championship",
      prize: "$2,225,000",
      teams: 22,
      winner: { team: "T1", odds: "3.25" }
    },
    {
      name: "VALORANT Champions",
      prize: "$1,000,000",
      teams: 16,
      winner: { team: "LOUD", odds: "4.50" }
    },
    {
      name: "CS2 Major Championship",
      prize: "$1,250,000",
      teams: 24,
      winner: { team: "FaZe Clan", odds: "5.00" }
    }
  ];

  const gameCategories = [
    { id: "lol", name: "League of Legends", icon: "🎮", count: 15 },
    { id: "valorant", name: "VALORANT", icon: "🎯", count: 8 },
    { id: "cs2", name: "Counter-Strike 2", icon: "💥", count: 12 },
    { id: "dota2", name: "Dota 2", icon: "⚔️", count: 6 },
    { id: "overwatch", name: "Overwatch 2", icon: "🚀", count: 4 }
  ];

  const handleOddsClick = (game: any, type: string, odds: string) => {
    const selection = {
      id: `${game.id}-${type}`,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      league: `${game.game} - ${game.tournament}`,
      market: "Vencedor",
      selection: type === "home" ? game.homeTeam : game.awayTeam,
      odds: parseFloat(odds)
    };
    addSelection(selection);
  };

  const handleTournamentWinnerClick = (tournament: any) => {
    const selection = {
      id: `tournament-${tournament.name}`,
      homeTeam: "",
      awayTeam: "",
      league: tournament.name,
      market: "Vencedor do Torneio",
      selection: tournament.winner.team,
      odds: parseFloat(tournament.winner.odds)
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
          <div className="bg-gradient-to-r from-purple/20 to-pink/20 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple rounded-full flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-purple-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">eSports</h1>
                <p className="text-muted-foreground">Os maiores torneios de jogos eletrônicos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-purple" />
                <span className="text-muted-foreground">{gameCategories.length} jogos disponíveis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-pink" />
                <span className="text-muted-foreground">
                  {gameCategories.reduce((total, cat) => total + cat.count, 0)} partidas hoje
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="matches">Partidas</TabsTrigger>
            <TabsTrigger value="live">Ao Vivo</TabsTrigger>
            <TabsTrigger value="tournaments">Torneios</TabsTrigger>
            <TabsTrigger value="games">Por Jogo</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            <h2 className="text-xl font-bold">Próximas Partidas</h2>
            
            <div className="space-y-4">
              {games.map((game) => (
                <Card key={game.id} className="p-4 border-l-4 border-l-purple">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-purple/10 text-purple border-purple/20">
                        {game.game}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{game.tournament}</span>
                      <Badge variant="outline" className="text-xs">
                        {game.format}
                      </Badge>
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
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-purple rounded-full flex items-center justify-center text-sm font-bold text-purple-foreground mb-1">
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
                          className="h-12 flex flex-col justify-center items-center hover:border-purple hover:bg-purple/10"
                          onClick={() => handleOddsClick(game, "home", game.homeOdds)}
                        >
                          <span className="text-xs">{game.homeTeam}</span>
                          <span className="font-bold text-purple">{game.homeOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-purple hover:bg-purple/10"
                          onClick={() => handleOddsClick(game, "away", game.awayOdds)}
                        >
                          <span className="text-xs">{game.awayTeam}</span>
                          <span className="font-bold text-purple">{game.awayOdds}</span>
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
              <span>Partidas Ao Vivo</span>
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
                      <Badge className="bg-purple/10 text-purple border-purple/20">
                        {game.game}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{game.tournament}</span>
                    </div>
                    <span className="font-mono text-sm font-bold bg-accent px-2 py-1 rounded">
                      {game.currentMap}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-purple rounded-full flex items-center justify-center text-sm font-bold text-purple-foreground mb-1">
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
                          className="h-12 flex flex-col justify-center items-center hover:border-purple hover:bg-purple/10"
                          onClick={() => handleOddsClick(game, "home", game.homeOdds)}
                        >
                          <span className="text-xs">{game.homeTeam}</span>
                          <span className="font-bold text-purple">{game.homeOdds}</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="h-12 flex flex-col justify-center items-center hover:border-purple hover:bg-purple/10"
                          onClick={() => handleOddsClick(game, "away", game.awayOdds)}
                        >
                          <span className="text-xs">{game.awayTeam}</span>
                          <span className="font-bold text-purple">{game.awayOdds}</span>
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

          <TabsContent value="tournaments" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-warning" />
              <span>Grandes Torneios</span>
            </h2>
            
            <div className="grid gap-6">
              {tournaments.map((tournament, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{tournament.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Prêmio: {tournament.prize}</span>
                        <span>{tournament.teams} times</span>
                      </div>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">
                      <Trophy className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Favorito para vencer:</span>
                      <Button
                        variant="outline"
                        className="hover:border-warning hover:bg-warning/10"
                        onClick={() => handleTournamentWinnerClick(tournament)}
                      >
                        <span className="mr-2">{tournament.winner.team}</span>
                        <span className="font-bold text-warning">{tournament.winner.odds}</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <h2 className="text-xl font-bold">Jogos Disponíveis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameCategories.map((category) => (
                <Card key={category.id} className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} partidas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {category.count} eventos
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-purple">
                      Ver partidas
                    </Button>
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

export default ESports;