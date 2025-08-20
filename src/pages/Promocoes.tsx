import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Percent, Users, Clock, Star } from "lucide-react";

const Promocoes = () => {
  const promocoes = [
    {
      title: "Bônus de Boas-Vindas",
      description: "100% até R$ 500 no primeiro depósito",
      code: "WELCOME100",
      type: "Novo Cliente",
      validUntil: "2024-12-31",
      terms: "Depósito mínimo R$ 50"
    },
    {
      title: "Cashback Semanal",
      description: "10% de volta em apostas perdidas",
      code: "CASHBACK10",
      type: "Semanal",
      validUntil: "Toda semana",
      terms: "Máximo R$ 200 por semana"
    },
    {
      title: "Aposta Grátis Copa",
      description: "R$ 25 grátis para jogos da Copa",
      code: "COPA25",
      type: "Especial",
      validUntil: "2024-07-14",
      terms: "Apenas jogos da Copa América"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-gift/20 to-primary/20 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Gift className="h-8 w-8 text-gift" />
            <div>
              <h1 className="text-2xl font-bold">Promoções</h1>
              <p className="text-muted-foreground">Ofertas exclusivas para você</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {promocoes.map((promo, index) => (
            <Card key={index} className="p-6 border-l-4 border-l-gift">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-muted-foreground">{promo.description}</p>
                </div>
                <Badge className="bg-gift text-gift-foreground">{promo.type}</Badge>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Código:</span>
                  <div className="font-mono font-bold">{promo.code}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Válido até:</span>
                  <div className="font-semibold">{promo.validUntil}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Termos:</span>
                  <div className="text-xs">{promo.terms}</div>
                </div>
              </div>
              
              <Button className="bg-gift hover:bg-gift/90">Ativar Promoção</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Promocoes;