import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Star, Clock, Trophy, Users, MapPin, Ticket } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const Eventos = () => {
  const { addSelection } = useBetSlipContext();

  const specialEvents = [
    {
      id: 1,
      title: "Copa América 2024",
      description: "O maior torneio de seleções da América do Sul",
      date: "20 Jun - 14 Jul",
      location: "Estados Unidos",
      participants: 16,
      image: "🏆",
      markets: [
        { label: "Campeão", options: [
          { team: "Argentina", odds: "2.25" },
          { team: "Brasil", odds: "3.50" },
          { team: "Uruguai", odds: "8.00" },
          { team: "Colômbia", odds: "12.00" }
        ]}
      ]
    },
    {
      id: 2,
      title: "Eurocopa 2024",
      description: "Campeonato Europeu de Futebol",
      date: "14 Jun - 14 Jul",
      location: "Alemanha",
      participants: 24,
      image: "⚽",
      markets: [
        { label: "Campeão", options: [
          { team: "França", odds: "4.50" },
          { team: "Inglaterra", odds: "5.00" },
          { team: "Alemanha", odds: "6.50" },
          { team: "Espanha", odds: "7.00" }
        ]}
      ]
    },
    {
      id: 3,
      title: "Olimpíadas Paris 2024",
      description: "Jogos Olímpicos de Verão",
      date: "26 Jul - 11 Ago",
      location: "Paris, França",
      participants: 206,
      image: "🥇",
      markets: [
        { label: "Mais Medalhas de Ouro", options: [
          { team: "Estados Unidos", odds: "1.65" },
          { team: "China", odds: "2.85" },
          { team: "França", odds: "15.00" },
          { team: "Grã-Bretanha", odds: "20.00" }
        ]}
      ]
    }
  ];

  const weeklyEvents = [
    {
      id: 4,
      title: "Clássico Real Madrid vs Barcelona",
      date: "2024-01-25",
      time: "17:00",
      location: "Santiago Bernabéu",
      category: "Futebol",
      featured: true,
      odds: {
        home: "2.10",
        draw: "3.40",
        away: "3.25"
      }
    },
    {
      id: 5,
      title: "NBA All-Star Game",
      date: "2024-01-28",
      time: "21:00",
      location: "Indianapolis",
      category: "Basquete",
      featured: true,
      odds: {
        east: "1.85",
        west: "1.95"
      }
    },
    {
      id: 6,
      title: "Worlds Finals - League of Legends",
      date: "2024-01-30",
      time: "14:00",
      location: "Londres",
      category: "eSports",
      featured: false,
      odds: {
        team1: "1.75",
        team2: "2.05"
      }
    }
  ];

  const upcomingTournaments = [
    {
      name: "Copa Libertadores",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      teams: 47,
      prize: "$25,000,000",
      sport: "Futebol"
    },
    {
      name: "NBA Playoffs",
      startDate: "2024-04-20",
      endDate: "2024-06-18",
      teams: 16,
      prize: "$100,000,000",
      sport: "Basquete"
    },
    {
      name: "Wimbledon",
      startDate: "2024-07-01",
      endDate: "2024-07-14",
      teams: 128,
      prize: "$50,000,000",
      sport: "Tênis"
    }
  ];

  const handleSpecialEventClick = (event: any, option: any) => {
    const selection = {
      id: `${event.id}-${option.team}`,
      homeTeam: "",
      awayTeam: "",
      league: event.title,
      market: "Campeão",
      selection: option.team,
      odds: parseFloat(option.odds)
    };
    addSelection(selection);
  };

  const handleEventOddsClick = (event: any, type: string, odds: string) => {
    const selection = {
      id: `${event.id}-${type}`,
      homeTeam: type === "home" ? "Real Madrid" : type === "east" ? "Conferência Leste" : "Time 1",
      awayTeam: type === "away" ? "Barcelona" : type === "west" ? "Conferência Oeste" : "Time 2",
      league: event.category,
      market: event.title,
      selection: type === "home" ? "Real Madrid" : 
                type === "away" ? "Barcelona" :
                type === "draw" ? "Empate" :
                type === "east" ? "Conferência Leste" :
                type === "west" ? "Conferência Oeste" :
                type === "team1" ? "Time 1" : "Time 2",
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
          <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Eventos Especiais</h1>
                <p className="text-muted-foreground">Grandes torneios e eventos imperdíveis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">{specialEvents.length} eventos especiais</span>
              </div>
              <div className="flex items-center space-x-2">
                <Ticket className="h-4 w-4 text-secondary" />
                <span className="text-muted-foreground">{weeklyEvents.length} eventos desta semana</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="special" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="special">Eventos Especiais</TabsTrigger>
            <TabsTrigger value="weekly">Esta Semana</TabsTrigger>
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
          </TabsList>

          <TabsContent value="special" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Star className="h-5 w-5 text-warning" />
              <span>Grandes Eventos</span>
            </h2>
            
            <div className="space-y-6">
              {specialEvents.map((event) => (
                <Card key={event.id} className="p-6 border-l-4 border-l-warning">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-4xl">{event.image}</span>
                        <div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{event.participants} participantes</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {event.markets.map((market, index) => (
                        <div key={index}>
                          <h4 className="font-semibold mb-3">{market.label}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {market.options.map((option, optIndex) => (
                              <Button
                                key={optIndex}
                                variant="outline"
                                className="h-12 flex flex-col justify-center items-center hover:border-warning hover:bg-warning/10"
                                onClick={() => handleSpecialEventClick(event, option)}
                              >
                                <span className="text-xs mb-1">{option.team}</span>
                                <span className="font-bold text-warning">{option.odds}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Eventos desta Semana</span>
            </h2>
            
            <div className="space-y-4">
              {weeklyEvents.map((event) => (
                <Card key={event.id} className={`p-4 ${event.featured ? 'border-l-4 border-l-primary' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {event.featured && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {event.category === "Futebol" && (
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-success hover:bg-success/10"
                            onClick={() => handleEventOddsClick(event, "home", event.odds.home)}
                          >
                            <span className="text-xs font-bold text-success">{event.odds.home}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-success hover:bg-success/10"
                            onClick={() => handleEventOddsClick(event, "draw", event.odds.draw)}
                          >
                            <span className="text-xs font-bold text-success">{event.odds.draw}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-success hover:bg-success/10"
                            onClick={() => handleEventOddsClick(event, "away", event.odds.away)}
                          >
                            <span className="text-xs font-bold text-success">{event.odds.away}</span>
                          </Button>
                        </div>
                      )}
                      
                      {event.category === "Basquete" && (
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-warning hover:bg-warning/10"
                            onClick={() => handleEventOddsClick(event, "east", event.odds.east)}
                          >
                            <span className="text-xs">Leste</span>
                            <span className="text-xs font-bold text-warning">{event.odds.east}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-warning hover:bg-warning/10"
                            onClick={() => handleEventOddsClick(event, "west", event.odds.west)}
                          >
                            <span className="text-xs">Oeste</span>
                            <span className="text-xs font-bold text-warning">{event.odds.west}</span>
                          </Button>
                        </div>
                      )}
                      
                      {event.category === "eSports" && (
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-purple hover:bg-purple/10"
                            onClick={() => handleEventOddsClick(event, "team1", event.odds.team1)}
                          >
                            <span className="text-xs font-bold text-purple">{event.odds.team1}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 flex flex-col justify-center hover:border-purple hover:bg-purple/10"
                            onClick={() => handleEventOddsClick(event, "team2", event.odds.team2)}
                          >
                            <span className="text-xs font-bold text-purple">{event.odds.team2}</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-accent" />
              <span>Próximos Torneios</span>
            </h2>
            
            <div className="grid gap-4">
              {upcomingTournaments.map((tournament, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{tournament.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{tournament.startDate} - {tournament.endDate}</span>
                        <Badge variant="outline">{tournament.sport}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">
                      Em Breve
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg">{tournament.teams}</div>
                      <div className="text-muted-foreground">Times</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-success">{tournament.prize}</div>
                      <div className="text-muted-foreground">Prêmio Total</div>
                    </div>
                    <div className="text-center">
                      <Button variant="outline" size="sm" className="w-full">
                        Acompanhar
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

export default Eventos;