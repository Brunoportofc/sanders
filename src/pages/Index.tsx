import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RaycastAnimatedBlueWhiteBackground } from "@/components/ui/raycast-animated-blue-white-background";
import SocialProof from "@/components/SocialProof";
import HeroModelCarousel from "@/components/HeroModelCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ArrowRight } from "lucide-react";

const Index = () => {
  // Tema agora é controlado pelo ThemeProvider (next-themes)

  return (
    <div className="min-h-screen bg-background tech-page">
      <Header />
      
      {/* Hero Banner */}
      <section className="py-8 relative overflow-hidden min-h-[700px]">
        {/* Animated blue and white background */}
        <div className="absolute inset-0 z-0">
          <RaycastAnimatedBlueWhiteBackground />
        </div>
        
        {/* Blur overlay */}
        <div className="absolute inset-0 z-5 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-6 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[600px] pt-4">
            {/* Content Column - mantido do lado esquerdo */}
            <div className="max-w-2xl animate-fade-up order-2 lg:order-1">
              <div className="space-y-6">
                {/* Badges superiores */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm border-gray-200">
                    <Award className="h-4 w-4 mr-2" />
                    +30 anos de experiência
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">★★★★★</span>
                    <span className="text-sm text-black ml-2">Excelência comprovada</span>
                  </div>
                </div>
                
                {/* Título principal */}
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-black mb-6 font-nunito drop-shadow-lg">
                  Equipamentos<br />Hospitalares de 
                  <span className="block mt-2" style={{color: '#066ba4'}}>Excelência</span>
                </h1>
                
                {/* Descrição */}
                <p className="text-lg text-black leading-relaxed mb-8 font-figtree drop-shadow-md">
                  Soluções completas em esterilização e equipamentos<br />
                  médicos com certificações ANVISA e ISO 13485.
                </p>
                
                {/* Badges de certificação */}
                <div className="flex items-center gap-4 mb-8">
                  <Badge variant="outline" className="text-xs bg-white/90 text-black border-gray-200 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    ANVISA Certificado
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-white/90 text-black border-gray-200 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    ISO 13485
                  </Badge>
                </div>
                
                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="default" className="hover-lift font-medium" style={{backgroundColor: '#066ba4', color: 'white'}} asChild>
                    <Link to="/produtos">
                      Ver Produtos
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="hover-lift bg-white/90 text-black border-gray-200 hover:bg-white backdrop-blur-sm font-medium">
                    Fale Conosco
                  </Button>
                </div>
              </div>
            </div>

            {/* 3D Model Carousel Column */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <HeroModelCarousel className="w-full max-w-lg animate-fade-up" />
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