import { useState } from "react";
import { 
  Home, 
  Wallet, 
  User, 
  Bell, 
  Trophy, 
  TrendingUp,
  Calendar,
  Settings,
  HelpCircle
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const mainItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Ao Vivo", url: "/live", icon: Trophy },
  { title: "Próximos Jogos", url: "/upcoming", icon: Calendar },
  { title: "Promoções", url: "/promotions", icon: TrendingUp },
];

const accountItems = [
  { title: "Carteira", url: "/wallet", icon: Wallet },
  { title: "Perfil", url: "/profile", icon: User },
  { title: "Notificações", url: "/notifications", icon: Bell, badge: "3" },
];

const otherItems = [
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Suporte", url: "/support", icon: HelpCircle },
];

interface MobileSidebarProps {
  trigger: React.ReactNode;
}

export function MobileSidebar({ trigger }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-background">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center font-bold text-sm">
              G
            </div>
            <SheetTitle className="text-xl font-bold text-foreground">
              Gustabet
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Menu Principal</h3>
            <div className="space-y-1">
              {mainItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Conta</h3>
            <div className="space-y-1">
              {accountItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="bg-danger text-danger-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Outros</h3>
            <div className="space-y-1">
              {otherItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="pt-4">
            <Button variant="bet" className="w-full" onClick={handleNavClick}>
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Versão 1.0.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}