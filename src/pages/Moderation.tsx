import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Ban, 
  AlertTriangle, 
  Clock, 
  Users, 
  MessageSquareWarning,
  Filter,
  Plus,
  Search,
  Trash2,
  Eye,
  Server,
  User,
  Gavel,
  MessageCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Moderation = () => {
  const { toast } = useToast();
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const servers = [
    { id: "1", name: "Servidor Principal", members: 1520, icon: "/placeholder.svg" },
    { id: "2", name: "Servidor Beta", members: 324, icon: "/placeholder.svg" },
    { id: "3", name: "Comunidade VIP", members: 89, icon: "/placeholder.svg" }
  ];

  const serverUsers = [
    { id: "1", name: "Pedro Costa", username: "pedro#1234", avatar: "/placeholder.svg", status: "online", roles: ["Membro", "Ativo"] },
    { id: "2", name: "Ana Oliveira", username: "ana#5678", avatar: "/placeholder.svg", status: "idle", roles: ["Moderador"] },
    { id: "3", name: "Carlos Lima", username: "carlos#9999", avatar: "/placeholder.svg", status: "offline", roles: ["Banido"] },
    { id: "4", name: "Maria Santos", username: "maria#1111", avatar: "/placeholder.svg", status: "online", roles: ["Admin"] }
  ];

  const moderationActions = [
    {
      id: "1",
      type: "warning",
      user: "Pedro Costa",
      avatar: "/placeholder.svg",
      reason: "Linguagem inadequada",
      moderator: "Maria Santos",
      timestamp: "2024-01-20 14:30",
      status: "active"
    },
    {
      id: "2",
      type: "timeout",
      user: "Ana Oliveira", 
      avatar: "/placeholder.svg",
      reason: "Spam repetitivo",
      moderator: "João Silva",
      timestamp: "2024-01-20 13:15",
      status: "active",
      duration: "24h"
    },
    {
      id: "3",
      type: "ban",
      user: "Carlos Lima",
      avatar: "/placeholder.svg", 
      reason: "Comportamento tóxico",
      moderator: "Maria Santos",
      timestamp: "2024-01-19 16:45",
      status: "permanent"
    }
  ];

  const autoModRules = [
    {
      id: "1",
      name: "Anti-Spam",
      description: "Detecta e remove mensagens repetitivas",
      enabled: true,
      triggers: 12,
      actions: "timeout"
    },
    {
      id: "2", 
      name: "Filtro de Palavrões",
      description: "Remove mensagens com linguagem inadequada",
      enabled: true,
      triggers: 8,
      actions: "delete + warning"
    },
    {
      id: "3",
      name: "Anti-Raid",
      description: "Protege contra ataques de raid",
      enabled: true,
      triggers: 2,
      actions: "ban"
    },
    {
      id: "4",
      name: "Links Suspeitos",
      description: "Bloqueia links potencialmente perigosos", 
      enabled: false,
      triggers: 0,
      actions: "delete"
    }
  ];

  const stats = [
    {
      title: "Ações Hoje",
      value: "23",
      subtitle: "+5% vs ontem",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Usuários Banidos",
      value: "12",
      subtitle: "última semana",
      icon: Ban,
      color: "text-red-600"
    },
    {
      title: "Warnings Ativos",
      value: "34",
      subtitle: "necessitam atenção",
      icon: AlertTriangle,
      color: "text-yellow-600"
    },
    {
      title: "Auto-Mod Ativo",
      value: "4/5",
      subtitle: "regras habilitadas",
      icon: MessageSquareWarning,
      color: "text-green-600"
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "timeout": return <Clock className="h-4 w-4" />;
      case "ban": return <Ban className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case "warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "timeout": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "ban": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} aplicado!`,
      description: "A ação de moderação foi executada com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Moderação
              </h1>
              <p className="text-muted-foreground">Gerencie a moderação do servidor</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Gavel className="h-4 w-4 mr-2" />
                Punir Membro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Aplicar Punição</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Server Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Servidor
                  </Label>
                  <Select value={selectedServer} onValueChange={setSelectedServer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um servidor" />
                    </SelectTrigger>
                    <SelectContent>
                      {servers.map((server) => (
                        <SelectItem key={server.id} value={server.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={server.icon} />
                              <AvatarFallback>{server.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{server.name}</span>
                            <Badge variant="secondary">{server.members} membros</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* User Selection */}
                {selectedServer && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Usuário
                    </Label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        {serverUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.username}</p>
                              </div>
                              <div className="flex gap-1">
                                {user.roles.map((role) => (
                                  <Badge key={role} variant="outline" className="text-xs">
                                    {role}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Action Selection */}
                {selectedUser && (
                  <>
                    <div className="space-y-2">
                      <Label>Tipo de Punição</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-16 flex-col gap-1">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm">Warning</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex-col gap-1">
                          <MessageCircle className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">Mute</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex-col gap-1">
                          <Clock className="h-5 w-5 text-orange-500" />
                          <span className="text-sm">Timeout</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex-col gap-1">
                          <Ban className="h-5 w-5 text-red-500" />
                          <span className="text-sm">Ban</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Duração</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a duração" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1 hora</SelectItem>
                          <SelectItem value="6h">6 horas</SelectItem>
                          <SelectItem value="24h">24 horas</SelectItem>
                          <SelectItem value="7d">7 dias</SelectItem>
                          <SelectItem value="30d">30 dias</SelectItem>
                          <SelectItem value="permanent">Permanente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Motivo</Label>
                      <Textarea placeholder="Descreva o motivo da punição..." />
                    </div>

                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      <Gavel className="h-4 w-4 mr-2" />
                      Aplicar Punição
                    </Button>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
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
          {/* Recent Actions */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Ações Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moderationActions.map((action) => (
                  <div key={action.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={action.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {action.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{action.user}</span>
                        <Badge className={`${getActionColor(action.type)} flex items-center gap-1`}>
                          {getActionIcon(action.type)}
                          {action.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{action.reason}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          por {action.moderator}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(action.timestamp).toLocaleString('pt-BR')}
                        </span>
                        {action.duration && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{action.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Auto-Mod Rules */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareWarning className="h-5 w-5" />
                Regras de Auto-Moderação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autoModRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{rule.name}</span>
                        <Badge variant={rule.enabled ? "default" : "secondary"}>
                          {rule.enabled ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{rule.triggers} triggers hoje</span>
                        <span>Ação: {rule.actions}</span>
                      </div>
                    </div>
                    <Switch checked={rule.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleQuickAction("Lockdown do servidor")}
                className="h-20 flex-col gap-2"
              >
                <Shield className="h-6 w-6" />
                Lockdown
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleQuickAction("Limpeza de mensagens")}
                className="h-20 flex-col gap-2"
              >
                <Trash2 className="h-6 w-6" />
                Limpar Chat
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleQuickAction("Modo slow")}
                className="h-20 flex-col gap-2"
              >
                <Clock className="h-6 w-6" />
                Modo Slow
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleQuickAction("Verificação de raid")}
                className="h-20 flex-col gap-2"
              >
                <AlertTriangle className="h-6 w-6" />
                Anti-Raid
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Moderation;