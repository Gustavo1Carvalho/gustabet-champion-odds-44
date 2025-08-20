import React, { createContext, useContext } from 'react';
import { useBetSlip } from '@/hooks/useBetSlip';

const BetSlipContext = createContext<ReturnType<typeof useBetSlip> | null>(null);

export const BetSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const betSlip = useBetSlip();
  
  return (
    <BetSlipContext.Provider value={betSlip}>
      {children}
    </BetSlipContext.Provider>
  );
};

export const useBetSlipContext = () => {
  const context = useContext(BetSlipContext);
  if (!context) {
    throw new Error('useBetSlipContext must be used within a BetSlipProvider');
  }
  return context;
};