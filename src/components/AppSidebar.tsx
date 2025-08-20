import { useState } from "react";
import { 
  Home, 
  Wallet, 
  User, 
  Bell, 
  Search, 
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
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="bg-background border-r border-border z-50">
      <SidebarHeader className="p-4 border-b border-border bg-background">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center font-bold text-sm">
            G
          </div>
          {state !== "collapsed" && (
            <h1 className="text-xl font-bold text-foreground">
              Gustabet
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2 bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground font-medium">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) =>
                        `flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2 bg-border" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground font-medium">Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && (
                          <span className="ml-2">{item.title}</span>
                        )}
                      </div>
                      {item.badge && state !== "collapsed" && (
                        <Badge variant="destructive" className="ml-auto bg-danger text-danger-foreground">
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2 bg-border" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground font-medium">Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border bg-background">
        {state !== "collapsed" && (
          <div className="space-y-2">
            <Button variant="bet" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Versão 1.0.0
            </p>
          </div>
        )}
        {state === "collapsed" && (
          <Button variant="bet" size="icon">
            <User className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}