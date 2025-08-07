import { NavLink, useLocation } from "react-router-dom";
import {
  Bot,
  Settings,
  Activity,
  Users,
  MessageSquare,
  BarChart3,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Atividade", url: "/activity", icon: Activity },
  { title: "Usuários", url: "/users", icon: Users },
  { title: "Mensagens", url: "/messages", icon: MessageSquare },
  { title: "Moderação", url: "/moderation", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-white font-medium shadow-elegant" 
      : "hover:bg-accent/50 text-foreground hover:text-accent-foreground";

  return (
    <Sidebar className="border-r transition-all duration-300">
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  Bot Dashboard
                </h2>
                <p className="text-xs text-muted-foreground">Painel de Controle</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Bot className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Menu Principal
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300
                        ${getNavCls({ isActive })}
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto p-4 border-t">
          {!isCollapsed && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Discord Bot Manager
              </p>
              <p className="text-xs text-muted-foreground">
                v1.0.0
              </p>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}