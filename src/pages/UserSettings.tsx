import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AvatarEditor } from "@/components/AvatarEditor";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Camera,
  Save,
  LogOut
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const UserSettings = () => {
  const { toast } = useToast();
  const [userSettings, setUserSettings] = useState({
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: "/placeholder.svg",
    timezone: "America/Sao_Paulo",
    language: "pt-BR",
    theme: "system",
    notifications: {
      email: true,
      push: false,
      moderationAlerts: true,
      auditLogs: false,
    },
    privacy: {
      showOnline: true,
      allowDirectMessages: true,
      showActivity: false,
    }
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const handleAvatarSave = (dataUrl: string) => {
    setUserSettings({ ...userSettings, avatar: dataUrl });
    toast({
      title: "Avatar atualizado!",
      description: "Sua foto de perfil foi alterada com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-primary">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Configurações do Usuário
            </h1>
            <p className="text-muted-foreground">Gerencie suas preferências pessoais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <Card className="lg:col-span-2 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userSettings.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white text-xl">
                    {userSettings.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium">{userSettings.name}</h3>
                    <p className="text-sm text-muted-foreground">{userSettings.email}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Alterar Avatar
                      </Button>
                    </DialogTrigger>
                    <AvatarEditor 
                      isOpen={false}
                      onClose={() => {}}
                      onSave={handleAvatarSave}
                      imageUrl={userSettings.avatar}
                    />
                  </Dialog>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={userSettings.timezone}
                    onValueChange={(value) => setUserSettings({ ...userSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tóquio (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={userSettings.language}
                    onValueChange={(value) => setUserSettings({ ...userSettings, language: value })}
                  >
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
              </div>

              <Separator />

              {/* Theme */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-medium">
                  <Palette className="h-4 w-4" />
                  Aparência
                </h3>
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select
                    value={userSettings.theme}
                    onValueChange={(value) => setUserSettings({ ...userSettings, theme: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications & Privacy */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">Receber por email</p>
                  </div>
                  <Switch
                    checked={userSettings.notifications.email}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        notifications: { ...userSettings.notifications, email: checked }
                      })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push</p>
                    <p className="text-sm text-muted-foreground">Notificações push</p>
                  </div>
                  <Switch
                    checked={userSettings.notifications.push}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        notifications: { ...userSettings.notifications, push: checked }
                      })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de Moderação</p>
                    <p className="text-sm text-muted-foreground">Ações importantes</p>
                  </div>
                  <Switch
                    checked={userSettings.notifications.moderationAlerts}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        notifications: { ...userSettings.notifications, moderationAlerts: checked }
                      })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Logs de Auditoria</p>
                    <p className="text-sm text-muted-foreground">Logs detalhados</p>
                  </div>
                  <Switch
                    checked={userSettings.notifications.auditLogs}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        notifications: { ...userSettings.notifications, auditLogs: checked }
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar Online</p>
                    <p className="text-sm text-muted-foreground">Status de presença</p>
                  </div>
                  <Switch
                    checked={userSettings.privacy.showOnline}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        privacy: { ...userSettings.privacy, showOnline: checked }
                      })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mensagens Diretas</p>
                    <p className="text-sm text-muted-foreground">Permitir DMs</p>
                  </div>
                  <Switch
                    checked={userSettings.privacy.allowDirectMessages}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        privacy: { ...userSettings.privacy, allowDirectMessages: checked }
                      })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar Atividade</p>
                    <p className="text-sm text-muted-foreground">Atividade atual</p>
                  </div>
                  <Switch
                    checked={userSettings.privacy.showActivity}
                    onCheckedChange={(checked) =>
                      setUserSettings({
                        ...userSettings,
                        privacy: { ...userSettings.privacy, showActivity: checked }
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Status da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tipo de Conta</span>
                  <Badge>Premium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Membro desde</span>
                  <span className="text-sm text-muted-foreground">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Último login</span>
                  <span className="text-sm text-muted-foreground">Agora</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="destructive" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sair da Conta
          </Button>
          
          <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;