import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, TrendingUp } from "lucide-react";
import { useBetSlipContext } from "@/contexts/BetSlipContext";
import PrincipaisMarket from "./markets/PrincipaisMarket";
import MaisMenosMarket from "./markets/MaisMenosMarket";
import JogadoresMarket from "./markets/JogadoresMarket";
import GolsMarket from "./markets/GolsMarket";
import IntervaloMarket from "./markets/IntervaloMarket";
import EscanteiosMarket from "./markets/EscanteiosMarket";
import CartoesMarket from "./markets/CartoesMarket";
import HandicapMarket from "./markets/HandicapMarket";
import EstatisticasMarket from "./markets/EstatisticasMarket";
import CriarApostaMarket from "./markets/CriarApostaMarket";

interface MarketBlocksProps {
  gameData: {
    homeTeam: string;
    awayTeam: string;
    league: string;
  };
  activeTab: string;
}

const MarketBlocks = ({ gameData, activeTab }: MarketBlocksProps) => {
  const renderMarketContent = () => {
    switch (activeTab) {
      case "principais":
        return <PrincipaisMarket gameData={gameData} />;
      case "mais-menos":
        return <MaisMenosMarket gameData={gameData} />;
      case "jogadores":
        return <JogadoresMarket gameData={gameData} />;
      case "gols":
        return <GolsMarket gameData={gameData} />;
      case "intervalo":
        return <IntervaloMarket gameData={gameData} />;
      case "escanteios":
        return <EscanteiosMarket gameData={gameData} />;
      case "cartoes":
        return <CartoesMarket gameData={gameData} />;
      case "handicap":
        return <HandicapMarket gameData={gameData} />;
      case "estatisticas":
        return <EstatisticasMarket gameData={gameData} />;
      case "criar-aposta":
        return <CriarApostaMarket gameData={gameData} />;
      default:
        return <PrincipaisMarket gameData={gameData} />;
    }
  };

  return renderMarketContent();
};

export default MarketBlocks;