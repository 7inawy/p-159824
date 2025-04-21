
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

// Landing Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";

// Dashboard Pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";
import Inventory from "./pages/dashboard/Inventory";
import Customers from "./pages/dashboard/Customers";
import POSSystem from "./pages/dashboard/POSSystem";
import StoreCustomization from "./pages/dashboard/StoreCustomization";
import Marketing from "./pages/dashboard/Marketing";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!loading && (
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="customers" element={<Customers />} />
                <Route path="pos" element={<POSSystem />} />
                <Route path="customize" element={<StoreCustomization />} />
                <Route path="marketing" element={<Marketing />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
