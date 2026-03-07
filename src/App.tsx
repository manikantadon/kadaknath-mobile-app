import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerHome from "./pages/customer/Home";
import Traceability from "./pages/customer/Traceability";
import CustomerOrders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";
import Notifications from "./pages/customer/Notifications";
import ProductDetails from "./pages/customer/ProductDetails";
import ProductList from "./pages/customer/ProductList";
import Cart from "./pages/customer/Cart";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminStaff from "./pages/admin/Staff";
import DriverDeliveries from "./pages/driver/Deliveries";
import DriverProfile from "./pages/driver/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/selector" element={<Index />} />
            
            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerHome />} />
            <Route path="/customer/products" element={<ProductList />} />
            <Route path="/customer/product/:id" element={<ProductDetails />} />
            <Route path="/customer/cart" element={<Cart />} />
            <Route path="/customer/trace" element={<Traceability />} />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/customer/profile" element={<Profile />} />
            <Route path="/customer/notifications" element={<Notifications />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/staff" element={<AdminStaff />} />

            {/* Driver Routes */}
            <Route path="/driver" element={<DriverDeliveries />} />
            <Route path="/driver/profile" element={<DriverProfile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </NotificationProvider>
  </QueryClientProvider>
);

export default App;