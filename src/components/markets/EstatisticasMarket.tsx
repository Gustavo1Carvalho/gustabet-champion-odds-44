import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, Activity, Flag, AlertTriangle, Zap } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

interface EstatisticasMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const EstatisticasMarket = ({ gameData }: EstatisticasMarketProps) => {
  const { addSelection } = useBetSlipContext();

  const markets = [
    {
      id: "posse-bola",
      title: "Posse de Bola",
      icon: BarChart3,
      isTeamComparison: true,
      odds: [
        { id: "casa-posse", label: `${gameData.homeTeam} mais posse`, value: "1.65", type: "home-more" },
        { id: "fora-posse", label: `${gameData.awayTeam} mais posse`, value: "2.25", type: "away-more" }
      ]
    },
    {
      id: "finalizacoes-total",
      title: "Total de Finalizações",
      icon: Target,
      odds: [
        { id: "fin-menos-15", label: "Menos de 15.5", value: "1.85", type: "under" },
        { id: "fin-mais-15", label: "Mais de 15.5", value: "1.95", type: "over" },
        { id: "fin-menos-175", label: "Menos de 17.5", value: "2.15", type: "under" },
        { id: "fin-mais-175", label: "Mais de 17.5", value: "1.75", type: "over" },
        { id: "fin-menos-20", label: "Menos de 20.5", value: "2.45", type: "under" },
        { id: "fin-mais-20", label: "Mais de 20.5", value: "1.55", type: "over" }
      ]
    },
    {
      id: "chutes-gol",
      title: "Finalizações no Gol",
      icon: Activity,
      odds: [
        { id: "chut-gol-menos-6", label: "Menos de 6.5", value: "1.75", type: "under" },
        { id: "chut-gol-mais-6", label: "Mais de 6.5", value: "2.05", type: "over" },
        { id: "chut-gol-menos-8", label: "Menos de 8.5", value: "2.25", type: "under" },
        { id: "chut-gol-mais-8", label: "Mais de 8.5", value: "1.65", type: "over" },
        { id: "chut-gol-menos-10", label: "Menos de 10.5", value: "2.85", type: "under" },
        { id: "chut-gol-mais-10", label: "Mais de 10.5", value: "1.42", type: "over" }
      ]
    },
    {
      id: "escanteios-stats",
      title: "Estatísticas de Escanteios",
      icon: Flag,
      isTeamBased: true,
      teams: [
        {
          name: gameData.homeTeam,
          odds: [
            { id: "casa-esc-mais", label: "Mais escanteios", value: "1.95", type: "more-corners" },
            { id: "casa-esc-menos-3", label: "Menos de 3.5", value: "2.15", type: "under" },
            { id: "casa-esc-mais-3", label: "Mais de 3.5", value: "1.75", type: "over" }
          ]
        },
        {
          name: gameData.awayTeam,
          odds: [
            { id: "fora-esc-mais", label: "Mais escanteios", value: "1.85", type: "more-corners" },
            { id: "fora-esc-menos-3", label: "Menos de 3.5", value: "2.45", type: "under" },
            { id: "fora-esc-mais-3", label: "Mais de 3.5", value: "1.55", type: "over" }
          ]
        }
      ]
    },
    {
      id: "faltas-total",
      title: "Total de Faltas",
      icon: AlertTriangle,
      odds: [
        { id: "faltas-menos-20", label: "Menos de 20.5", value: "2.05", type: "under" },
        { id: "faltas-mais-20", label: "Mais de 20.5", value: "1.85", type: "over" },
        { id: "faltas-menos-24", label: "Menos de 24.5", value: "1.65", type: "under" },
        { id: "faltas-mais-24", label: "Mais de 24.5", value: "2.25", type: "over" },
        { id: "faltas-menos-28", label: "Menos de 28.5", value: "1.35", type: "under" },
        { id: "faltas-mais-28", label: "Mais de 28.5", value: "3.15", type: "over" }
      ]
    },
    {
      id: "cartoes-stats",
      title: "Estatísticas de Cartões",
      icon: Zap,
      isTeamBased: true,
      teams: [
        {
          name: gameData.homeTeam,
          odds: [
            { id: "casa-cart-mais", label: "Mais cartões", value: "1.85", type: "more-cards" },
            { id: "casa-cart-menos-1", label: "Menos de 1.5", value: "2.45", type: "under" },
            { id: "casa-cart-mais-1", label: "Mais de 1.5", value: "1.55", type: "over" }
          ]
        },
        {
          name: gameData.awayTeam,
          odds: [
            { id: "fora-cart-mais", label: "Mais cartões", value: "1.95", type: "more-cards" },
            { id: "fora-cart-menos-1", label: "Menos de 1.5", value: "2.15", type: "under" },
            { id: "fora-cart-mais-1", label: "Mais de 1.5", value: "1.75", type: "over" }
          ]
        }
      ]
    },
    {
      id: "performance-geral",
      title: "Performance Geral",
      icon: BarChart3,
      isMultiCategory: true,
      categories: [
        {
          title: "Mais Finalizações",
          odds: [
            { id: "casa-mais-fin", label: gameData.homeTeam, value: "1.75", type: "home-more-shots" },
            { id: "fora-mais-fin", label: gameData.awayTeam, value: "2.05", type: "away-more-shots" }
          ]
        },
        {
          title: "Mais Faltas",
          odds: [
            { id: "casa-mais-faltas", label: gameData.homeTeam, value: "1.95", type: "home-more-fouls" },
            { id: "fora-mais-faltas", label: gameData.awayTeam, value: "1.85", type: "away-more-fouls" }
          ]
        }
      ]
    }
  ];

  const handleOddsClick = (market: any, odd: any, teamName?: string, categoryTitle?: string) => {
    const betSelection = {
      id: `${market.id}-${odd.id}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: categoryTitle ? `${market.title} - ${categoryTitle}` : teamName ? `${market.title} - ${teamName}` : market.title,
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

            {market.isMultiCategory ? (
              <div className="space-y-4">
                {market.categories?.map((category) => (
                  <div key={category.title}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {category.title}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.odds.map((odd) => (
                        <Button
                          key={odd.id}
                          variant="outline"
                          className="
                            h-16 flex flex-col justify-center items-center transition-all duration-200
                            bg-neutral-light text-card-foreground border-border/50 
                            hover:border-success hover:bg-success/10 hover:text-success
                          "
                          onClick={() => handleOddsClick(market, odd, undefined, category.title)}
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
                  </div>
                ))}
              </div>
            ) : market.isTeamBased ? (
              <div className="space-y-4">
                {market.teams?.map((team) => (
                  <div key={team.name}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {team.name}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {team.odds.map((odd) => (
                        <Button
                          key={odd.id}
                          variant="outline"
                          className="
                            h-16 flex flex-col justify-center items-center transition-all duration-200
                            bg-neutral-light text-card-foreground border-border/50 
                            hover:border-success hover:bg-success/10 hover:text-success
                          "
                          onClick={() => handleOddsClick(market, odd, team.name)}
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
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-2 ${
                market.isTeamComparison ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
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
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default EstatisticasMarket;