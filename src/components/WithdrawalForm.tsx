import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';
import { QrCode, Building2, CreditCard } from 'lucide-react';

const withdrawalSchema = z.object({
  amount: z.number().min(20, 'Valor mínimo: R$ 20,00'),
  method: z.string().min(1, 'Selecione um método de saque'),
  accountInfo: z.string().min(1, 'Informe os dados da conta'),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

const withdrawalMethods = [
  { value: 'pix', label: 'PIX', icon: QrCode, description: 'Chave PIX (CPF, e-mail, telefone)' },
  { value: 'bank_transfer', label: 'Transferência Bancária', icon: Building2, description: 'Conta bancária' },
  { value: 'debit_card', label: 'Cartão de Débito', icon: CreditCard, description: 'Cartão cadastrado' },
];

export const WithdrawalForm: React.FC = () => {
  const { balance, addTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema.refine(
      (data) => data.amount <= balance,
      {
        message: 'Saldo insuficiente',
        path: ['amount'],
      }
    )),
    defaultValues: {
      amount: 0,
      method: '',
      accountInfo: '',
    },
  });

  const onSubmit = async (data: WithdrawalFormData) => {
    if (data.amount > balance) {
      toast({
        title: 'Saldo insuficiente',
        description: 'O valor do saque não pode ser maior que o saldo disponível.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const selectedMethod = withdrawalMethods.find(m => m.value === data.method);
      
      addTransaction({
        type: 'withdrawal',
        amount: data.amount,
        method: selectedMethod?.label || data.method,
        status: 'pending',
        description: `Saque via ${selectedMethod?.label} - ${data.accountInfo.substring(0, 10)}...`,
      });

      toast({
        title: 'Saque solicitado!',
        description: `Processando saque de R$ ${data.amount.toFixed(2)}. O valor será creditado em até 2 dias úteis.`,
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Erro no saque',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedMethod = withdrawalMethods.find(m => m.value === form.watch('method'));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Solicitar Saque</CardTitle>
        <CardDescription>
          Retire seus fundos de forma segura
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground">Saldo disponível</div>
          <div className="text-2xl font-bold text-primary">
            R$ {balance.toFixed(2)}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Saque</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        min="20"
                        max={balance}
                        placeholder="0,00"
                        className="pl-10"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Saque</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de saque" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {withdrawalMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          <div className="flex items-center gap-2">
                            <method.icon className="w-4 h-4" />
                            <div>
                              <div className="font-medium">{method.label}</div>
                              <div className="text-xs text-muted-foreground">{method.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedMethod && (
              <FormField
                control={form.control}
                name="accountInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{selectedMethod.description}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          selectedMethod.value === 'pix' 
                            ? 'Digite sua chave PIX' 
                            : selectedMethod.value === 'bank_transfer'
                            ? 'Banco, Agência, Conta'
                            : 'Número do cartão'
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isLoading || balance < 20}
              variant="warning"
            >
              {isLoading ? 'Processando...' : 'Confirmar Saque'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};