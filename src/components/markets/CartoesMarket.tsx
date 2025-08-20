import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, User, UserX, Target } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

interface CartoesMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const CartoesMarket = ({ gameData }: CartoesMarketProps) => {
  const { addSelection } = useBetSlipContext();

  const players = {
    home: ["Everton Ribeiro", "Thiago Maia", "Léo Pereira", "Fabrício Bruno", "Ayrton Lucas"],
    away: ["Praxedes", "Galdames", "Léo", "Maicon", "Lucas Piton"]
  };

  const markets = [
    {
      id: "total-cartoes",
      title: "Total de Cartões",
      icon: AlertTriangle,
      odds: [
        { id: "cart-menos-25", label: "Menos de 2.5", value: "1.95", type: "under" },
        { id: "cart-mais-25", label: "Mais de 2.5", value: "1.85", type: "over" },
        { id: "cart-menos-35", label: "Menos de 3.5", value: "1.45", type: "under" },
        { id: "cart-mais-35", label: "Mais de 3.5", value: "2.75", type: "over" },
        { id: "cart-menos-45", label: "Menos de 4.5", value: "1.15", type: "under" },
        { id: "cart-mais-45", label: "Mais de 4.5", value: "5.50", type: "over" },
        { id: "cart-menos-55", label: "Menos de 5.5", value: "1.05", type: "under" },
        { id: "cart-mais-55", label: "Mais de 5.5", value: "8.75", type: "over" }
      ]
    },
    {
      id: "primeiro-cartao",
      title: "Primeiro Jogador a Receber Cartão",
      icon: User,
      isPlayerBased: true
    },
    {
      id: "jogador-expulso",
      title: "Jogador Expulso",
      icon: UserX,
      odds: [
        { id: "expulso-sim", label: "Sim", value: "4.25", type: "yes" },
        { id: "expulso-nao", label: "Não", value: "1.22", type: "no" }
      ]
    },
    {
      id: "cartoes-time",
      title: "Cartões por Time",
      icon: Target,
      isTeamBased: true,
      teams: [
        {
          name: gameData.homeTeam,
          odds: [
            { id: "casa-cart-menos-15", label: "Menos de 1.5", value: "2.45", type: "under" },
            { id: "casa-cart-mais-15", label: "Mais de 1.5", value: "1.55", type: "over" },
            { id: "casa-cart-menos-25", label: "Menos de 2.5", value: "1.35", type: "under" },
            { id: "casa-cart-mais-25", label: "Mais de 2.5", value: "3.15", type: "over" }
          ]
        },
        {
          name: gameData.awayTeam,
          odds: [
            { id: "fora-cart-menos-15", label: "Menos de 1.5", value: "2.15", type: "under" },
            { id: "fora-cart-mais-15", label: "Mais de 1.5", value: "1.75", type: "over" },
            { id: "fora-cart-menos-25", label: "Menos de 2.5", value: "1.28", type: "under" },
            { id: "fora-cart-mais-25", label: "Mais de 2.5", value: "3.65", type: "over" }
          ]
        }
      ]
    },
    {
      id: "cartoes-tempo",
      title: "Cartões por Tempo",
      icon: AlertTriangle,
      hasTimes: true,
      times: [
        {
          period: "1º Tempo",
          odds: [
            { id: "1t-cart-menos-15", label: "Menos de 1.5", value: "1.85", type: "under" },
            { id: "1t-cart-mais-15", label: "Mais de 1.5", value: "1.95", type: "over" },
            { id: "1t-cart-menos-25", label: "Menos de 2.5", value: "1.25", type: "under" },
            { id: "1t-cart-mais-25", label: "Mais de 2.5", value: "3.85", type: "over" }
          ]
        },
        {
          period: "2º Tempo",
          odds: [
            { id: "2t-cart-menos-15", label: "Menos de 1.5", value: "2.25", type: "under" },
            { id: "2t-cart-mais-15", label: "Mais de 1.5", value: "1.65", type: "over" },
            { id: "2t-cart-menos-25", label: "Menos de 2.5", value: "1.45", type: "under" },
            { id: "2t-cart-mais-25", label: "Mais de 2.5", value: "2.75", type: "over" }
          ]
        }
      ]
    }
  ];

  const handleOddsClick = (market: any, odd: any, teamName?: string, playerName?: string) => {
    const betSelection = {
      id: `${market.id}-${odd.id}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: teamName ? `${market.title} - ${teamName}` : market.title,
      selection: playerName ? `${playerName} (${teamName})` : odd.label,
      odds: parseFloat(odd.value || "3.50")
    };
    addSelection(betSelection);
  };

  const getPlayerOdds = () => "3.50"; // Base odds for player cards

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

            {market.isPlayerBased ? (
              <div className="space-y-4">
                {/* Home Team Players */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {gameData.homeTeam}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {players.home.map((player) => (
                      <Button
                        key={`${market.id}-${player}-home`}
                        variant="outline"
                        className="
                          h-16 flex flex-col justify-center items-center transition-all duration-200
                          bg-neutral-light text-card-foreground border-border/50 
                          hover:border-success hover:bg-success/10 hover:text-success
                        "
                        onClick={() => handleOddsClick(market, { id: `${player}-home`, label: player, value: getPlayerOdds() }, gameData.homeTeam, player)}
                      >
                        <span className="text-xs mb-1 text-center leading-tight">
                          {player}
                        </span>
                        <span className="text-sm font-bold text-success">
                          {getPlayerOdds()}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Away Team Players */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="bg-secondary/10 text-muted-foreground border-border">
                      {gameData.awayTeam}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {players.away.map((player) => (
                      <Button
                        key={`${market.id}-${player}-away`}
                        variant="outline"
                        className="
                          h-16 flex flex-col justify-center items-center transition-all duration-200
                          bg-neutral-light text-card-foreground border-border/50 
                          hover:border-success hover:bg-success/10 hover:text-success
                        "
                        onClick={() => handleOddsClick(market, { id: `${player}-away`, label: player, value: getPlayerOdds() }, gameData.awayTeam, player)}
                      >
                        <span className="text-xs mb-1 text-center leading-tight">
                          {player}
                        </span>
                        <span className="text-sm font-bold text-success">
                          {getPlayerOdds()}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
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
            ) : market.hasTimes ? (
              <div className="space-y-4">
                {market.times?.map((time) => (
                  <div key={time.period}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {time.period}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {time.odds.map((odd) => (
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
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-2 ${
                market.odds.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
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

export default CartoesMarket;