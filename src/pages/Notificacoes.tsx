import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, Trash2, Gift, TrendingUp, AlertCircle, Settings } from "lucide-react";
import { useState } from "react";

const Notificacoes = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "bet",
      title: "Aposta Vencedora!",
      message: "Sua aposta em Flamengo vs Palmeiras foi vencedora. Ganhos: R$ 157,50",
      time: "2 min atrás",
      read: false,
      icon: TrendingUp,
      color: "success"
    },
    {
      id: 2,
      type: "promotion",
      title: "Nova Promoção Disponível",
      message: "Odds turbinadas para o clássico de hoje! Até 50% de bônus",
      time: "15 min atrás",
      read: false,
      icon: Gift,
      color: "warning"
    },
    {
      id: 3,
      type: "system",
      title: "Atualização do Sistema",
      message: "Nova funcionalidade de apostas ao vivo já disponível",
      time: "1 hora atrás",
      read: true,
      icon: AlertCircle,
      color: "primary"
    },
    {
      id: 4,
      type: "bet",
      title: "Aposta em Andamento",
      message: "Seu jogo Barcelona vs Real Madrid está começando em 30 minutos",
      time: "2 horas atrás",
      read: true,
      icon: Bell,
      color: "primary"
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconColor = (color: string) => {
    switch (color) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "primary": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "primary": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Notificações</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} notificações não lidas` : "Todas as notificações foram lidas"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Marcar todas como lidas</span>
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma notificação</h3>
              <p className="text-muted-foreground">Você está em dia com todas as suas notificações!</p>
            </Card>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon;
              
              return (
                <Card 
                  key={notification.id} 
                  className={`p-4 transition-all duration-200 hover:shadow-md ${
                    !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-background border ${getIconColor(notification.color)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge className={getBadgeColor(notification.color)}>
                              Novo
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Marcar como lida
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Notificacoes;