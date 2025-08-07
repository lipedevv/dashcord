import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Camera, Save, Settings, Activity, Users, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AvatarEditor } from "./AvatarEditor";

interface BotConfig {
  name: string;
  description: string;
  avatar: string;
  status: "online" | "idle" | "dnd" | "invisible";
  activity: {
    type: "playing" | "listening" | "watching" | "streaming";
    name: string;
  };
}

export function BotDashboard() {
  const { toast } = useToast();
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");
  const [botConfig, setBotConfig] = useState<BotConfig>({
    name: "MeuBot",
    description: "Um bot Discord incrível",
    avatar: "/placeholder.svg",
    status: "online",
    activity: {
      type: "playing",
      name: "Discord Bot Dashboard"
    }
  });

  const [stats] = useState({
    servers: 42,
    users: 15847,
    commands: 2134
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As configurações do bot foram atualizadas com sucesso.",
    });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setTempAvatarUrl(imageUrl);
        setIsAvatarEditorOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSave = (imageData: string) => {
    setBotConfig(prev => ({
      ...prev,
      avatar: imageData
    }));
    setIsAvatarEditorOpen(false);
    setTempAvatarUrl("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "dnd": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-primary">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dashboard do Bot
            </h1>
            <p className="text-muted-foreground">Gerencie seu bot Discord</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Servidores</p>
                <p className="text-2xl font-bold text-primary">{stats.servers}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-secondary">
                <Settings className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usuários</p>
                <p className="text-2xl font-bold text-primary">{stats.users.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-secondary">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Comandos Hoje</p>
                <p className="text-2xl font-bold text-primary">{stats.commands}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-secondary">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Configuration */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações do Bot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={botConfig.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-white text-xl">
                    {botConfig.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${getStatusColor(botConfig.status)}`} />
              </div>
              <div className="flex-1">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80">
                    <Camera className="h-4 w-4" />
                    Alterar Avatar
                  </div>
                </Label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>

            {/* Bot Name */}
            <div className="space-y-2">
              <Label htmlFor="bot-name">Nome do Bot</Label>
              <Input
                id="bot-name"
                value={botConfig.name}
                onChange={(e) => setBotConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Digite o nome do bot"
              />
            </div>

            {/* Bot Description */}
            <div className="space-y-2">
              <Label htmlFor="bot-description">Descrição</Label>
              <Textarea
                id="bot-description"
                value={botConfig.description}
                onChange={(e) => setBotConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva seu bot"
                rows={3}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="bot-status">Status</Label>
              <Select
                value={botConfig.status}
                onValueChange={(value: "online" | "idle" | "dnd" | "invisible") => 
                  setBotConfig(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      Online
                    </div>
                  </SelectItem>
                  <SelectItem value="idle">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      Ausente
                    </div>
                  </SelectItem>
                  <SelectItem value="dnd">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      Não Perturbar
                    </div>
                  </SelectItem>
                  <SelectItem value="invisible">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                      Invisível
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Configuration */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividade do Bot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Activity Type */}
            <div className="space-y-2">
              <Label htmlFor="activity-type">Tipo de Atividade</Label>
              <Select
                value={botConfig.activity.type}
                onValueChange={(value: "playing" | "listening" | "watching" | "streaming") =>
                  setBotConfig(prev => ({
                    ...prev,
                    activity: { ...prev.activity, type: value }
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="playing">🎮 Jogando</SelectItem>
                  <SelectItem value="listening">🎵 Ouvindo</SelectItem>
                  <SelectItem value="watching">👀 Assistindo</SelectItem>
                  <SelectItem value="streaming">📺 Transmitindo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Name */}
            <div className="space-y-2">
              <Label htmlFor="activity-name">Nome da Atividade</Label>
              <Input
                id="activity-name"
                value={botConfig.activity.name}
                onChange={(e) => setBotConfig(prev => ({
                  ...prev,
                  activity: { ...prev.activity, name: e.target.value }
                }))}
                placeholder="Ex: Minecraft, Spotify, YouTube"
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview da Atividade</Label>
              <div className="p-4 rounded-lg bg-gradient-secondary">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={botConfig.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {botConfig.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{botConfig.name}</span>
                      <Badge variant="secondary" className="text-xs">BOT</Badge>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(botConfig.status)}`} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {botConfig.activity.type === "playing" && "🎮 Jogando "}
                      {botConfig.activity.type === "listening" && "🎵 Ouvindo "}
                      {botConfig.activity.type === "watching" && "👀 Assistindo "}
                      {botConfig.activity.type === "streaming" && "📺 Transmitindo "}
                      {botConfig.activity.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Avatar Editor Modal */}
      <AvatarEditor
        isOpen={isAvatarEditorOpen}
        onClose={() => {
          setIsAvatarEditorOpen(false);
          setTempAvatarUrl("");
        }}
        onSave={handleAvatarSave}
        imageUrl={tempAvatarUrl}
      />
    </div>
  );
}