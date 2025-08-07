import { useState } from "react";
import { User, Settings, LogOut, Edit, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
}

export function ProfileModal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "Administrador",
    email: "admin@botmanager.com",
    role: "Administrador",
    avatar: "/placeholder.svg",
    joinDate: "Janeiro 2024",
  });

  const handleProfileUpdate = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Meu Perfil</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-gradient-primary text-white text-lg">
                  {userData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-lg">{userData.name}</h3>
              <Badge variant="secondary" className="bg-gradient-primary text-white">
                {userData.role}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Account Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Nome</Label>
              <div className="flex gap-2">
                <Input
                  id="profile-name"
                  value={userData.name}
                  onChange={(e) => handleProfileUpdate("name", e.target.value)}
                />
                <Button size="icon" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="profile-email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleProfileUpdate("email", e.target.value)}
                />
                <Button size="icon" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Membro desde</Label>
              <Input value={userData.joinDate} disabled />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}