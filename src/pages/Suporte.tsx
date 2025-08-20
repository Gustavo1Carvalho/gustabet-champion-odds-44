import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Search,
  FileText,
  Video,
  Download
} from "lucide-react";
import { useState } from "react";

const Suporte = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      question: "Como fazer uma aposta?",
      answer: "Para fazer uma aposta, selecione o evento desejado, escolha o mercado e clique na odd. A seleção será adicionada ao seu cupom de apostas.",
      category: "apostas"
    },
    {
      question: "Como depositar dinheiro na minha conta?",
      answer: "Acesse a seção Carteira e escolha um dos métodos de pagamento disponíveis. Os depósitos são processados instantaneamente.",
      category: "pagamentos"
    },
    {
      question: "Quanto tempo demora para sacar?",
      answer: "Os saques são processados em até 24 horas para métodos eletrônicos e até 5 dias úteis para transferências bancárias.",
      category: "pagamentos"
    },
    {
      question: "Como ativar notificações?",
      answer: "Vá em Configurações > Notificações e ative as opções desejadas. Você pode receber notificações por email, SMS ou push.",
      category: "conta"
    }
  ];

  const supportChannels = [
    {
      name: "Chat ao Vivo",
      description: "Suporte instantâneo 24/7",
      icon: MessageCircle,
      status: "online",
      responseTime: "< 2 min"
    },
    {
      name: "Email",
      description: "suporte@empresa.com",
      icon: Mail,
      status: "online",
      responseTime: "< 4 horas"
    },
    {
      name: "Telefone",
      description: "(11) 4000-0000",
      icon: Phone,
      status: "online",
      responseTime: "Imediato"
    }
  ];

  const tickets = [
    {
      id: "#12345",
      subject: "Problema com saque",
      status: "em-andamento",
      date: "25/01/2024",
      priority: "alta"
    },
    {
      id: "#12344",
      subject: "Dúvida sobre promoção",
      status: "resolvido",
      date: "24/01/2024",
      priority: "baixa"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-success text-success-foreground">Online</Badge>;
      case "em-andamento":
        return <Badge className="bg-warning text-warning-foreground">Em Andamento</Badge>;
      case "resolvido":
        return <Badge className="bg-success text-success-foreground">Resolvido</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "media":
        return <Badge className="bg-warning text-warning-foreground">Média</Badge>;
      case "baixa":
        return <Badge variant="secondary">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredFaq = faqItems.filter(item => 
    (selectedCategory === "" || item.category === selectedCategory) &&
    (searchQuery === "" || 
     item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <HelpCircle className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Suporte</h1>
              <p className="text-muted-foreground">Estamos aqui para ajudar você</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Support Channels */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Canais de Atendimento</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportChannels.map((channel, index) => {
                  const IconComponent = channel.icon;
                  return (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 rounded-full bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                        {getStatusBadge(channel.status)}
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{channel.responseTime}</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Contact Form */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Abrir Chamado</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apostas">Apostas</SelectItem>
                        <SelectItem value="pagamentos">Pagamentos</SelectItem>
                        <SelectItem value="conta">Conta</SelectItem>
                        <SelectItem value="tecnico">Problema Técnico</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Descreva brevemente o problema" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Descreva detalhadamente o seu problema ou dúvida..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Enviar Chamado
                </Button>
              </form>
            </Card>

            {/* FAQ */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Perguntas Frequentes</h2>
              
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar nas perguntas frequentes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    <SelectItem value="apostas">Apostas</SelectItem>
                    <SelectItem value="pagamentos">Pagamentos</SelectItem>
                    <SelectItem value="conta">Conta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredFaq.map((item, index) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Tickets */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Meus Chamados</h2>
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <p className="text-sm mb-2">{ticket.subject}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{ticket.date}</span>
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Todos os Chamados
              </Button>
            </Card>

            {/* Resources */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recursos</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentação
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Tutoriais em Vídeo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Manual do Usuário
                </Button>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>suporte@empresa.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>(11) 4000-0000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>24/7 - Todos os dias</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Suporte;