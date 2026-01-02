import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnarkProvider } from "@/lib/snark-context";
import { AppShell } from "@/components/AppShell";
import Index from "./pages/Index";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Shame from "./pages/Shame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SnarkProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/shame" element={<Shame />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </SnarkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
