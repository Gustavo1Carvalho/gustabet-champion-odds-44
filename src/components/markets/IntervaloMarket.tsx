import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Crown, Target } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { generateMatchOdds, generateGoalsOdds } from "@/utils/oddsGenerator";

interface IntervaloMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const IntervaloMarket = ({ gameData }: IntervaloMarketProps) => {
  const { addSelection } = useBetSlipContext();
  
  // Gerar odds dinâmicas baseadas no jogo
  const matchOdds = generateMatchOdds(gameData);
  const firstHalfGoals = [0.5, 1.5, 2.5].map(line => generateGoalsOdds(gameData, line));
  
  // Odds do primeiro tempo (mais conservadoras)
  const firstHalfOdds = {
    home: (parseFloat(matchOdds.home) * 1.15).toFixed(2),
    draw: (parseFloat(matchOdds.draw) * 0.8).toFixed(2), // Empate mais provável no 1T
    away: (parseFloat(matchOdds.away) * 1.2).toFixed(2)
  };
  
  // Dupla chance no primeiro tempo
  const firstHalfDuplaChance = {
    homeDraw: (1 / ((1/parseFloat(firstHalfOdds.home)) + (1/parseFloat(firstHalfOdds.draw))) * 1.05).toFixed(2),
    awayDraw: (1 / ((1/parseFloat(firstHalfOdds.away)) + (1/parseFloat(firstHalfOdds.draw))) * 1.05).toFixed(2),
    homeAway: (1 / ((1/parseFloat(firstHalfOdds.home)) + (1/parseFloat(firstHalfOdds.away))) * 1.05).toFixed(2)
  };
  
  // HT/FT odds (combinações mais complexas)
  const htFtOdds = {
    homeHome: (parseFloat(firstHalfOdds.home) * parseFloat(matchOdds.home) * 0.7).toFixed(2),
    homeDraw: (parseFloat(firstHalfOdds.home) * parseFloat(matchOdds.draw) * 1.2).toFixed(2),
    homeAway: (parseFloat(firstHalfOdds.home) * parseFloat(matchOdds.away) * 2.5).toFixed(2),
    drawHome: (parseFloat(firstHalfOdds.draw) * parseFloat(matchOdds.home) * 1.1).toFixed(2),
    drawDraw: (parseFloat(firstHalfOdds.draw) * parseFloat(matchOdds.draw) * 0.9).toFixed(2),
    drawAway: (parseFloat(firstHalfOdds.draw) * parseFloat(matchOdds.away) * 1.3).toFixed(2),
    awayHome: (parseFloat(firstHalfOdds.away) * parseFloat(matchOdds.home) * 3.0).toFixed(2),
    awayDraw: (parseFloat(firstHalfOdds.away) * parseFloat(matchOdds.draw) * 1.8).toFixed(2),
    awayAway: (parseFloat(firstHalfOdds.away) * parseFloat(matchOdds.away) * 0.8).toFixed(2)
  };

  const markets = [
    {
      id: "resultado-1t",
      title: "Resultado do 1º Tempo",
      icon: Clock,
      odds: [
        { id: "casa-1t", label: gameData.homeTeam, value: firstHalfOdds.home, type: "home" },
        { id: "empate-1t", label: "Empate", value: firstHalfOdds.draw, type: "draw" },
        { id: "fora-1t", label: gameData.awayTeam, value: firstHalfOdds.away, type: "away" }
      ]
    },
    {
      id: "vencedor-ht-ft",
      title: "Vencedor HT/FT",
      icon: Crown,
      subtitle: "1º Tempo / Tempo Final",
      isCombo: true,
      odds: [
        { id: "casa-casa", label: `${gameData.homeTeam}/${gameData.homeTeam}`, value: htFtOdds.homeHome, type: "home-home" },
        { id: "casa-empate", label: `${gameData.homeTeam}/Empate`, value: htFtOdds.homeDraw, type: "home-draw" },
        { id: "casa-fora", label: `${gameData.homeTeam}/${gameData.awayTeam}`, value: htFtOdds.homeAway, type: "home-away" },
        { id: "empate-casa", label: `Empate/${gameData.homeTeam}`, value: htFtOdds.drawHome, type: "draw-home" },
        { id: "empate-empate", label: "Empate/Empate", value: htFtOdds.drawDraw, type: "draw-draw" },
        { id: "empate-fora", label: `Empate/${gameData.awayTeam}`, value: htFtOdds.drawAway, type: "draw-away" },
        { id: "fora-casa", label: `${gameData.awayTeam}/${gameData.homeTeam}`, value: htFtOdds.awayHome, type: "away-home" },
        { id: "fora-empate", label: `${gameData.awayTeam}/Empate`, value: htFtOdds.awayDraw, type: "away-draw" },
        { id: "fora-fora", label: `${gameData.awayTeam}/${gameData.awayTeam}`, value: htFtOdds.awayAway, type: "away-away" }
      ]
    },
    {
      id: "gols-1t",
      title: "Mais/Menos Gols no 1º Tempo",
      icon: Target,
      odds: [
        { id: "menos-05-1t", label: "Menos de 0.5", value: (parseFloat(firstHalfGoals[0].under) * 1.3).toFixed(2), type: "under" },
        { id: "mais-05-1t", label: "Mais de 0.5", value: (parseFloat(firstHalfGoals[0].over) * 1.1).toFixed(2), type: "over" },
        { id: "menos-15-1t", label: "Menos de 1.5", value: (parseFloat(firstHalfGoals[1].under) * 1.2).toFixed(2), type: "under" },
        { id: "mais-15-1t", label: "Mais de 1.5", value: (parseFloat(firstHalfGoals[1].over) * 1.8).toFixed(2), type: "over" },
        { id: "menos-25-1t", label: "Menos de 2.5", value: (parseFloat(firstHalfGoals[2].under) * 1.1).toFixed(2), type: "under" },
        { id: "mais-25-1t", label: "Mais de 2.5", value: (parseFloat(firstHalfGoals[2].over) * 3.5).toFixed(2), type: "over" }
      ]
    },
    {
      id: "dupla-chance-1t",
      title: "Dupla Chance - 1º Tempo",
      icon: Clock,
      odds: [
        { id: "casa-empate-1t", label: `${gameData.homeTeam} ou Empate`, value: firstHalfDuplaChance.homeDraw, type: "home-draw" },
        { id: "fora-empate-1t", label: `${gameData.awayTeam} ou Empate`, value: firstHalfDuplaChance.awayDraw, type: "away-draw" },
        { id: "casa-fora-1t", label: `${gameData.homeTeam} ou ${gameData.awayTeam}`, value: firstHalfDuplaChance.homeAway, type: "home-away" }
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
      {markets.map((market) => {
        const IconComponent = market.icon;
        return (
          <Card key={market.id} className="p-4 bg-neutral-card border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <IconComponent className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-card-foreground">{market.title}</h3>
                {market.subtitle && (
                  <span className="text-sm text-muted-foreground">({market.subtitle})</span>
                )}
              </div>
            </div>

            <div className={`grid gap-2 ${
              market.isCombo ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :
              market.odds.length === 3 ? "grid-cols-3" : "grid-cols-2"
            }`}>
              {market.odds.map((odd) => (
                <Button
                  key={odd.id}
                  variant="outline"
                  className="
                    h-16 flex flex-col justify-center items-center transition-all duration-200
                    bg-neutral-light text-card-foreground border-border/50 
                    hover:border-success hover:bg-success/10 hover:text-success
                  "
                  onClick={() => handleOddsClick(market, odd)}
                >
                  <span className="text-xs mb-1 text-center leading-tight">
                    {odd.label}
                  </span>
                  <span className="text-lg font-bold text-success">
                    {odd.value}
                  </span>
                </Button>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default IntervaloMarket;