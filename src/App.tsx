import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerHome from "./pages/customer/Home";
import Traceability from "./pages/customer/Traceability";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminStaff from "./pages/admin/Staff";
import DriverDeliveries from "./pages/driver/Deliveries";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Customer Routes */}
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/trace" element={<Traceability />} />
          <Route path="/customer/orders" element={<div className="p-8">Orders Page (Coming Soon)</div>} />
          <Route path="/customer/profile" element={<div className="p-8">Profile Page (Coming Soon)</div>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/staff" element={<AdminStaff />} />

          {/* Driver Routes */}
          <Route path="/driver" element={<DriverDeliveries />} />
          <Route path="/driver/profile" element={<div className="p-8">Driver Profile (Coming Soon)</div>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;