import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, Calendar, MapPin, Edit, Camera, Trophy, TrendingUp, Target } from "lucide-react";
import { useState } from "react";

const Perfil = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    birthDate: "1990-05-15",
    city: "São Paulo, SP",
    bio: "Apaixonado por futebol e apostas esportivas"
  });

  const stats = [
    { label: "Apostas Realizadas", value: "147", icon: Target },
    { label: "Apostas Vencedoras", value: "89", icon: Trophy },
    { label: "Taxa de Acerto", value: "60.5%", icon: TrendingUp },
  ];

  const preferences = [
    { id: "notifications", label: "Notificações por email", enabled: true },
    { id: "sms", label: "Notificações por SMS", enabled: false },
    { id: "promotions", label: "Receber promoções", enabled: true },
    { id: "newsletter", label: "Newsletter semanal", enabled: true },
  ];

  return (
    <div className="min-h-screen bg-background">      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Meu Perfil</h1>
              <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Informações Pessoais</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? "Cancelar" : "Editar"}
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{userInfo.name}</h3>
                  <Badge variant="secondary">Membro VIP</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    disabled={!editMode}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled={!editMode}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    disabled={!editMode}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={userInfo.birthDate}
                    disabled={!editMode}
                    onChange={(e) => setUserInfo({...userInfo, birthDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={userInfo.city}
                    disabled={!editMode}
                    onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                  />
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setEditMode(false)}>
                    Salvar Alterações
                  </Button>
                </div>
              )}
            </Card>

            {/* Preferences */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Preferências</h2>
              <div className="space-y-4">
                {preferences.map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between">
                    <Label htmlFor={pref.id}>{pref.label}</Label>
                    <Switch id={pref.id} checked={pref.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="font-semibold">{stat.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Verificar Telefone
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Histórico de Apostas
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;