import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from '@/hooks/use-toast';
import { CreditCard, QrCode, Building2, Smartphone, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

const depositSchema = z.object({
  amount: z.number().min(10, 'Valor mínimo: R$ 10,00').max(10000, 'Valor máximo: R$ 10.000,00'),
  method: z.string().min(1, 'Selecione um método de pagamento'),
});

type DepositFormData = z.infer<typeof depositSchema>;

const paymentMethods = [
  { value: 'pix', label: 'PIX', icon: QrCode, description: 'Instantâneo' },
  { value: 'credit_card', label: 'Cartão de Crédito', icon: CreditCard, description: 'Aprovação em minutos' },
  { value: 'bank_transfer', label: 'Transferência Bancária', icon: Building2, description: '1-2 dias úteis' },
  { value: 'mobile_payment', label: 'Pagamento Digital', icon: Smartphone, description: 'Apple Pay, Google Pay' },
];

export const DepositForm: React.FC = () => {
  const { addTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [pixCopied, setPixCopied] = useState(false);
  
  const PIX_BASE_CODE = '00020126500014BR.GOV.BCB.PIX0128gustavo1carvalho23@gmail.com5204000053039865802BR5925Gustavo Kayck Carvalho No6009SAO PAULO62140510Q485JQNxPX6304E9AB';

  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 0,
      method: '',
    },
  });

  const watchedAmount = form.watch('amount');
  const watchedMethod = form.watch('method');

  // Generate QR code when PIX is selected and amount is entered
  useEffect(() => {
    if (watchedMethod === 'pix' && watchedAmount > 0) {
      const generateQRCode = async () => {
        try {
          // Use the exact PIX code provided - it's a static code
          const qrDataUrl = await QRCode.toDataURL(PIX_BASE_CODE, {
            errorCorrectionLevel: 'M',
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            width: 256
          });
          setQrCodeDataUrl(qrDataUrl);
        } catch (error) {
          console.error('Error generating QR code:', error);
          toast({
            title: 'Erro ao gerar QR Code',
            description: 'Tente novamente em alguns instantes.',
            variant: 'destructive',
          });
        }
      };
      generateQRCode();
    } else {
      setQrCodeDataUrl('');
    }
  }, [watchedAmount, watchedMethod]);

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(PIX_BASE_CODE);
      setPixCopied(true);
      toast({
        title: 'Código PIX copiado!',
        description: 'Cole no app do seu banco para fazer o pagamento.',
      });
      setTimeout(() => setPixCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o código PIX.',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: DepositFormData) => {
    setIsLoading(true);
    
    try {
      const selectedMethod = paymentMethods.find(m => m.value === data.method);
      
      addTransaction({
        type: 'deposit',
        amount: data.amount,
        method: selectedMethod?.label || data.method,
        status: 'pending',
        description: `Depósito via ${selectedMethod?.label}`,
      });

      toast({
        title: 'Depósito iniciado!',
        description: `Processando depósito de R$ ${data.amount.toFixed(2)} via ${selectedMethod?.label}`,
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Erro no depósito',
        description: 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Fazer Depósito</CardTitle>
        <CardDescription>
          Adicione fundos à sua conta de forma rápida e segura
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Depósito</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        R$
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        min="10"
                        max="10000"
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
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((method) => (
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

            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 200].map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => form.setValue('amount', amount)}
                >
                  R$ {amount}
                </Button>
              ))}
            </div>

            {/* PIX QR Code Section */}
            {watchedMethod === 'pix' && watchedAmount > 0 && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Escaneie o QR Code PIX</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ou copie e cole o código no seu app bancário
                  </p>
                </div>
                
                {qrCodeDataUrl && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <img src={qrCodeDataUrl} alt="QR Code PIX" className="w-48 h-48" />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary mb-2">
                        Informe o valor: R$ {watchedAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        Gustavo Kayck Carvalho No
                      </p>
                      <p className="text-xs text-muted-foreground">
                        gustavo1carvalho23@gmail.com
                      </p>
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={copyPixCode}
                      className="w-full"
                      disabled={pixCopied}
                    >
                      {pixCopied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-success" />
                          Código Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar Código PIX
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isLoading}
              variant="primary"
            >
              {isLoading ? 'Processando...' : 'Confirmar Depósito'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};