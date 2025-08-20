import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Goal, CreditCard, UserX } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { generatePlayersForTeam, generatePlayerOdds, getTeamStrength } from "@/utils/oddsGenerator";

interface JogadoresMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const JogadoresMarket = ({ gameData }: JogadoresMarketProps) => {
  const { addSelection } = useBetSlipContext();
  
  // Gerar jogadores baseados nos nomes dos times
  const players = {
    home: generatePlayersForTeam(gameData.homeTeam),
    away: generatePlayersForTeam(gameData.awayTeam)
  };
  
  // Obter força dos times para odds mais realistas
  const homeStrength = getTeamStrength(gameData.homeTeam, gameData.league, true);
  const awayStrength = getTeamStrength(gameData.awayTeam, gameData.league, false);

  const markets = [
    {
      id: "primeiro-gol",
      title: "Primeiro a Marcar",
      icon: Goal,
      type: "first-goal"
    },
    {
      id: "jogador-marca",
      title: "Jogador Marca a Qualquer Momento",
      icon: User,
      type: "anytime-goal"
    },
    {
      id: "jogador-expulso",
      title: "Jogador Expulso",
      icon: UserX,
      type: "red-card"
    },
    {
      id: "jogador-cartao",
      title: "Jogador Recebe Cartão",
      icon: CreditCard,
      type: "yellow-card"
    }
  ];

  const getOddsForPlayer = (playerName: string, marketType: string, isHomeTeam: boolean) => {
    const teamStrength = isHomeTeam ? homeStrength : awayStrength;
    return generatePlayerOdds(playerName, marketType, teamStrength);
  };

  const handleOddsClick = (market: any, player: string, team: string, odds: string) => {
    const betSelection = {
      id: `${market.id}-${player.replace(/\s+/g, '-')}-${team}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: market.title,
      selection: `${player} (${team === 'home' ? gameData.homeTeam : gameData.awayTeam})`,
      odds: parseFloat(odds)
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

            <div className="space-y-4">
              {/* Home Team Players */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {gameData.homeTeam}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {players.home.map((player) => {
                    const odds = getOddsForPlayer(player, market.type, true);
                    return (
                      <Button
                        key={`${market.id}-${player}-home`}
                        variant="outline"
                        className="
                          h-16 flex flex-col justify-center items-center transition-all duration-200
                          bg-neutral-light text-card-foreground border-border/50 
                          hover:border-success hover:bg-success/10 hover:text-success
                        "
                        onClick={() => handleOddsClick(market, player, 'home', odds)}
                      >
                        <span className="text-xs mb-1 text-center leading-tight">
                          {player}
                        </span>
                        <span className="text-sm font-bold text-success">
                          {odds}
                        </span>
                      </Button>
                    );
                  })}
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
                  {players.away.map((player) => {
                    const odds = getOddsForPlayer(player, market.type, false);
                    return (
                      <Button
                        key={`${market.id}-${player}-away`}
                        variant="outline"
                        className="
                          h-16 flex flex-col justify-center items-center transition-all duration-200
                          bg-neutral-light text-card-foreground border-border/50 
                          hover:border-success hover:bg-success/10 hover:text-success
                        "
                        onClick={() => handleOddsClick(market, player, 'away', odds)}
                      >
                        <span className="text-xs mb-1 text-center leading-tight">
                          {player}
                        </span>
                        <span className="text-sm font-bold text-success">
                          {odds}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default JogadoresMarket;