import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetails";
import Login from "./admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import AddBlog from "./admin/AddBlog";
import DSGVOBlog from "./blogs/German-clients";
import AboutBridgePage from "./blogs/DSGVO-Compliant-Websites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />

          <Route path="/admin/login" element={<Login />} />
          <Route path="/blogs/german-clients" element={<DSGVOBlog />} />
          <Route path="/blogs/dsgvo-compliant-websites" element={<AboutBridgePage />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-blog"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
