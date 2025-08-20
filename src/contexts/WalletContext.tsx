import React, { createContext, useContext, useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('wallet_balance');
    const savedTransactions = localStorage.getItem('wallet_transactions');
    
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save to localStorage whenever balance or transactions change
  useEffect(() => {
    localStorage.setItem('wallet_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Simulate transaction processing
    setTimeout(() => {
      updateTransactionStatus(newTransaction.id, 'completed');
    }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
  };

  const updateTransactionStatus = (id: string, status: Transaction['status']) => {
    setTransactions(prev => 
      prev.map(transaction => {
        if (transaction.id === id) {
          const updatedTransaction = { ...transaction, status };
          
          // Update balance when transaction is completed
          if (status === 'completed' && transaction.status === 'pending') {
            if (updatedTransaction.type === 'deposit') {
              setBalance(prevBalance => prevBalance + updatedTransaction.amount);
            } else if (updatedTransaction.type === 'withdrawal') {
              setBalance(prevBalance => prevBalance - updatedTransaction.amount);
            }
          }
          
          return updatedTransaction;
        }
        return transaction;
      })
    );
  };

  return (
    <WalletContext.Provider 
      value={{ 
        balance, 
        transactions, 
        addTransaction, 
        updateTransactionStatus 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};