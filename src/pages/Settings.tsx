import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Palette, 
  Database,
  Key,
  Globe,
  Trash2,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Todas as alterações foram aplicadas com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <SettingsIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Configurações
              </h1>
              <p className="text-muted-foreground">Gerencie as configurações do seu bot</p>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Tudo
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bot Configuration */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações do Bot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Token do Bot</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="••••••••••••••••••••••••"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Mantenha seu token seguro e nunca o compartilhe
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prefix">Prefixo de Comandos</Label>
                <Input
                  id="prefix"
                  defaultValue="!"
                  placeholder="!"
                  className="w-20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Reconnect</Label>
                  <p className="text-sm text-muted-foreground">
                    Reconectar automaticamente se desconectado
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Desenvolvedor</Label>
                  <p className="text-sm text-muted-foreground">
                    Exibir logs detalhados
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

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
                <div className="space-y-0.5">
                  <Label>Erros de Comando</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar sobre comandos que falharam
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Membros</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando alguém entrar no servidor
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações do Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar sobre atualizações disponíveis
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="webhook">Webhook de Logs</Label>
                <Input
                  id="webhook"
                  placeholder="https://discord.com/api/webhooks/..."
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Database */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Banco de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status da Conexão</Label>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">Conectado</span>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL de Conexão</Label>
                <Input
                  type="password"
                  placeholder="mongodb://..."
                  className="font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm">Coleções</Label>
                  <p className="text-lg font-bold text-primary">12</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Documentos</Label>
                  <p className="text-lg font-bold text-primary">1,847</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Testar Conexão
              </Button>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">
                    Limitar uso de comandos por usuário
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cooldown">Cooldown Global (segundos)</Label>
                <Input
                  id="cooldown"
                  type="number"
                  defaultValue="3"
                  min="1"
                  max="60"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anti-Spam</Label>
                  <p className="text-sm text-muted-foreground">
                    Detectar e prevenir spam
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Whitelist de Servidores</Label>
                  <p className="text-sm text-muted-foreground">
                    Apenas servidores aprovados
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="border-destructive shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Zona de Perigo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-destructive">Reset do Bot</Label>
              <p className="text-sm text-muted-foreground">
                Isso irá resetar todas as configurações para os valores padrão.
                Esta ação não pode ser desfeita.
              </p>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="h-4 w-4 mr-2" />
                Resetar Configurações
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;