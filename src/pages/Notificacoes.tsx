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
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold">Notificações</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} notificações não lidas` : "Todas as notificações foram lidas"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                >
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Marcar todas como lidas</span>
                  <span className="sm:hidden">Marcar todas</span>
                </Button>
              )}
              <Button variant="outline" size="sm" className="p-2">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {notifications.length === 0 ? (
            <Card className="p-6 sm:p-8 text-center">
              <Bell className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Nenhuma notificação</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Você está em dia com todas as suas notificações!</p>
            </Card>
          ) : (
            notifications.map((notification) => {
              const IconComponent = notification.icon;
              
              return (
                <Card 
                  key={notification.id} 
                  className={`p-3 sm:p-4 transition-all duration-200 hover:shadow-md ${
                    !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className={`p-2 rounded-full bg-background border ${getIconColor(notification.color)} flex-shrink-0`}>
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-1 sm:gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 min-w-0">
                          <h3 className={`font-semibold text-sm sm:text-base truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge className={`${getBadgeColor(notification.color)} text-xs flex-shrink-0`}>
                              Novo
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-2">
                        {!notification.read && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-7 sm:h-8 text-xs sm:text-sm w-full sm:w-auto"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            <span className="sm:hidden">Marcar lida</span>
                            <span className="hidden sm:inline">Marcar como lida</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-7 sm:h-8 text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto"
                        >
                          <Trash2 className="h-3 w-3 mr-1 sm:mr-0" />
                          <span className="sm:hidden">Excluir</span>
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