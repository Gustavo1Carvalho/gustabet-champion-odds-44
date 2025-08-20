import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Flag, AlertTriangle } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { generateGoalsOdds, generateCornersOdds, generateCardsOdds } from "@/utils/oddsGenerator";

interface MaisMenosMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const MaisMenosMarket = ({ gameData }: MaisMenosMarketProps) => {
  const { addSelection } = useBetSlipContext();

  // Gerar odds dinâmicas para diferentes linhas
  const goalLines = [0.5, 1.5, 2.5, 3.5, 4.5];
  const cornerLines = [7.5, 8.5, 9.5, 10.5];
  const cardLines = [2.5, 3.5, 4.5];
  
  const goalOdds = goalLines.map(line => generateGoalsOdds(gameData, line));
  const cornerOdds = cornerLines.map(line => generateCornersOdds(gameData, line));
  const cardOdds = cardLines.map(line => generateCardsOdds(gameData, line));

  const markets = [
    {
      id: "total-gols",
      title: "Total de Gols",
      icon: Target,
      odds: [
        { id: "menos-05", label: "Menos de 0.5", value: goalOdds[0].under, type: "under" },
        { id: "mais-05", label: "Mais de 0.5", value: goalOdds[0].over, type: "over" },
        { id: "menos-15", label: "Menos de 1.5", value: goalOdds[1].under, type: "under" },
        { id: "mais-15", label: "Mais de 1.5", value: goalOdds[1].over, type: "over" },
        { id: "menos-25", label: "Menos de 2.5", value: goalOdds[2].under, type: "under" },
        { id: "mais-25", label: "Mais de 2.5", value: goalOdds[2].over, type: "over" },
        { id: "menos-35", label: "Menos de 3.5", value: goalOdds[3].under, type: "under" },
        { id: "mais-35", label: "Mais de 3.5", value: goalOdds[3].over, type: "over" },
        { id: "menos-45", label: "Menos de 4.5", value: goalOdds[4].under, type: "under" },
        { id: "mais-45", label: "Mais de 4.5", value: goalOdds[4].over, type: "over" }
      ]
    },
    {
      id: "escanteios",
      title: "Total de Escanteios",
      icon: Flag,
      odds: [
        { id: "esc-menos-75", label: "Menos de 7.5", value: cornerOdds[0].under, type: "under" },
        { id: "esc-mais-75", label: "Mais de 7.5", value: cornerOdds[0].over, type: "over" },
        { id: "esc-menos-85", label: "Menos de 8.5", value: cornerOdds[1].under, type: "under" },
        { id: "esc-mais-85", label: "Mais de 8.5", value: cornerOdds[1].over, type: "over" },
        { id: "esc-menos-95", label: "Menos de 9.5", value: cornerOdds[2].under, type: "under" },
        { id: "esc-mais-95", label: "Mais de 9.5", value: cornerOdds[2].over, type: "over" },
        { id: "esc-menos-105", label: "Menos de 10.5", value: cornerOdds[3].under, type: "under" },
        { id: "esc-mais-105", label: "Mais de 10.5", value: cornerOdds[3].over, type: "over" }
      ]
    },
    {
      id: "cartoes",
      title: "Total de Cartões",
      icon: AlertTriangle,
      odds: [
        { id: "cart-menos-25", label: "Menos de 2.5", value: cardOdds[0].under, type: "under" },
        { id: "cart-mais-25", label: "Mais de 2.5", value: cardOdds[0].over, type: "over" },
        { id: "cart-menos-35", label: "Menos de 3.5", value: cardOdds[1].under, type: "under" },
        { id: "cart-mais-35", label: "Mais de 3.5", value: cardOdds[1].over, type: "over" },
        { id: "cart-menos-45", label: "Menos de 4.5", value: cardOdds[2].under, type: "under" },
        { id: "cart-mais-45", label: "Mais de 4.5", value: cardOdds[2].over, type: "over" }
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

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
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
                  <span className="text-xs mb-1 text-center leading-tight px-1">
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

export default MaisMenosMarket;