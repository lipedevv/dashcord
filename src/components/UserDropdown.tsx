import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export function UserDropdown() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData] = useState<UserData>({
    name: "Administrador",
    email: "admin@botmanager.com",
    avatar: "/placeholder.svg",
  });

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 p-2 hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback className="bg-gradient-primary text-white">
              {userData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block font-medium">{userData.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{userData.name}</p>
          <p className="text-xs text-muted-foreground">{userData.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}