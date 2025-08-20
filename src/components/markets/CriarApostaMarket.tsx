import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Target, Users, Flag, AlertTriangle, Plus, Minus, Calculator } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";

interface CriarApostaMarketProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
}

interface BetBuilderSelection {
  id: string;
  category: string;
  market: string;
  selection: string;
  odds: number;
}

const CriarApostaMarket = ({ gameData }: CriarApostaMarketProps) => {
  const { addSelection } = useBetSlipContext();
  const [builderSelections, setBuilderSelections] = useState<BetBuilderSelection[]>([]);

  const betBuilderCategories = [
    {
      id: "resultado",
      title: "Resultado",
      icon: Target,
      markets: [
        { id: "1x2", label: "Resultado Final", options: [
          { label: gameData.homeTeam, odds: 1.95, value: "home" },
          { label: "Empate", odds: 3.35, value: "draw" },
          { label: gameData.awayTeam, odds: 4.70, value: "away" }
        ]},
        { id: "dupla-chance", label: "Dupla Chance", options: [
          { label: `${gameData.homeTeam} ou Empate`, odds: 1.25, value: "home-draw" },
          { label: `${gameData.awayTeam} ou Empate`, odds: 2.15, value: "away-draw" },
          { label: `${gameData.homeTeam} ou ${gameData.awayTeam}`, odds: 1.35, value: "home-away" }
        ]}
      ]
    },
    {
      id: "gols",
      title: "Gols",
      icon: Zap,
      markets: [
        { id: "total-gols", label: "Total de Gols", options: [
          { label: "Menos de 2.5", odds: 1.85, value: "under-2.5" },
          { label: "Mais de 2.5", odds: 1.95, value: "over-2.5" },
          { label: "Menos de 3.5", odds: 1.25, value: "under-3.5" },
          { label: "Mais de 3.5", odds: 3.85, value: "over-3.5" }
        ]},
        { id: "ambas-marcam", label: "Ambas Marcam", options: [
          { label: "Sim", odds: 1.75, value: "yes" },
          { label: "Não", odds: 2.05, value: "no" }
        ]}
      ]
    },
    {
      id: "escanteios",
      title: "Escanteios",
      icon: Flag,
      markets: [
        { id: "total-escanteios", label: "Total de Escanteios", options: [
          { label: "Menos de 8.5", odds: 1.85, value: "under-8.5" },
          { label: "Mais de 8.5", odds: 1.95, value: "over-8.5" },
          { label: "Menos de 9.5", odds: 2.15, value: "under-9.5" },
          { label: "Mais de 9.5", odds: 1.75, value: "over-9.5" }
        ]}
      ]
    },
    {
      id: "cartoes",
      title: "Cartões",
      icon: AlertTriangle,
      markets: [
        { id: "total-cartoes", label: "Total de Cartões", options: [
          { label: "Menos de 3.5", odds: 1.45, value: "under-3.5" },
          { label: "Mais de 3.5", odds: 2.75, value: "over-3.5" },
          { label: "Menos de 4.5", odds: 1.15, value: "under-4.5" },
          { label: "Mais de 4.5", odds: 5.50, value: "over-4.5" }
        ]}
      ]
    }
  ];

  const handleSelectionToggle = (category: any, market: any, option: any) => {
    const selectionId = `${category.id}-${market.id}-${option.value}`;
    
    setBuilderSelections(prev => {
      const exists = prev.find(s => s.id === selectionId);
      
      if (exists) {
        // Remove selection
        return prev.filter(s => s.id !== selectionId);
      } else {
        // Add selection
        const newSelection: BetBuilderSelection = {
          id: selectionId,
          category: category.title,
          market: market.label,
          selection: option.label,
          odds: option.odds
        };
        return [...prev, newSelection];
      }
    });
  };

  const removeSelection = (selectionId: string) => {
    setBuilderSelections(prev => prev.filter(s => s.id !== selectionId));
  };

  const clearAllSelections = () => {
    setBuilderSelections([]);
  };

  const getTotalOdds = () => {
    return builderSelections.reduce((total, selection) => total * selection.odds, 1);
  };

  const handleCreateBet = () => {
    if (builderSelections.length === 0) return;

    const combinedBet = {
      id: `bet-builder-${Date.now()}`,
      homeTeam: gameData.homeTeam,
      awayTeam: gameData.awayTeam,
      league: gameData.league,
      market: "Bet Builder",
      selection: builderSelections.map(s => s.selection).join(" + "),
      odds: getTotalOdds()
    };

    addSelection(combinedBet);
    clearAllSelections();
  };

  const isSelectionActive = (category: any, market: any, option: any) => {
    const selectionId = `${category.id}-${market.id}-${option.value}`;
    return builderSelections.some(s => s.id === selectionId);
  };

  return (
    <div className="space-y-6">
      {/* Bet Builder Summary */}
      {builderSelections.length > 0 && (
        <Card className="p-4 bg-purple/5 border-purple/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-purple" />
              <h3 className="font-semibold text-purple">Sua Aposta Combinada</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllSelections}
              className="text-muted-foreground hover:text-danger"
            >
              Limpar Tudo
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            {builderSelections.map((selection) => (
              <div key={selection.id} className="flex items-center justify-between bg-neutral-light rounded p-2">
                <div className="flex-1">
                  <div className="text-sm font-medium">{selection.market}</div>
                  <div className="text-xs text-muted-foreground">{selection.selection}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-success">{selection.odds.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSelection(selection.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-danger"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Odds Total:</span>
            <span className="text-lg font-bold text-success">{getTotalOdds().toFixed(2)}</span>
          </div>

          <Button 
            onClick={handleCreateBet}
            className="w-full bg-purple hover:bg-purple/90 text-purple-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar ao Boletim
          </Button>
        </Card>
      )}

      {/* Bet Builder Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Construtor de Apostas</h2>
        <p className="text-muted-foreground">Combine múltiplos mercados em uma única aposta para aumentar suas odds.</p>

        {betBuilderCategories.map((category) => {
          const IconComponent = category.icon;
          
          return (
            <Card key={category.id} className="p-4 bg-neutral-card border-border/50">
              <div className="flex items-center space-x-2 mb-4">
                <IconComponent className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-card-foreground">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.markets.map((market) => (
                  <div key={market.id}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{market.label}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {market.options.map((option) => (
                        <Button
                          key={`${market.id}-${option.value}`}
                          variant="outline"
                          className={`
                            h-16 flex flex-col justify-center items-center transition-all duration-200
                            ${isSelectionActive(category, market, option)
                              ? 'bg-purple/20 border-purple text-purple font-semibold'
                              : 'bg-neutral-light text-card-foreground border-border/50 hover:border-purple/50 hover:bg-purple/10'
                            }
                          `}
                          onClick={() => handleSelectionToggle(category, market, option)}
                        >
                          <span className="text-xs mb-1 text-center leading-tight">
                            {option.label}
                          </span>
                          <span className="text-sm font-bold">
                            {option.odds.toFixed(2)}
                          </span>
                          {isSelectionActive(category, market, option) && (
                            <Plus className="h-3 w-3 mt-1" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-muted/50 border-border/50">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Calculator className="h-4 w-4 text-primary" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Como funciona o Bet Builder:</p>
            <ul className="space-y-1 text-xs">
              <li>• Selecione mercados de diferentes categorias</li>
              <li>• As odds se multiplicam automaticamente</li>
              <li>• Todos os mercados devem ser ganhos para a aposta ser vencedora</li>
              <li>• Odds mínimas podem ser aplicadas</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CriarApostaMarket;