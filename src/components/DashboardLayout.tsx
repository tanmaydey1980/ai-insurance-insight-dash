
import React from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { BarChart3, Home, Settings, Users, Zap } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
            <div className="bg-insurance-purple rounded-md p-1">
              <Zap className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">InsureTech AI</span>
          </div>
          <SidebarContent>
            <div className="grid gap-1 p-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                <span>Audience</span>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4 border-t border-sidebar-border">
              <div className="text-sidebar-foreground text-xs">
                <p className="font-semibold">InsureTech AI Platform</p>
                <p className="opacity-70">v1.0.0 - Analytics Preview</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto bg-background">
          <div className="px-6 py-4 border-b flex items-center bg-background">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="font-bold text-lg">Marketing Analytics Dashboard</h1>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
