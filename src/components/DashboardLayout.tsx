import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationPanel } from "@/components/NotificationPanel";
import { ProfileModal } from "@/components/ProfileModal";
import { SettingsButton } from "@/components/SettingsButton";
import { UserDropdown } from "@/components/UserDropdown";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <h1 className="text-xl font-semibold hidden lg:block">
                Gerenciamento do Bot
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <NotificationPanel />
              
              {/* Settings */}
              <SettingsButton />
              
              {/* Profile */}
              <ProfileModal />

              {/* User Menu */}
              <UserDropdown />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}