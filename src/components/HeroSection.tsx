import { Button } from "@/components/ui/button";
import { Gift, Zap } from "lucide-react";
import heroImage from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background to-accent/30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img
            src={heroImage}
            alt="Jogador de futebol em ação - Gustabet"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40"></div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-primary-foreground mb-3 sm:mb-4">
              Bem-vindo à Gustabet
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              A casa de apostas que você confia
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button variant="bet" size="lg" className="shadow-bet text-sm sm:text-lg px-6 sm:px-8 py-2 sm:py-3">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Criar Conta
              </Button>
              <Button variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30 text-sm sm:text-lg px-6 sm:px-8 py-2 sm:py-3 backdrop-blur-sm">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Apostar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;