import { useState, useCallback } from 'react';
import { toast } from "sonner";

export interface BetSelection {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  market: string;
  selection: string;
  odds: number;
  stake?: number;
}

export const useBetSlip = () => {
  const [selections, setSelections] = useState<BetSelection[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addSelection = useCallback((selection: BetSelection) => {
    setSelections(prev => {
      // Check if selection already exists
      const exists = prev.find(s => s.id === selection.id);
      if (exists) {
        return prev;
      }
      
      setIsOpen(true);
      return [...prev, { ...selection, stake: 10 }];
    });
  }, []);

  const removeSelection = useCallback((id: string) => {
    setSelections(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateStake = useCallback((id: string, stake: number) => {
    setSelections(prev => 
      prev.map(s => s.id === id ? { ...s, stake } : s)
    );
  }, []);

  const clearAll = useCallback(() => {
    setSelections([]);
  }, []);

  const getTotalOdds = useCallback(() => {
    return selections.reduce((total, selection) => total * selection.odds, 1);
  }, [selections]);

  const getTotalStake = useCallback(() => {
    return selections.reduce((total, selection) => total + (selection.stake || 0), 0);
  }, [selections]);

  const getPotentialReturn = useCallback(() => {
    const totalStake = getTotalStake();
    const totalOdds = getTotalOdds();
    return totalStake * totalOdds;
  }, [getTotalStake, getTotalOdds]);

  return {
    selections,
    isOpen,
    setIsOpen,
    addSelection,
    removeSelection,
    updateStake,
    clearAll,
    getTotalOdds,
    getTotalStake,
    getPotentialReturn,
    selectionCount: selections.length
  };
};