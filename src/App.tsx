import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Empresa from "./pages/Empresa";
import Produtos from "./pages/Produtos";
import ProdutoDetalhes from "./pages/ProdutoDetalhes";
import ProdutoDetalhesIndividual from "./pages/ProdutoDetalhesIndividual";
import NotFound from "./pages/NotFound";
import FloatingChat from "@/components/FloatingChat";
import { ChatProvider } from "@/contexts/ChatContext";

// Páginas temporariamente removidas
// import Blog from "./pages/Blog";
// import Contato from "./pages/Contato";
// import QueroComprar from "./pages/QueroComprar";
// import AssistenciaTecnica from "./pages/AssistenciaTecnica";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/empresa" element={<Empresa />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/produto/:id" element={<ProdutoDetalhes />} />
              <Route path="/produto-detalhes/:id" element={<ProdutoDetalhesIndividual />} />
              {/* Rotas temporariamente removidas */}
              {/* <Route path="/blog" element={<Blog />} /> */}
              {/* <Route path="/contato" element={<Contato />} /> */}
              {/* <Route path="/quero-comprar" element={<QueroComprar />} /> */}
              {/* <Route path="/assistencia-tecnica" element={<AssistenciaTecnica />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Chat Flutuante Global */}
            <FloatingChat />
          </BrowserRouter>
        </ChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;