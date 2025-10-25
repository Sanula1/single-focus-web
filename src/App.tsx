import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrganizationLayout } from "./components/layouts/OrganizationLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import GlobalOrganizations from "./pages/GlobalOrganizations";
import DashboardCourses from "./pages/DashboardCourses";
import DashboardLectures from "./pages/DashboardLectures";
import OrganizationDetail from "./pages/OrganizationDetail";
import OrganizationCourses from "./pages/OrganizationCourses";
import OrganizationMembers from "./pages/OrganizationMembers";
import OrganizationUnverified from "./pages/OrganizationUnverified";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Global Organizations - view all available organizations */}
            <Route path="/dashboard/global" element={<GlobalOrganizations />} />
            <Route path="/dashboard/courses" element={<DashboardCourses />} />
            <Route path="/dashboard/lectures" element={<DashboardLectures />} />
            <Route path="/organization/:id" element={<OrganizationLayout />}>
              <Route index element={<OrganizationDetail />} />
              <Route path="courses" element={<OrganizationCourses />} />
              <Route path="members" element={<OrganizationMembers />} />
              <Route path="unverified" element={<OrganizationUnverified />} />
            </Route>
            <Route path="/course/:id" element={<CourseDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
