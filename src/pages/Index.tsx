import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LiveSection from "@/components/LiveSection";
import UpcomingGames from "@/components/UpcomingGames";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main>
        <HeroSection />
        <LiveSection />
        <UpcomingGames />
      </main>
    </div>
  );
};

export default Index;
