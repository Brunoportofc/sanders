import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award } from "lucide-react";
import BrazilMap from "./BrazilMap";



// Logos fictícias dos hospitais para o carrossel
const logosHospitais = [
  { nome: "Hospital das Clínicas", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Sírio-Libanês", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Albert Einstein", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Copa D'Or", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Samaritano", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Mater Dei", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Moinhos de Vento", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Pequeno Príncipe", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Israelita", logo: "/api/placeholder/120/60" },
  { nome: "Hospital São Rafael", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Real Português", logo: "/api/placeholder/120/60" },
  { nome: "Hospital Monte Klinikum", logo: "/api/placeholder/120/60" }
];



const SocialProof: React.FC = () => {

  const [carrosselIndex, setCarrosselIndex] = useState(0);

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCarrosselIndex((prev) => (prev + 1) % logosHospitais.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalHospitais = 50; // Número total de hospitais parceiros
  const totalEstados = 16; // Estados atendidos no Brasil

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-sanders-blue-light text-sanders-blue">
            <Award className="h-4 w-4 mr-2" />
            Presença Nacional
          </Badge>
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Confiança em Todo o <span className="heading-blue-gradient">Brasil</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Mais de {totalHospitais} hospitais e clínicas em {totalEstados} estados confiam 
            nos equipamentos Sanders para suas operações críticas.
          </p>
          
          {/* Estatísticas */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-sanders-blue">{totalHospitais}+</div>
              <div className="text-sm text-muted-foreground">Hospitais Parceiros</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sanders-blue">{totalEstados}</div>
              <div className="text-sm text-muted-foreground">Estados Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sanders-blue">30+</div>
              <div className="text-sm text-muted-foreground">Anos de Experiência</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Mapa do Brasil */}
          <div className="relative">
            <Card className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-6 text-center">Mapa de Presença Nacional</h3>
                
                {/* Container do mapa */}
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  {/* Componente do mapa do Brasil */}
                  <BrazilMap className="w-full h-full" />
                  
                  {/* Mapa limpo sem pinos de localização */}
                </div>
                

              </CardContent>
            </Card>
          </div>

          {/* Carrossel de logos */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold mb-6 text-center">Nossos Parceiros</h3>
                
                {/* Carrossel principal */}
                <div className="relative h-32 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-slate-800/50 rounded-lg overflow-hidden mb-6">
                  <div className="flex items-center justify-center h-full">
                    <img 
                      src={logosHospitais[carrosselIndex].logo}
                      alt={logosHospitais[carrosselIndex].nome}
                      className="max-h-16 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="text-sm font-medium text-center">
                      {logosHospitais[carrosselIndex].nome}
                    </div>
                  </div>
                </div>
                
                {/* Grid de logos menores */}
                <div className="grid grid-cols-3 gap-4">
                  {logosHospitais.slice(0, 6).map((hospital, index) => (
                    <div 
                      key={index} 
                      className="aspect-video bg-white/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center p-2 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors"
                    >
                      <img 
                        src={hospital.logo}
                        alt={hospital.nome}
                        className="max-h-8 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Indicadores do carrossel */}
                <div className="flex justify-center gap-2 mt-4">
                  {logosHospitais.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === carrosselIndex ? 'bg-sanders-blue' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      onClick={() => setCarrosselIndex(index)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Card de credibilidade */}
            <Card className="p-6 bg-gradient-to-br from-sanders-blue/10 to-sanders-ocean/10 border-sanders-blue/20">
              <CardContent className="p-0 text-center">
                <Users className="h-12 w-12 text-sanders-blue mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Confiança Comprovada</h4>
                <p className="text-muted-foreground">
                  Equipamentos Sanders são a escolha preferida dos principais 
                  hospitais brasileiros há mais de 3 décadas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;