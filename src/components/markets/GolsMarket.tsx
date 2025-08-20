import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, Users, TrendingUp } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { generateBothTeamsScoreOdds, generateGoalsOdds, generateMatchOdds } from "@/utils/oddsGenerator";

interface GolsMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const GolsMarket = ({ gameData }: GolsMarketProps) => {
  const { addSelection } = useBetSlipContext();
  
  // Gerar odds dinâmicas
  const bothTeamsScore = generateBothTeamsScoreOdds(gameData);
  const matchOdds = generateMatchOdds(gameData);
  const firstHalfGoals = generateGoalsOdds(gameData, 0.5);
  const secondHalfGoals = generateGoalsOdds(gameData, 0.5);
  
  // Calcular próximo time a marcar baseado nas odds do jogo
  const nextToScore = {
    home: (parseFloat(matchOdds.home) * 0.9).toFixed(2),
    away: (parseFloat(matchOdds.away) * 0.9).toFixed(2),
    none: "4.25"
  };
  
  // Odds para tempo específico (mais difícil)
  const halfTimeScoring = {
    firstHalf: {
      yes: (parseFloat(firstHalfGoals.over) * 1.2).toFixed(2),
      no: (parseFloat(firstHalfGoals.under) * 0.8).toFixed(2)
    },
    secondHalf: {
      yes: (parseFloat(secondHalfGoals.over) * 1.1).toFixed(2),
      no: (parseFloat(secondHalfGoals.under) * 0.9).toFixed(2)
    }
  };
  
  // Both teams score por tempo
  const bothTeamsScoreHalf = {
    firstHalf: {
      yes: (parseFloat(bothTeamsScore.yes) * 2.2).toFixed(2),
      no: (parseFloat(bothTeamsScore.no) * 0.7).toFixed(2)
    },
    secondHalf: {
      yes: (parseFloat(bothTeamsScore.yes) * 1.85).toFixed(2),
      no: (parseFloat(bothTeamsScore.no) * 0.75).toFixed(2)
    }
  };
  
  // Gols exatos baseados na probabilidade de gols
  const exactGoalsOdds = [
    (8.5 - parseFloat(firstHalfGoals.under) + Math.random()).toFixed(2),
    (4.75 - parseFloat(firstHalfGoals.over) * 0.5 + Math.random()).toFixed(2),
    (3.25 + Math.random() * 0.5).toFixed(2),
    (3.85 + Math.random() * 0.8).toFixed(2),
    (6.5 + Math.random() * 1.5).toFixed(2),
    (9.75 + Math.random() * 2).toFixed(2)
  ];

  const markets = [
    {
      id: "ambas-marcam",
      title: "Ambas as Equipes Marcam",
      icon: Users,
      odds: [
        { id: "sim", label: "Sim", value: bothTeamsScore.yes, type: "yes" },
        { id: "nao", label: "Não", value: bothTeamsScore.no, type: "no" }
      ]
    },
    {
      id: "gol-1-tempo",
      title: "Gol no 1º Tempo",
      icon: Clock,
      odds: [
        { id: "sim-1t", label: "Sim", value: halfTimeScoring.firstHalf.yes, type: "yes" },
        { id: "nao-1t", label: "Não", value: halfTimeScoring.firstHalf.no, type: "no" }
      ]
    },
    {
      id: "gol-2-tempo",
      title: "Gol no 2º Tempo",
      icon: Clock,
      odds: [
        { id: "sim-2t", label: "Sim", value: halfTimeScoring.secondHalf.yes, type: "yes" },
        { id: "nao-2t", label: "Não", value: halfTimeScoring.secondHalf.no, type: "no" }
      ]
    },
    {
      id: "proximo-marcar",
      title: "Próximo Time a Marcar",
      icon: Target,
      odds: [
        { id: "casa-prox", label: gameData.homeTeam, value: nextToScore.home, type: "home" },
        { id: "fora-prox", label: gameData.awayTeam, value: nextToScore.away, type: "away" },
        { id: "nenhum-prox", label: "Nenhum", value: nextToScore.none, type: "none" }
      ]
    },
    {
      id: "ambas-marcam-1t",
      title: "Ambas Marcam no 1º Tempo",
      icon: Users,
      odds: [
        { id: "sim-ambas-1t", label: "Sim", value: bothTeamsScoreHalf.firstHalf.yes, type: "yes" },
        { id: "nao-ambas-1t", label: "Não", value: bothTeamsScoreHalf.firstHalf.no, type: "no" }
      ]
    },
    {
      id: "ambas-marcam-2t",
      title: "Ambas Marcam no 2º Tempo",
      icon: Users,
      odds: [
        { id: "sim-ambas-2t", label: "Sim", value: bothTeamsScoreHalf.secondHalf.yes, type: "yes" },
        { id: "nao-ambas-2t", label: "Não", value: bothTeamsScoreHalf.secondHalf.no, type: "no" }
      ]
    },
    {
      id: "gols-exatos",
      title: "Número Exato de Gols",
      icon: Target,
      isGrid: true,
      odds: [
        { id: "0-gols", label: "0 Gols", value: exactGoalsOdds[0], type: "exact" },
        { id: "1-gol", label: "1 Gol", value: exactGoalsOdds[1], type: "exact" },
        { id: "2-gols", label: "2 Gols", value: exactGoalsOdds[2], type: "exact" },
        { id: "3-gols", label: "3 Gols", value: exactGoalsOdds[3], type: "exact" },
        { id: "4-gols", label: "4 Gols", value: exactGoalsOdds[4], type: "exact" },
        { id: "5-mais", label: "5+ Gols", value: exactGoalsOdds[5], type: "exact" }
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
            <div className="flex items-center space-x-2 mb-4">
              <IconComponent className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-card-foreground">{market.title}</h3>
            </div>

            <div className={`grid gap-2 ${
              market.isGrid ? "grid-cols-2 sm:grid-cols-3" :
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

export default GolsMarket;