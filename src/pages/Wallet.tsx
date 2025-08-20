import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/contexts/WalletContext';
import { DepositForm } from '@/components/DepositForm';
import { WithdrawalForm } from '@/components/WithdrawalForm';
import { TransactionHistory } from '@/components/TransactionHistory';
import { Wallet as WalletIcon, TrendingUp, TrendingDown, History, Eye, EyeOff } from 'lucide-react';

export default function Wallet() {
  const { balance, transactions } = useWallet();
  const [showBalance, setShowBalance] = useState(true);

  const completedDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'completed');
  const completedWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'completed');
  const pendingTransactions = transactions.filter(t => t.status === 'pending');

  const totalDeposits = completedDeposits.reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = completedWithdrawals.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Carteira Digital
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus depósitos e saques com segurança
          </p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WalletIcon className="w-6 h-6" />
                <CardTitle>Saldo Disponível</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {showBalance ? `R$ ${balance.toFixed(2)}` : 'R$ •••••'}
            </div>
            {pendingTransactions.length > 0 && (
              <p className="text-sm mt-2 text-primary-foreground/80">
                {pendingTransactions.length} transação(ões) pendente(s)
              </p>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <CardTitle className="text-lg">Total Depositado</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                R$ {totalDeposits.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                {completedDeposits.length} depósito(s) realizado(s)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-warning" />
                <CardTitle className="text-lg">Total Sacado</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                R$ {totalWithdrawals.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                {completedWithdrawals.length} saque(s) realizado(s)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="deposit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:mx-auto">
            <TabsTrigger value="deposit" className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Depósito
            </TabsTrigger>
            <TabsTrigger value="withdrawal" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Saque
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-6">
            <div className="max-w-md mx-auto">
              <DepositForm />
            </div>
          </TabsContent>

          <TabsContent value="withdrawal" className="space-y-6">
            <div className="max-w-md mx-auto">
              <WithdrawalForm />
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}