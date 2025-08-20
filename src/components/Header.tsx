import { Search, User, Bell, Menu, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileSidebar } from "@/components/MobileSidebar";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-primary shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isMobile && (
              <MobileSidebar 
                trigger={
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light p-1">
                    <Menu className="h-4 w-4" />
                  </Button>
                }
              />
            )}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-success rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm">
                G
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-primary-foreground">
                Gustabet
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar jogos, times..."
                className="pl-10 bg-background/10 border-primary-light text-primary-foreground placeholder:text-primary-foreground/70"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {!isMobile && (
              <>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light relative p-1 sm:p-2">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute -top-1 -right-1 bg-danger text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-danger-foreground text-[10px] sm:text-xs">
                    3
                  </span>
                </Button>
                <Button variant="warning" asChild className="px-2 sm:px-4 py-1 sm:py-2">
                  <Link to="/wallet">
                    <Wallet className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Carteira</span>
                  </Link>
                </Button>
                <Button variant="bet" className="px-2 sm:px-4 py-1 sm:py-2">
                  <User className="h-4 w-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">Entrar</span>
                </Button>
              </>
            )}
            {isMobile && (
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light p-1">
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;