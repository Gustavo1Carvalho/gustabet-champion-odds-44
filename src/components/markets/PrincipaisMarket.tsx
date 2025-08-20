import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, TrendingUp } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { generateMatchOdds } from "@/utils/oddsGenerator";

interface PrincipaisMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const PrincipaisMarket = ({ gameData }: PrincipaisMarketProps) => {
  const { addSelection } = useBetSlipContext();
  
  // Gerar odds dinâmicas baseadas nos dados do jogo
  const matchOdds = generateMatchOdds(gameData);
  
  // Calcular Super Odds (odds melhoradas)
  const superOdds = {
    home: (parseFloat(matchOdds.home) * 1.1).toFixed(2),
    draw: (parseFloat(matchOdds.draw) * 1.15).toFixed(2),
    away: (parseFloat(matchOdds.away) * 1.2).toFixed(2)
  };
  
  // Calcular dupla chance
  const duplaChance = {
    homeDraw: (1 / ((1/parseFloat(matchOdds.home)) + (1/parseFloat(matchOdds.draw))) * 1.05).toFixed(2),
    awayDraw: (1 / ((1/parseFloat(matchOdds.away)) + (1/parseFloat(matchOdds.draw))) * 1.05).toFixed(2),
    homeAway: (1 / ((1/parseFloat(matchOdds.home)) + (1/parseFloat(matchOdds.away))) * 1.05).toFixed(2)
  };
  
  // Calcular empate anula
  const empateAnula = {
    home: (parseFloat(matchOdds.home) * 0.9).toFixed(2),
    away: (parseFloat(matchOdds.away) * 0.9).toFixed(2)
  };

  const markets = [
    {
      id: "resultado-final-super",
      title: "Resultado Final",
      subtitle: "SuperOdds",
      isSuper: true,
      odds: [
        { id: "casa-super", label: gameData.homeTeam, value: superOdds.home, type: "home" },
        { id: "empate-super", label: "Empate", value: superOdds.draw, type: "draw" },
        { id: "fora-super", label: gameData.awayTeam, value: superOdds.away, type: "away" }
      ]
    },
    {
      id: "resultado-final",
      title: "Resultado Final",
      subtitle: "1X2",
      isSuper: false,
      odds: [
        { id: "casa", label: gameData.homeTeam, value: matchOdds.home, type: "home" },
        { id: "empate", label: "Empate", value: matchOdds.draw, type: "draw" },
        { id: "fora", label: gameData.awayTeam, value: matchOdds.away, type: "away" }
      ]
    },
    {
      id: "dupla-chance",
      title: "Dupla Chance",
      subtitle: "",
      isSuper: false,
      odds: [
        { id: "casa-empate", label: `${gameData.homeTeam} ou Empate`, value: duplaChance.homeDraw, type: "home-draw" },
        { id: "fora-empate", label: `${gameData.awayTeam} ou Empate`, value: duplaChance.awayDraw, type: "away-draw" },
        { id: "casa-fora", label: `${gameData.homeTeam} ou ${gameData.awayTeam}`, value: duplaChance.homeAway, type: "home-away" }
      ]
    },
    {
      id: "empate-anula",
      title: "Empate Anula Aposta",
      subtitle: "",
      isSuper: false,
      odds: [
        { id: "casa-empate-anula", label: gameData.homeTeam, value: empateAnula.home, type: "home-draw-void" },
        { id: "fora-empate-anula", label: gameData.awayTeam, value: empateAnula.away, type: "away-draw-void" }
      ]
    }
  ];

  const handleOddsClick = (market: any, odd: any) => {
    const betSelection = {
      id: `${market.id}-${odd.id}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: market.title,
      selection: odd.label,
      odds: parseFloat(odd.value)
    };
    addSelection(betSelection);
  };

  return (
    <div className="space-y-4">
      {markets.map((market) => (
        <Card key={market.id} className="p-4 bg-neutral-card border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-card-foreground">{market.title}</h3>
              {market.isSuper && (
                <Badge className="bg-purple text-purple-foreground">
                  <Crown className="h-3 w-3 mr-1" />
                  Super
                </Badge>
              )}
              {market.subtitle && !market.isSuper && (
                <span className="text-sm text-muted-foreground">({market.subtitle})</span>
              )}
            </div>
            {market.isSuper && (
              <TrendingUp className="h-4 w-4 text-purple" />
            )}
          </div>

          <div className={`grid gap-2 ${
            market.odds.length === 3 
              ? "grid-cols-1 gap-2" 
              : "grid-cols-2 gap-2"
          }`}>
            {market.odds.map((odd) => (
              <Button
                key={odd.id}
                variant="outline"
                className={`
                  h-14 flex flex-col justify-center items-center transition-all duration-200
                  bg-neutral-light text-card-foreground border-border/50 
                  hover:border-success hover:bg-success/10 hover:text-success
                  ${market.isSuper ? 'border-purple/30 hover:border-purple hover:bg-purple/10 hover:text-purple' : ''}
                `}
                onClick={() => handleOddsClick(market, odd)}
              >
                <span className="text-xs mb-1 text-center leading-tight px-2">
                  {odd.label}
                </span>
                <span className="text-base font-bold text-success">
                  {odd.value}
                </span>
              </Button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PrincipaisMarket;