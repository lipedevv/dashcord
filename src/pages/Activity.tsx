import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Activity as ActivityIcon, 
  TrendingUp, 
  Clock, 
  Gamepad2,
  Music,
  Eye,
  Radio,
  Users,
  Calendar,
  Target
} from "lucide-react";

const Activity = () => {
  const activityData = [
    {
      type: "playing",
      name: "Minecraft",
      users: 42,
      icon: Gamepad2,
      color: "text-green-600",
      percentage: 68
    },
    {
      type: "listening", 
      name: "Spotify",
      users: 28,
      icon: Music,
      color: "text-green-500",
      percentage: 45
    },
    {
      type: "watching",
      name: "YouTube",
      users: 15,
      icon: Eye,
      color: "text-red-600", 
      percentage: 24
    },
    {
      type: "streaming",
      name: "Twitch",
      users: 8,
      icon: Radio,
      color: "text-purple-600",
      percentage: 13
    }
  ];

  const recentActivities = [
    {
      user: "João Silva",
      avatar: "/placeholder.svg",
      activity: "Jogando Minecraft",
      time: "2h 30m",
      status: "playing"
    },
    {
      user: "Maria Santos", 
      avatar: "/placeholder.svg",
      activity: "Ouvindo Lofi Hip Hop",
      time: "45m",
      status: "listening"
    },
    {
      user: "Pedro Costa",
      avatar: "/placeholder.svg", 
      activity: "Assistindo Tutorial",
      time: "1h 15m",
      status: "watching"
    },
    {
      user: "Ana Oliveira",
      avatar: "/placeholder.svg",
      activity: "Transmitindo Live",
      time: "3h 22m",
      status: "streaming"
    }
  ];

  const stats = [
    {
      title: "Usuários Ativos",
      value: "93",
      subtitle: "de 247 total",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Tempo Médio",
      value: "2h 15m",
      subtitle: "por sessão",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Atividades Hoje",
      value: "156",
      subtitle: "+23% vs ontem",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Pico de Hoje",
      value: "127",
      subtitle: "às 20:30",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "playing": return "🎮";
      case "listening": return "🎵";
      case "watching": return "👀";
      case "streaming": return "📺";
      default: return "💭";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-primary">
            <ActivityIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Atividade
            </h1>
            <p className="text-muted-foreground">Monitore as atividades dos usuários do servidor</p>
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
                    <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
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
          {/* Activity Types */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tipos de Atividade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activityData.map((activity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-secondary ${activity.color}`}>
                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.users} usuários
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {activity.percentage}%
                      </Badge>
                    </div>
                    <Progress value={activity.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {activity.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.user}</p>
                      <div className="flex items-center gap-2">
                        <span>{getActivityIcon(activity.status)}</span>
                        <p className="text-sm text-muted-foreground">{activity.activity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{activity.time}</p>
                      <Badge variant="outline" className="text-xs">
                        Ativo
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline de Atividades (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-secondary rounded-lg">
              <div className="text-center">
                <ActivityIcon className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Gráfico de timeline será exibido aqui</p>
                <p className="text-sm text-muted-foreground">Mostrando picos de atividade ao longo do dia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Activities */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Top Atividades da Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-secondary">
                <Gamepad2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-lg">Minecraft</p>
                <p className="text-sm text-muted-foreground">342 horas totais</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-secondary">
                <Music className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-bold text-lg">Spotify</p>
                <p className="text-sm text-muted-foreground">287 horas totais</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-secondary">
                <Eye className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="font-bold text-lg">YouTube</p>
                <p className="text-sm text-muted-foreground">156 horas totais</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-secondary">
                <Radio className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-bold text-lg">Twitch</p>
                <p className="text-sm text-muted-foreground">89 horas totais</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Activity;