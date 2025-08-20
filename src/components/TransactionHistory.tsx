import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowUpCircle, ArrowDownCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-danger" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-warning border-warning">Pendente</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-success border-success">Concluído</Badge>;
      case 'failed':
        return <Badge variant="outline" className="text-danger border-danger">Falhou</Badge>;
      default:
        return null;
    }
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <ArrowUpCircle className="w-8 h-8" />
            </div>
            <p>Nenhuma transação encontrada</p>
            <p className="text-sm">Suas transações aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'deposit' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {transaction.type === 'deposit' ? (
                    <ArrowDownCircle className="w-5 h-5" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5" />
                  )}
                </div>
                
                <div>
                  <div className="font-medium">
                    {transaction.type === 'deposit' ? 'Depósito' : 'Saque'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.method} • {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </div>
                  {transaction.description && (
                    <div className="text-xs text-muted-foreground">
                      {transaction.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <div className={`font-bold ${
                  transaction.type === 'deposit' 
                    ? 'text-success' 
                    : 'text-warning'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusIcon(transaction.status)}
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};