import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarketTabsProps {
  onTabChange?: (tab: string) => void;
}

const MarketTabs = ({ onTabChange }: MarketTabsProps) => {
  const [activeTab, setActiveTab] = useState("principais");

  const markets = [
    { id: "principais", label: "Principais" },
    { id: "mais-menos", label: "Mais/Menos" },
    { id: "jogadores", label: "Jogadores" },
    { id: "gols", label: "Gols" },
    { id: "intervalo", label: "Intervalo" },
    { id: "escanteios", label: "Escanteios" },
    { id: "cartoes", label: "Cartões" },
    { id: "handicap", label: "Handicap" },
    { id: "estatisticas", label: "Estatísticas" },
    { id: "criar-aposta", label: "Criar Aposta" }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <div className="flex space-x-1 sm:space-x-2 pb-2">
          {markets.map((market) => (
            <Button
              key={market.id}
              variant={activeTab === market.id ? "default" : "outline"}
              size="sm"
              className={`
                whitespace-nowrap transition-all duration-200 text-xs sm:text-sm px-2 sm:px-4
                ${activeTab === market.id 
                  ? "bg-primary text-primary-foreground shadow-card" 
                  : "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground border-border/50"
                }
              `}
              onClick={() => handleTabChange(market.id)}
            >
              {market.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MarketTabs;