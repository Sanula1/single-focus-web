import { Building2, Users, BookOpen, Bell, UserCheck, UserX, LogOut, Globe } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserRole } from "@/hooks/useUserRole";

interface AppSidebarProps {
  currentOrganization?: { id: string; name: string } | null;
  currentCourse?: { id: string; name: string } | null;
  variant?: "main" | "organization" | "course";
}

export function AppSidebar({ currentOrganization, currentCourse, variant = "main" }: AppSidebarProps) {
  const navigate = useNavigate();
  const { getCurrentRole, user, logout } = useUserRole();
  const effectiveRole = currentOrganization ? getCurrentRole(currentOrganization.id) : null;

  const mainMenuItems = [
    { title: "Organizations", url: "/dashboard", icon: Building2 },
    { title: "Global Organizations", url: "/dashboard/global", icon: Globe },
  ];

  // Role-based organization menu
  const getOrganizationMenuItems = () => {
    const baseItems = [
      { title: "Announcement", url: `/organization/${currentOrganization?.id}`, icon: Bell },
      { title: "Courses", url: `/organization/${currentOrganization?.id}/courses`, icon: BookOpen },
    ];

    // Member and Moderator only see Gallery and Courses
    if (effectiveRole === 'MEMBER' || effectiveRole === 'MODERATOR') {
      return baseItems;
    }

    // President and Admin see all sections
    if (effectiveRole === 'PRESIDENT' || effectiveRole === 'ADMIN') {
      return [
        ...baseItems,
        { title: "Members", url: `/organization/${currentOrganization?.id}/members`, icon: UserCheck },
        { title: "Unverified Members", url: `/organization/${currentOrganization?.id}/unverified`, icon: UserX },
      ];
    }

    return baseItems;
  };

  const courseMenuItems = [
    { title: "Lectures", url: `/course/${currentCourse?.id}`, icon: BookOpen },
  ];

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base">Suraksha OMS</span>
            <span className="text-sm text-muted-foreground">Organization Management System</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {(currentOrganization || currentCourse) && (
          <>
            <div className="px-6 py-5 bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground mb-3">Current Selection</p>
              {currentOrganization && (
                <div className="flex items-center gap-3 text-base mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">{currentOrganization.name}</span>
                </div>
              )}
              {currentCourse && (
                <div className="flex items-center gap-3 text-base">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <span className="font-medium">{currentCourse.name}</span>
                </div>
              )}
            </div>
            <Separator />
          </>
        )}

        {variant === "course" && currentCourse && (
          <SidebarGroup className="px-4 py-4">
            <SidebarGroupLabel className="text-sm font-semibold mb-3 px-2">Course Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {courseMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12 text-base">
                      <NavLink to={item.url} className={getNavClassName}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {variant === "organization" && currentOrganization && (
          <SidebarGroup className="px-4 py-4">
            <SidebarGroupLabel className="text-sm font-semibold mb-3 px-2">Organization Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {getOrganizationMenuItems().map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12 text-base">
                      <NavLink to={item.url} end className={getNavClassName}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {variant === "main" && (
          <SidebarGroup className="px-4 py-4">
            <SidebarGroupLabel className="text-sm font-semibold mb-3 px-2">Main Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {mainMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12 text-base">
                      <NavLink to={item.url} end className={getNavClassName}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-6">
        <Button 
          variant="ghost" 
          className="w-full justify-start h-12 text-base" 
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
