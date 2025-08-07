import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  UserPlus, 
  Crown, 
  Shield, 
  Ban,
  MoreVertical,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Users = () => {
  const users = [
    {
      id: "1",
      username: "João Silva",
      discriminator: "1234",
      avatar: "/placeholder.svg",
      status: "online",
      role: "Admin",
      joinDate: "2024-01-15",
      messageCount: 1247,
      level: 25,
      warnings: 0
    },
    {
      id: "2", 
      username: "Maria Santos",
      discriminator: "5678",
      avatar: "/placeholder.svg",
      status: "idle",
      role: "Moderador",
      joinDate: "2024-02-20",
      messageCount: 856,
      level: 18,
      warnings: 1
    },
    {
      id: "3",
      username: "Pedro Costa",
      discriminator: "9012",
      avatar: "/placeholder.svg", 
      status: "dnd",
      role: "Membro",
      joinDate: "2024-03-10",
      messageCount: 342,
      level: 8,
      warnings: 0
    },
    {
      id: "4",
      username: "Ana Oliveira",
      discriminator: "3456",
      avatar: "/placeholder.svg",
      status: "offline",
      role: "VIP",
      joinDate: "2024-01-30",
      messageCount: 2156,
      level: 42,
      warnings: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "dnd": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Moderador": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "VIP": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin": return <Crown className="h-3 w-3" />;
      case "Moderador": return <Shield className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <UsersIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Usuários
              </h1>
              <p className="text-muted-foreground">Gerencie os membros do servidor</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <UserPlus className="h-4 w-4 mr-2" />
              Convidar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-elegant">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-sm text-muted-foreground">Total de Membros</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">342</p>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">127</p>
                <p className="text-sm text-muted-foreground">Novos (30d)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">23</p>
                <p className="text-sm text-muted-foreground">Banidos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-elegant">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar usuários..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="idle">Ausente</SelectItem>
                  <SelectItem value="dnd">Não Perturbar</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Cargos</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="mod">Moderador</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="member">Membro</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {user.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{user.username}#{user.discriminator}</span>
                        <Badge className={`${getRoleColor(user.role)} flex items-center gap-1`}>
                          {getRoleIcon(user.role)}
                          {user.role}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Entrou em {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center hidden sm:block">
                      <p className="text-sm font-medium">Level {user.level}</p>
                      <p className="text-xs text-muted-foreground">{user.messageCount} msgs</p>
                    </div>
                    
                    <div className="text-center hidden md:block">
                      <p className="text-sm font-medium text-red-600">{user.warnings}</p>
                      <p className="text-xs text-muted-foreground">avisos</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Mensagem</DropdownMenuItem>
                        <DropdownMenuItem>Editar Cargos</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Aplicar Warning</DropdownMenuItem>
                        <DropdownMenuItem>Timeout</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="h-4 w-4 mr-2" />
                          Banir Usuário
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Users;