import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreeDViewer from "@/components/ThreeDViewer";
import InlineThreeDViewer from "@/components/InlineThreeDViewer";
import HeroPremiumBackground from "@/components/HeroPremiumBackground";
import SocialProof from "@/components/SocialProof";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ArrowRight } from "lucide-react";

const Index = () => {
  const [is3DViewerActive, setIs3DViewerActive] = useState(true);
  // Tema agora é controlado pelo ThemeProvider (next-themes)

  return (
    <div className="min-h-screen bg-background tech-page">
      <Header />
      
      {/* Hero Banner */}
      <section className="py-24 relative overflow-hidden">
        {/* Clean premium background - subtle and professional */}
        <HeroPremiumBackground />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Card com conteúdo à esquerda */}
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 animate-fade-up">
              <div className="space-y-6">
                {/* Badges superiores */}
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-sanders-blue-light text-sanders-blue backdrop-blur-sm">
                    <Award className="h-4 w-4 mr-2" />
                    +30 anos de experiência
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-muted-foreground ml-2">Excelência comprovada</span>
                  </div>
                </div>
                
                {/* Título principal */}
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Equipamentos Hospitalares de 
                  <span className="heading-blue-gradient block mt-2">Excelência</span>
                </h1>
                
                {/* Descrição */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Soluções completas em esterilização e equipamentos 
                  médicos com certificações ANVISA e ISO 13485.
                </p>
                
                {/* Badges de certificação */}
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    ANVISA Certificado
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    ISO 13485
                  </Badge>
                </div>
                
                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="default" className="hover-lift" asChild>
                    <Link to="/produtos">
                      Ver Produtos
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="hover-lift">
                    Fale Conosco
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Modelo 3D à direita */}
            <div className="animate-scale-up viewer-transition" style={{animationDelay: '0.3s'}}>
              <div className="aspect-video relative">
                <InlineThreeDViewer isActive={is3DViewerActive} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Prova Social */}
      <SocialProof />

      <Footer />
    </div>
  );
};

export default Index;