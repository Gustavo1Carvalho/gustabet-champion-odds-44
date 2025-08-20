import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BetSlipProvider } from "@/contexts/BetSlipContext";
import { WalletProvider } from "@/contexts/WalletContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GameDetails from "./pages/GameDetails";
import Wallet from "./pages/Wallet";
import Live from "./pages/Live";
import Futebol from "./pages/Futebol";
import Basquete from "./pages/Basquete";
import ESports from "./pages/ESports";
import Eventos from "./pages/Eventos";
import Promocoes from "./pages/Promocoes";
import Populares from "./pages/Populares";
import Notificacoes from "./pages/Notificacoes";
import Perfil from "./pages/Perfil";
import ProximosJogos from "./pages/ProximosJogos";
import Configuracao from "./pages/Configuracao";
import Suporte from "./pages/Suporte";
import BetSlip from "@/components/BetSlip";
import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BetSlipProvider>
        <WalletProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex w-full">
                <main className="flex-1 min-w-0">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/game/:gameId" element={<GameDetails />} />
                      <Route path="/live" element={<Live />} />
                      <Route path="/futebol" element={<Futebol />} />
                      <Route path="/basquete" element={<Basquete />} />
                      <Route path="/esports" element={<ESports />} />
                      <Route path="/eventos" element={<Eventos />} />
                      <Route path="/promocoes" element={<Promocoes />} />
                      <Route path="/promotions" element={<Promocoes />} />
                      <Route path="/populares" element={<Populares />} />
                      <Route path="/notificacoes" element={<Notificacoes />} />
                      <Route path="/notifications" element={<Notificacoes />} />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route path="/profile" element={<Perfil />} />
                      <Route path="/proximos-jogos" element={<ProximosJogos />} />
                      <Route path="/upcoming" element={<ProximosJogos />} />
                      <Route path="/configuracao" element={<Configuracao />} />
                      <Route path="/settings" element={<Configuracao />} />
                      <Route path="/suporte" element={<Suporte />} />
                      <Route path="/support" element={<Suporte />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
              </div>
            </BrowserRouter>
            <BetSlip />
          </TooltipProvider>
        </WalletProvider>
      </BetSlipProvider>
    </QueryClientProvider>
  );
};

export default App;
