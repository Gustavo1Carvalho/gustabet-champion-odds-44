import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Zap, Star } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

interface SpecialOddsCardsProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const SpecialOddsCards = ({ gameData }: SpecialOddsCardsProps) => {
  const { addSelection } = useBetSlipContext();

  const specialOdds = [
    {
      type: "super",
      icon: Zap,
      title: "Odds Super Turbinadas",
      description: "Cartão vermelho ou Pênalti concedido + Escanteios Mais/Menos 8.5",
      oldOdds: "2.85",
      newOdds: "4.20",
      boost: "+47%"
    },
    {
      type: "turbo",
      icon: TrendingUp,
      title: "Odds Turbinadas",
      description: "Ambas equipes marcam + Mais de 2.5 gols",
      oldOdds: "1.95",
      newOdds: "2.65",
      boost: "+36%"
    },
    {
      type: "highlight",
      icon: Star,
      title: "Odds Destaques",
      description: "Mais de 1.5 gols + Mais de 9.5 escanteios",
      oldOdds: "1.75",
      newOdds: "2.25",
      boost: "+29%"
    }
  ];

  const handleSpecialOddsClick = (odds: any) => {
    const betSelection = {
      id: `special-${odds.type}-${Date.now()}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: odds.title,
      selection: odds.description,
      odds: parseFloat(odds.newOdds)
    };
    addSelection(betSelection);
  };

  const getCardStyles = (type: string) => {
    switch (type) {
      case "super":
        return "border-warning bg-warning/5 hover:bg-warning/10";
      case "turbo":
        return "border-success bg-success/5 hover:bg-success/10";
      case "highlight":
        return "border-primary bg-primary/5 hover:bg-primary/10";
      default:
        return "";
    }
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case "super":
        return "bg-warning text-warning-foreground";
      case "turbo":
        return "bg-success text-success-foreground";
      case "highlight":
        return "bg-primary text-primary-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Odds Especiais</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {specialOdds.map((odds, index) => {
          const IconComponent = odds.icon;
          
          return (
            <Card 
              key={index}
              className={`p-4 transition-all duration-300 hover:shadow-elevated cursor-pointer ${getCardStyles(odds.type)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="font-semibold text-sm">{odds.title}</span>
                </div>
                <Badge className={getBadgeStyles(odds.type)}>
                  {odds.boost}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {odds.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {odds.oldOdds}
                  </span>
                  <span className="text-lg font-bold text-success">
                    {odds.newOdds}
                  </span>
                </div>
                
                <Button
                  size="sm"
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => handleSpecialOddsClick(odds)}
                >
                  Apostar
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialOddsCards;