import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Deputados from "./pages/Deputados";
import DeputadoDetalhe from "./pages/DeputadoDetalhe";
import Senadores from "./pages/Senadores";
import SenadorDetalhe from "./pages/SenadorDetalhe";
import Votacoes from "./pages/Votacoes";
import STFMinistros from "./pages/STFMinistros";
import STFMinistroDetalhe from "./pages/STFMinistroDetalhe";
import STFVotacoes from "./pages/STFVotacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/deputados" element={<Deputados />} />
          <Route path="/deputados/:id" element={<DeputadoDetalhe />} />
          <Route path="/senadores" element={<Senadores />} />
          <Route path="/senadores/:id" element={<SenadorDetalhe />} />
          <Route path="/votacoes" element={<Votacoes />} />
          <Route path="/stf" element={<STFMinistros />} />
          <Route path="/stf/votacoes" element={<STFVotacoes />} />
          <Route path="/stf/:id" element={<STFMinistroDetalhe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
