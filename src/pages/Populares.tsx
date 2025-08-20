import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, Users } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

const Populares = () => {
  const { addSelection } = useBetSlipContext();

  const popularBets = [
    {
      id: 1,
      title: "Flamengo vs Palmeiras",
      league: "Brasileirão",
      popularity: 95,
      odds: { home: "2.10", draw: "3.25", away: "3.40" }
    },
    {
      id: 2,
      title: "Real Madrid vs Barcelona",
      league: "El Clasico",
      popularity: 88,
      odds: { home: "2.25", draw: "3.10", away: "3.20" }
    }
  ];

  const handleOddsClick = (bet: any, type: string, odds: string) => {
    const selection = {
      id: `${bet.id}-${type}`,
      homeTeam: bet.title.split(" vs ")[0],
      awayTeam: bet.title.split(" vs ")[1],
      league: bet.league,
      market: "Resultado Final",
      selection: type === "home" ? bet.title.split(" vs ")[0] : type === "draw" ? "Empate" : bet.title.split(" vs ")[1],
      odds: parseFloat(odds)
    };
    addSelection(selection);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-fire/20 to-trending/20 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <Flame className="h-8 w-8 text-fire" />
            <div>
              <h1 className="text-2xl font-bold">Apostas Populares</h1>
              <p className="text-muted-foreground">Os jogos mais apostados pelos usuários</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {popularBets.map((bet) => (
            <Card key={bet.id} className="p-4 border-l-4 border-l-fire">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-fire text-fire-foreground">
                    <Flame className="h-3 w-3 mr-1" />
                    {bet.popularity}% popular
                  </Badge>
                  <span className="text-sm text-muted-foreground">{bet.league}</span>
                </div>
              </div>

              <h3 className="font-semibold mb-4">{bet.title}</h3>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="h-12 flex flex-col justify-center hover:border-success hover:bg-success/10"
                  onClick={() => handleOddsClick(bet, "home", bet.odds.home)}
                >
                  <span className="text-xs">Casa</span>
                  <span className="font-bold text-success">{bet.odds.home}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 flex flex-col justify-center hover:border-success hover:bg-success/10"
                  onClick={() => handleOddsClick(bet, "draw", bet.odds.draw)}
                >
                  <span className="text-xs">Empate</span>
                  <span className="font-bold text-success">{bet.odds.draw}</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 flex flex-col justify-center hover:border-success hover:bg-success/10"
                  onClick={() => handleOddsClick(bet, "away", bet.odds.away)}
                >
                  <span className="text-xs">Fora</span>
                  <span className="font-bold text-success">{bet.odds.away}</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Populares;