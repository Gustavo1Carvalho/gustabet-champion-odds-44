import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag, Clock, Target, TrendingUp } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { generateCornersOdds, generateMatchOdds } from "@/utils/oddsGenerator";

interface EscanteiosMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

const EscanteiosMarket = ({ gameData }: EscanteiosMarketProps) => {
  const { addSelection } = useBetSlipContext();
  
  // Gerar odds dinâmicas para escanteios
  const cornerLines = [7.5, 8.5, 9.5, 10.5, 11.5];
  const cornerOdds = cornerLines.map(line => generateCornersOdds(gameData, line));
  const matchOdds = generateMatchOdds(gameData);
  
  // Escanteios por time baseado na força
  const teamCornerLines = [3.5, 4.5, 5.5];
  const homeCornerOdds = teamCornerLines.map(line => generateCornersOdds(gameData, line * 2)); // Dobrar pois é apenas um time
  const awayCornerOdds = teamCornerLines.map(line => generateCornersOdds(gameData, line * 2.2)); // Time visitante tem menos escanteios
  
  // Primeiro escanteio baseado nas odds do jogo
  const firstCorner = {
    home: (parseFloat(matchOdds.home) * 0.95).toFixed(2),
    away: (parseFloat(matchOdds.away) * 0.95).toFixed(2)
  };
  
  // Escanteios por tempo (primeiro tempo tem menos)
  const halfTimeCorners = {
    firstHalf: [3.5, 4.5].map(line => ({
      over: (parseFloat(generateCornersOdds(gameData, line * 2).over) * 1.4).toFixed(2),
      under: (parseFloat(generateCornersOdds(gameData, line * 2).under) * 0.8).toFixed(2)
    })),
    secondHalf: [3.5, 4.5].map(line => ({
      over: (parseFloat(generateCornersOdds(gameData, line * 1.8).over) * 1.2).toFixed(2),
      under: (parseFloat(generateCornersOdds(gameData, line * 1.8).under) * 0.9).toFixed(2)
    }))
  };
  
  // Handicap de escanteios
  const cornerHandicap = {
    homeMinus15: (parseFloat(matchOdds.home) * 1.4).toFixed(2),
    awayPlus15: (parseFloat(matchOdds.away) * 0.7).toFixed(2),
    homeMinus05: (parseFloat(matchOdds.home) * 1.1).toFixed(2),
    awayPlus05: (parseFloat(matchOdds.away) * 0.85).toFixed(2),
    homePlus05: (parseFloat(matchOdds.home) * 0.8).toFixed(2),
    awayMinus05: (parseFloat(matchOdds.away) * 1.2).toFixed(2)
  };

  const markets = [
    {
      id: "total-escanteios",
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
        { id: "esc-mais-105", label: "Mais de 10.5", value: cornerOdds[3].over, type: "over" },
        { id: "esc-menos-115", label: "Menos de 11.5", value: cornerOdds[4].under, type: "under" },
        { id: "esc-mais-115", label: "Mais de 11.5", value: cornerOdds[4].over, type: "over" }
      ]
    },
    {
      id: "escanteios-time",
      title: "Escanteios por Time",
      icon: Target,
      isTeamBased: true,
      teams: [
        {
          name: gameData.homeTeam,
          odds: [
            { id: "casa-menos-35", label: "Menos de 3.5", value: homeCornerOdds[0].under, type: "under" },
            { id: "casa-mais-35", label: "Mais de 3.5", value: homeCornerOdds[0].over, type: "over" },
            { id: "casa-menos-45", label: "Menos de 4.5", value: homeCornerOdds[1].under, type: "under" },
            { id: "casa-mais-45", label: "Mais de 4.5", value: homeCornerOdds[1].over, type: "over" },
            { id: "casa-menos-55", label: "Menos de 5.5", value: homeCornerOdds[2].under, type: "under" },
            { id: "casa-mais-55", label: "Mais de 5.5", value: homeCornerOdds[2].over, type: "over" }
          ]
        },
        {
          name: gameData.awayTeam,
          odds: [
            { id: "fora-menos-35", label: "Menos de 3.5", value: awayCornerOdds[0].under, type: "under" },
            { id: "fora-mais-35", label: "Mais de 3.5", value: awayCornerOdds[0].over, type: "over" },
            { id: "fora-menos-45", label: "Menos de 4.5", value: awayCornerOdds[1].under, type: "under" },
            { id: "fora-mais-45", label: "Mais de 4.5", value: awayCornerOdds[1].over, type: "over" },
            { id: "fora-menos-55", label: "Menos de 5.5", value: awayCornerOdds[2].under, type: "under" },
            { id: "fora-mais-55", label: "Mais de 5.5", value: awayCornerOdds[2].over, type: "over" }
          ]
        }
      ]
    },
    {
      id: "primeiro-escanteio",
      title: "Primeiro Escanteio",
      icon: Flag,
      odds: [
        { id: "primeiro-casa", label: gameData.homeTeam, value: firstCorner.home, type: "home" },
        { id: "primeiro-fora", label: gameData.awayTeam, value: firstCorner.away, type: "away" }
      ]
    },
    {
      id: "escanteios-tempo",
      title: "Escanteios por Tempo",
      icon: Clock,
      hasTimes: true,
      times: [
        {
          period: "1º Tempo",
          odds: [
            { id: "1t-menos-35", label: "Menos de 3.5", value: halfTimeCorners.firstHalf[0].under, type: "under" },
            { id: "1t-mais-35", label: "Mais de 3.5", value: halfTimeCorners.firstHalf[0].over, type: "over" },
            { id: "1t-menos-45", label: "Menos de 4.5", value: halfTimeCorners.firstHalf[1].under, type: "under" },
            { id: "1t-mais-45", label: "Mais de 4.5", value: halfTimeCorners.firstHalf[1].over, type: "over" }
          ]
        },
        {
          period: "2º Tempo",
          odds: [
            { id: "2t-menos-35", label: "Menos de 3.5", value: halfTimeCorners.secondHalf[0].under, type: "under" },
            { id: "2t-mais-35", label: "Mais de 3.5", value: halfTimeCorners.secondHalf[0].over, type: "over" },
            { id: "2t-menos-45", label: "Menos de 4.5", value: halfTimeCorners.secondHalf[1].under, type: "under" },
            { id: "2t-mais-45", label: "Mais de 4.5", value: halfTimeCorners.secondHalf[1].over, type: "over" }
          ]
        }
      ]
    },
    {
      id: "handicap-escanteios",
      title: "Handicap de Escanteios",
      icon: TrendingUp,
      odds: [
        { id: "casa-hcp-15", label: `${gameData.homeTeam} -1.5`, value: cornerHandicap.homeMinus15, type: "home-handicap" },
        { id: "fora-hcp-15", label: `${gameData.awayTeam} +1.5`, value: cornerHandicap.awayPlus15, type: "away-handicap" },
        { id: "casa-hcp-05", label: `${gameData.homeTeam} -0.5`, value: cornerHandicap.homeMinus05, type: "home-handicap" },
        { id: "fora-hcp-05", label: `${gameData.awayTeam} +0.5`, value: cornerHandicap.awayPlus05, type: "away-handicap" },
        { id: "casa-hcp+05", label: `${gameData.homeTeam} +0.5`, value: cornerHandicap.homePlus05, type: "home-handicap" },
        { id: "fora-hcp-05-2", label: `${gameData.awayTeam} -0.5`, value: cornerHandicap.awayMinus05, type: "away-handicap" }
      ]
    }
  ];

  const handleOddsClick = (market: any, odd: any, teamName?: string) => {
    const betSelection = {
      id: `${market.id}-${odd.id}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: teamName ? `${market.title} - ${teamName}` : market.title,
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

            {market.isTeamBased ? (
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
                market.odds.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
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

export default EscanteiosMarket;