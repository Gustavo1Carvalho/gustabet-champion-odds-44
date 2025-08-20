import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

interface HandicapMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const HandicapMarket = ({ gameData }: HandicapMarketProps) => {
  const { addSelection } = useBetSlipContext();

  const markets = [
    {
      id: "handicap-europeu",
      title: "Handicap Europeu",
      icon: TrendingUp,
      subtitle: "3 vias",
      odds: [
        { id: "casa-hcp-1", label: `${gameData.homeTeam} (-1)`, value: "3.25", type: "home", handicap: "-1" },
        { id: "empate-hcp-1", label: "Empate (-1)", value: "3.85", type: "draw", handicap: "-1" },
        { id: "fora-hcp-1", label: `${gameData.awayTeam} (+1)`, value: "1.95", type: "away", handicap: "+1" },
        { id: "casa-hcp-2", label: `${gameData.homeTeam} (-2)`, value: "5.50", type: "home", handicap: "-2" },
        { id: "empate-hcp-2", label: "Empate (-2)", value: "4.75", type: "draw", handicap: "-2" },
        { id: "fora-hcp-2", label: `${gameData.awayTeam} (+2)`, value: "1.45", type: "away", handicap: "+2" }
      ]
    },
    {
      id: "handicap-asiatico",
      title: "Handicap Asiático",
      icon: Target,
      subtitle: "2 vias",
      odds: [
        { id: "casa-asia-025", label: `${gameData.homeTeam} (-0.25)`, value: "2.15", type: "home", handicap: "-0.25" },
        { id: "fora-asia-025", label: `${gameData.awayTeam} (+0.25)`, value: "1.75", type: "away", handicap: "+0.25" },
        { id: "casa-asia-05", label: `${gameData.homeTeam} (-0.5)`, value: "2.35", type: "home", handicap: "-0.5" },
        { id: "fora-asia-05", label: `${gameData.awayTeam} (+0.5)`, value: "1.65", type: "away", handicap: "+0.5" },
        { id: "casa-asia-075", label: `${gameData.homeTeam} (-0.75)`, value: "2.65", type: "home", handicap: "-0.75" },
        { id: "fora-asia-075", label: `${gameData.awayTeam} (+0.75)`, value: "1.52", type: "away", handicap: "+0.75" },
        { id: "casa-asia-1", label: `${gameData.homeTeam} (-1.0)`, value: "2.95", type: "home", handicap: "-1.0" },
        { id: "fora-asia-1", label: `${gameData.awayTeam} (+1.0)`, value: "1.42", type: "away", handicap: "+1.0" },
        { id: "casa-asia-125", label: `${gameData.homeTeam} (-1.25)`, value: "3.35", type: "home", handicap: "-1.25" },
        { id: "fora-asia-125", label: `${gameData.awayTeam} (+1.25)`, value: "1.32", type: "away", handicap: "+1.25" },
        { id: "casa-asia-15", label: `${gameData.homeTeam} (-1.5)`, value: "3.85", type: "home", handicap: "-1.5" },
        { id: "fora-asia-15", label: `${gameData.awayTeam} (+1.5)`, value: "1.25", type: "away", handicap: "+1.5" }
      ]
    },
    {
      id: "handicap-gols-asia",
      title: "Handicap Asiático - Total de Gols",
      icon: Target,
      subtitle: "Over/Under com handicap",
      odds: [
        { id: "gols-asia-2", label: "Over 2.0", value: "1.95", type: "over", handicap: "2.0" },
        { id: "gols-asia-2-under", label: "Under 2.0", value: "1.85", type: "under", handicap: "2.0" },
        { id: "gols-asia-225", label: "Over 2.25", value: "2.15", type: "over", handicap: "2.25" },
        { id: "gols-asia-225-under", label: "Under 2.25", value: "1.75", type: "under", handicap: "2.25" },
        { id: "gols-asia-275", label: "Over 2.75", value: "2.45", type: "over", handicap: "2.75" },
        { id: "gols-asia-275-under", label: "Under 2.75", value: "1.55", type: "under", handicap: "2.75" },
        { id: "gols-asia-3", label: "Over 3.0", value: "2.85", type: "over", handicap: "3.0" },
        { id: "gols-asia-3-under", label: "Under 3.0", value: "1.42", type: "under", handicap: "3.0" }
      ]
    },
    {
      id: "handicap-escanteios-asia",
      title: "Handicap Asiático - Escanteios",
      icon: Zap,
      subtitle: "Times com handicap",
      isTeamBased: true,
      teams: [
        {
          name: `${gameData.homeTeam} vs ${gameData.awayTeam}`,
          odds: [
            { id: "casa-esc-hcp-05", label: `${gameData.homeTeam} (-0.5)`, value: "2.15", type: "home", handicap: "-0.5" },
            { id: "fora-esc-hcp-05", label: `${gameData.awayTeam} (+0.5)`, value: "1.75", type: "away", handicap: "+0.5" },
            { id: "casa-esc-hcp-1", label: `${gameData.homeTeam} (-1.0)`, value: "2.65", type: "home", handicap: "-1.0" },
            { id: "fora-esc-hcp-1", label: `${gameData.awayTeam} (+1.0)`, value: "1.48", type: "away", handicap: "+1.0" },
            { id: "casa-esc-hcp-15", label: `${gameData.homeTeam} (-1.5)`, value: "3.25", type: "home", handicap: "-1.5" },
            { id: "fora-esc-hcp-15", label: `${gameData.awayTeam} (+1.5)`, value: "1.32", type: "away", handicap: "+1.5" }
          ]
        }
      ]
    }
  ];

  const handleOddsClick = (market: any, odd: any, teamName?: string) => {
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

            {market.isTeamBased ? (
              <div className="space-y-4">
                {market.teams?.map((team) => (
                  <div key={team.name}>
                    <div className="grid grid-cols-2 gap-2">
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
                market.id === "handicap-europeu" ? "grid-cols-3" : "grid-cols-2"
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

export default HandicapMarket;