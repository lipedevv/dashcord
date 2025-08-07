import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Hash,
  Users,
  Zap,
  Calendar,
  BarChart3
} from "lucide-react";

const Messages = () => {
  const recentMessages = [
    {
      id: "1",
      user: "João Silva",
      avatar: "/placeholder.svg",
      content: "Pessoal, alguém pode me ajudar com este erro?",
      channel: "#ajuda",
      timestamp: "2 min",
      reactions: 3
    },
    {
      id: "2", 
      user: "Maria Santos",
      avatar: "/placeholder.svg",
      content: "Boa noite galera! Como vocês estão?",
      channel: "#geral",
      timestamp: "5 min",
      reactions: 7
    },
    {
      id: "3",
      user: "Pedro Costa", 
      avatar: "/placeholder.svg",
      content: "Acabei de fazer deploy da nova versão!",
      channel: "#dev",
      timestamp: "12 min",
      reactions: 12
    },
    {
      id: "4",
      user: "Ana Oliveira",
      avatar: "/placeholder.svg", 
      content: "Parabéns pelo trabalho incrível!",
      channel: "#geral",
      timestamp: "15 min",
      reactions: 5
    }
  ];

  const topChannels = [
    { name: "#geral", messages: 2847, growth: "+12%" },
    { name: "#dev", messages: 1532, growth: "+8%" },
    { name: "#ajuda", messages: 892, growth: "+25%" },
    { name: "#random", messages: 654, growth: "-3%" },
    { name: "#anuncios", messages: 234, growth: "+45%" }
  ];

  const stats = [
    {
      title: "Mensagens Hoje",
      value: "1,234",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-600"
    },
    {
      title: "Canais Ativos", 
      value: "24",
      change: "+2",
      icon: Hash,
      color: "text-green-600"
    },
    {
      title: "Usuários Ativos",
      value: "567",
      change: "+8%", 
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Resposta",
      value: "87%",
      change: "+3%",
      icon: Zap,
      color: "text-orange-600"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-primary">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Mensagens
            </h1>
            <p className="text-muted-foreground">Monitore a atividade de mensagens do servidor</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} vs ontem
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-secondary ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Messages */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Mensagens Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {message.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.user}</span>
                          <Badge variant="secondary" className="text-xs">
                            {message.channel}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.content}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {message.reactions} reações
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Top Channels */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Canais Mais Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topChannels.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-secondary">
                        <Hash className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{channel.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {channel.messages} mensagens
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={channel.growth.startsWith('+') ? 'default' : 'destructive'}
                      className={channel.growth.startsWith('+') ? 'bg-green-100 text-green-800' : ''}
                    >
                      {channel.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Chart Placeholder */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Atividade de Mensagens (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-secondary rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de atividade será exibido aqui</p>
                <p className="text-sm text-muted-foreground">Dados em tempo real das últimas 24 horas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;