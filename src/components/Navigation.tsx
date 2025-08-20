import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  Trophy, 
  Zap, 
  TrendingUp, 
  Star, 
  Gamepad2,
  Target,
  Calendar,
  Gift
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { label: "Destaques", icon: Star, path: "/" },
    { label: "Ao Vivo", icon: Zap, path: "/live" },
    { label: "Futebol", icon: Trophy, path: "/futebol" },
    { label: "Basquete", icon: Target, path: "/basquete" },
    { label: "eSports", icon: Gamepad2, path: "/esports" },
    { label: "Eventos", icon: Calendar, path: "/eventos" },
    { label: "Promoções", icon: Gift, path: "/promocoes" },
    { label: "Populares", icon: TrendingUp, path: "/populares" },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-12 sm:top-16 z-40">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center space-x-1 overflow-x-auto py-2 sm:py-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                variant={isActive ? "primary" : "ghost"}
                size="sm"
                asChild
                className={`shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${
                  isActive 
                    ? "bg-gradient-primary text-primary-foreground shadow-bet" 
                    : "text-muted-foreground hover:text-primary hover:bg-accent"
                }`}
              >
                <Link to={item.path}>
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;