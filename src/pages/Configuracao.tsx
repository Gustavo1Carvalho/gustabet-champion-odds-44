import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Palette, Globe, User, CreditCard, Download } from "lucide-react";
import { useState } from "react";

const Configuracao = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    promotions: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareStats: false,
    dataCollection: true
  });

  const [preferences, setPreferences] = useState({
    language: "pt-BR",
    currency: "BRL",
    theme: "auto",
    timezone: "America/Sao_Paulo"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Configurações</h1>
              <p className="text-muted-foreground">Personalize sua experiência</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Conta</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input id="username" defaultValue="joaosilva123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Nome de Exibição</Label>
                    <Input id="display-name" defaultValue="João Silva" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Segurança</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full md:w-auto">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto ml-0 md:ml-2">
                      Configurar 2FA
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Notificações</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receba atualizações importantes por email</p>
                  </div>
                  <Switch 
                    id="email-notif" 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                  </div>
                  <Switch 
                    id="push-notif" 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notif">Notificações SMS</Label>
                    <p className="text-sm text-muted-foreground">Receba SMS para eventos importantes</p>
                  </div>
                  <Switch 
                    id="sms-notif" 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promo-notif">Promoções e Ofertas</Label>
                    <p className="text-sm text-muted-foreground">Receba informações sobre promoções</p>
                  </div>
                  <Switch 
                    id="promo-notif" 
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                  />
                </div>
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Privacidade</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visible">Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
                  </div>
                  <Switch 
                    id="profile-visible" 
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="share-stats">Compartilhar Estatísticas</Label>
                    <p className="text-sm text-muted-foreground">Compartilhar suas estatísticas de apostas</p>
                  </div>
                  <Switch 
                    id="share-stats" 
                    checked={privacy.shareStats}
                    onCheckedChange={(checked) => setPrivacy({...privacy, shareStats: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-collection">Coleta de Dados</Label>
                    <p className="text-sm text-muted-foreground">Permitir coleta de dados para melhorar o serviço</p>
                  </div>
                  <Switch 
                    id="data-collection" 
                    checked={privacy.dataCollection}
                    onCheckedChange={(checked) => setPrivacy({...privacy, dataCollection: checked})}
                  />
                </div>
              </div>
            </Card>

            {/* Appearance Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Aparência</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={preferences.currency} onValueChange={(value) => setPreferences({...preferences, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real (R$)</SelectItem>
                        <SelectItem value="USD">Dólar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Métodos de Pagamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Região e Fuso Horário
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Suporte</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Documentação
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contatar Suporte
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Relatório de Bug
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-destructive">Zona de Perigo</h2>
              <div className="space-y-2">
                <Button variant="destructive" className="w-full">
                  Excluir Conta
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Esta ação não pode ser desfeita
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar Configurações</Button>
        </div>
      </main>
    </div>
  );
};

export default Configuracao;