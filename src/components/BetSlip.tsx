import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import { X, ShoppingCart, Trash2, DollarSign, ChevronDown, Calculator, Target } from "lucide-react";

const BetSlip = () => {
  const { 
    selections, 
    isOpen, 
    setIsOpen, 
    removeSelection, 
    updateStake, 
    clearAll,
    getTotalOdds,
    getTotalStake,
    getPotentialReturn,
    selectionCount 
  } = useBetSlipContext();

  if (!isOpen) {
    // Only show the floating button if there are selections
    if (selectionCount === 0) {
      return null;
    }
    
    return (
      <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-success text-success-foreground shadow-bet hover:scale-105 hover:shadow-elevated transition-all duration-300 rounded-full w-12 h-12 sm:w-16 sm:h-16 relative group"
          size="icon"
        >
          <ShoppingCart className="h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-110 transition-transform" />
          <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-danger text-danger-foreground w-5 h-5 sm:w-7 sm:h-7 rounded-full p-0 flex items-center justify-center text-xs sm:text-sm font-bold animate-pulse">
            {selectionCount}
          </Badge>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-2 left-2 right-2 sm:bottom-6 sm:right-6 sm:left-auto z-50 w-auto sm:w-80 max-h-[75vh] overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-300">
      <Card className="bg-card shadow-elevated border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-primary text-primary-foreground">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-primary-foreground/20 rounded-full p-1.5 sm:p-2">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Carrinho de Apostas</h3>
              <p className="text-[10px] sm:text-xs text-primary-foreground/80">
                {selectionCount} {selectionCount === 1 ? 'seleção' : 'seleções'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs">
              <Calculator className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
              {getTotalOdds().toFixed(2)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto scrollbar-hide">
          {selectionCount === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="bg-muted rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
              <p className="text-card-foreground font-medium mb-2 text-sm sm:text-base">Seu carrinho está vazio</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Clique em uma odd para adicionar apostas ao carrinho
              </p>
            </div>
          ) : (
            <>
              {/* Selections */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {selections.map((selection, index) => (
                  <div key={selection.id} className="border-b border-border pb-2 sm:pb-3 last:border-b-0 animate-in fade-in duration-200" style={{animationDelay: `${index * 50}ms`}}>
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-card-foreground text-xs sm:text-sm truncate">
                          {selection.homeTeam} vs {selection.awayTeam}
                        </p>
                        <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                          {selection.market} • {selection.selection}
                        </p>
                        <Badge variant="outline" className="mt-1 sm:mt-2 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5">
                          {selection.league}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <div className="text-right">
                          <span className="font-bold text-base sm:text-lg text-success">
                            {selection.odds.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSelection(selection.id)}
                          className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bet Amount */}
              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-muted/30 border-y border-border">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="font-semibold text-card-foreground text-xs sm:text-sm flex items-center">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-success" />
                    Valor da Aposta
                  </h4>
                  <Badge variant="outline" className="text-[10px] sm:text-xs px-1 sm:px-2">
                    Múltipla
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground font-medium text-sm">R$</span>
                  <Input
                    type="number"
                    value={getTotalStake() || ''}
                    onChange={(e) => {
                      const totalValue = Number(e.target.value);
                      const perBet = totalValue / selectionCount;
                      selections.forEach(selection => {
                        updateStake(selection.id, perBet);
                      });
                    }}
                    className="flex-1 bg-background border-input text-xs sm:text-sm font-medium h-8 sm:h-10"
                    placeholder="0,00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="p-3 sm:p-4 bg-accent/50 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs sm:text-sm font-medium">Odd Total:</span>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20 text-xs">
                    {getTotalOdds().toFixed(2)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center pt-1 sm:pt-2 border-t border-border">
                  <span className="text-card-foreground font-semibold text-sm">Possível Retorno:</span>
                  <span className="font-bold text-lg sm:text-xl text-success">
                    R$ {getPotentialReturn().toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="p-3 sm:p-4 bg-background/50 space-y-2 sm:space-y-3 border-t border-border">
                <Button 
                  className="w-full bg-gradient-success text-success-foreground font-semibold py-2 sm:py-3 text-xs sm:text-sm shadow-bet hover:shadow-elevated transition-all duration-200 hover:scale-[1.02]"
                  disabled={getTotalStake() === 0}
                >
                  <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Finalizar Aposta
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="flex-1 hover:bg-danger/10 hover:text-danger hover:border-danger transition-colors text-xs py-1 sm:py-2"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Limpar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 hover:bg-muted transition-colors text-xs py-1 sm:py-2"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BetSlip;