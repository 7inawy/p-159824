
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ShoppingCart, 
  Package, 
  PackageCheck, 
  Users, 
  ShoppingBag,
  Palette, 
  Tag, 
  BarChart, 
  Settings,
  Menu,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <li>
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full justify-start ${
          active ? "bg-[#F97415] text-white hover:bg-[#F97415]/90" : ""
        }`}
        onClick={onClick}
      >
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
      </Button>
    </li>
  );
};

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Get current path
  const pathname = window.location.pathname;

  const sidebarItems = [
    { icon: <Home size={20} />, label: "الرئيسية", path: "/dashboard" },
    { icon: <ShoppingCart size={20} />, label: "الطلبات", path: "/dashboard/orders" },
    { icon: <Package size={20} />, label: "المنتجات", path: "/dashboard/products" },
    { icon: <PackageCheck size={20} />, label: "المخزون", path: "/dashboard/inventory" },
    { icon: <Users size={20} />, label: "العملاء", path: "/dashboard/customers" },
    { icon: <ShoppingBag size={20} />, label: "نقطة البيع", path: "/dashboard/pos" },
    { icon: <Palette size={20} />, label: "تخصيص المتجر", path: "/dashboard/customize" },
    { icon: <Tag size={20} />, label: "التسويق والخصومات", path: "/dashboard/marketing" },
    { icon: <BarChart size={20} />, label: "التحليلات", path: "/dashboard/analytics" },
    { icon: <Settings size={20} />, label: "الإعدادات", path: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-20 w-64 transform transition-transform duration-300 ease-in-out bg-white border-l lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:w-20"
        } ${isMobileSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className={`text-xl font-bold text-[#F97415] ${!sidebarOpen && "lg:hidden"}`}>
              لوحة التحكم
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:flex"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={sidebarOpen ? item.label : ""}
                  path={item.path}
                  active={pathname === item.path}
                  onClick={() => navigate(item.path)}
                />
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-2" />
              {sidebarOpen && <span>تسجيل الخروج</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileSidebar}
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#F97415] flex items-center justify-center text-white font-bold">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
