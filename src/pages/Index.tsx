import { Link } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hospitaisPorEstado } from "@/data/hospitais";

// Lazy load dos componentes pesados
const HeroModelCarousel = lazy(() => import("@/components/HeroModelCarousel"));
const RaycastBackground = lazy(() =>
  import("@/components/ui/raycast-animated-blue-white-background").then((module) => ({
    default: module.RaycastAnimatedBlueWhiteBackground,
  }))
);
import { 
  Award, 
  ArrowRight, 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Shield, 
  CheckCircle2, 
  Target, 
  Eye, 
  Heart,
  Wrench,
  Headphones,
  Package
} from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show3DModel, setShow3DModel] = useState(false);
  const [showMapAndCards, setShowMapAndCards] = useState(false);
  const [showSplineBackground, setShowSplineBackground] = useState(false);
  const [presencaTextVisible, setPresencaTextVisible] = useState(false);
  const [presencaMapVisible, setPresencaMapVisible] = useState(false);
  const [presencaSplineVisible, setPresencaSplineVisible] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  
  // Estados para Intersection Observer de outras seções
  const [certificacoesVisible, setCertificacoesVisible] = useState(false);
  const [missaoVisible, setMissaoVisible] = useState(false);
  const [posVendaVisible, setPosVendaVisible] = useState(false);
  const [localizacaoVisible, setLocalizacaoVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Mostra modelo 3D após 300ms (já estará carregado)
    setTimeout(() => setShow3DModel(true), 300);
    // Carrega mapa e cards após 800ms
    setTimeout(() => setShowMapAndCards(true), 800);
    // Carrega Spline background após 1200ms
    setTimeout(() => setShowSplineBackground(true), 1200);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'STATE_HOVER') {
        setSelectedState(event.data.state);
      } else if (event.data.type === 'STATE_LEAVE') {
        setSelectedState(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Intersection Observer para carregar seção Presença Nacional progressivamente
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !presencaTextVisible) {
            // 1. Texto aparece imediatamente
            setPresencaTextVisible(true);
            
            // 2. Mapa e card aparecem após 400ms
            setTimeout(() => {
              setPresencaMapVisible(true);
            }, 400);
            
            // 3. Spline background carrega quando o navegador estiver ocioso (otimização)
            const loadSpline = () => {
            setTimeout(() => {
              setPresencaSplineVisible(true);
              }, 1500);
            };
            
            // Usa requestIdleCallback para carregar Spline sem travar
            if ('requestIdleCallback' in window) {
              requestIdleCallback(loadSpline, { timeout: 3000 });
            } else {
              loadSpline();
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '200px' } // Pré-carrega 200px antes de entrar na viewport
    );

    const presencaSection = document.getElementById('presenca-nacional-section');
    if (presencaSection) {
      observer.observe(presencaSection);
    }

    return () => {
      if (presencaSection) {
        observer.unobserve(presencaSection);
      }
    };
  }, [presencaTextVisible]);

  // Intersection Observer para outras seções
  useEffect(() => {
    // Criar observer reutilizável
    const createObserver = (setState: (value: boolean) => void) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setState(true);
            }
          });
        },
        { threshold: 0.1, rootMargin: '200px' }
      );
    };

    // Observar seção de Certificações
    const certObserver = createObserver(setCertificacoesVisible);
    const certSection = document.getElementById('certificacoes-section');
    if (certSection) certObserver.observe(certSection);

    // Observar seção de Missão/Visão/Valores
    const missaoObserver = createObserver(setMissaoVisible);
    const missaoSection = document.getElementById('missao-section');
    if (missaoSection) missaoObserver.observe(missaoSection);

    // Observar seção de Pós-venda
    const posVendaObserver = createObserver(setPosVendaVisible);
    const posVendaSection = document.getElementById('posvenda-section');
    if (posVendaSection) posVendaObserver.observe(posVendaSection);

    // Observar seção de Localização
    const localizacaoObserver = createObserver(setLocalizacaoVisible);
    const localizacaoSection = document.getElementById('localizacao-section');
    if (localizacaoSection) localizacaoObserver.observe(localizacaoSection);

    return () => {
      certObserver.disconnect();
      missaoObserver.disconnect();
      posVendaObserver.disconnect();
      localizacaoObserver.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen bg-background" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}>
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-20 pb-6 relative overflow-hidden min-h-screen bg-white">
        {/* Background branco + animação Raycast com zoom */}
        <div className="absolute inset-0" style={{ transform: 'scale(1.2)', transformOrigin: 'center center' }}>
          <Suspense fallback={<div className="absolute inset-0 bg-white" />}>
            <RaycastBackground />
          </Suspense>
        </div>

        {/* Divisor decorativo com onda */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 5, marginBottom: '-1px' }}>
          <svg 
            className="w-full h-24" 
            viewBox="0 0 1440 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Onda azul de fundo */}
            <path 
              d="M0,10 C360,70 540,0 720,30 C900,60 1080,0 1440,30 L1440,100 L0,100 Z" 
              fill="#3b82f6"
              fillOpacity="0.15"
            />
            {/* Ondas brancas */}
            <path 
              d="M0,20 C320,80 420,0 720,40 C1020,80 1120,0 1440,40 L1440,100 L0,100 Z" 
              fill="white"
              fillOpacity="0.3"
            />
            <path 
              d="M0,40 C360,100 540,20 720,60 C900,100 1080,20 1440,60 L1440,100 L0,100 Z" 
              fill="white"
              fillOpacity="0.5"
            />
            <path 
              d="M0,60 C240,100 480,40 720,80 C960,100 1200,40 1440,80 L1440,100 L0,100 Z" 
              fill="white"
            />
          </svg>
        </div>
        
        <div className="w-full max-w-none mx-0 px-0 relative z-10 h-full">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center min-h-[510px] pt-4 sm:pt-6 lg:pt-8">
            {/* Content Column - sempre alinhado à esquerda */}
            <div className="max-w-full lg:max-w-2xl animate-fade-up order-1 lg:order-1 text-left pl-2 sm:pl-4 lg:pl-6 -mt-2 sm:-mt-4 lg:-mt-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Badges superiores */}
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Badge variant="secondary" className="bg-white/90 text-black backdrop-blur-sm border-gray-200 text-[clamp(0.75rem,0.4vw+0.5rem,0.9rem)]">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    +23 anos de experiência
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500 text-[clamp(0.95rem,1vw+0.5rem,1.35rem)]">★★★★★</span>
                    <span className="text-[clamp(0.85rem,0.6vw+0.5rem,1.05rem)] text-black ml-1 sm:ml-2">Excelência comprovada</span>
                  </div>
        </div>
        
                {/* Título principal */}
                <h1 className="font-bold leading-tight text-black mb-4 sm:mb-6 font-nunito drop-shadow-lg text-left text-[clamp(2.25rem,4vw+0.5rem,5rem)]">
                  Equipamentos Hospitalares de{' '}
                  <span className="inline-block mt-1 sm:mt-2" style={{color: '#066ba4'}}>Excelência</span>
              </h1>
                
                {/* Descrição */}
                <p className="text-black leading-relaxed mb-6 sm:mb-8 font-figtree drop-shadow-md text-left text-[clamp(1rem,1.2vw+0.25rem,1.5rem)]">
                  Soluções completas em esterilização e equipamentos médicos com certificações ANVISA e ISO 13485.
                </p>
                
                {/* Badges de certificação */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 justify-start">
                  <Badge variant="outline" className="bg-white/90 text-black border-gray-200 backdrop-blur-sm text-[clamp(0.75rem,0.6vw+0.4rem,1rem)]">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></span>
                    ANVISA Certificado
                  </Badge>
                  <Badge variant="outline" className="bg-white/90 text-black border-gray-200 backdrop-blur-sm text-[clamp(0.75rem,0.6vw+0.4rem,1rem)]">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-1 sm:mr-2"></span>
                    ISO 13485
                  </Badge>
                </div>
                
                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                  <Button size="lg" variant="default" className="hover-lift font-medium w-full sm:w-auto text-[clamp(0.95rem,0.8vw+0.5rem,1.2rem)]" style={{backgroundColor: '#066ba4', color: 'white'}} asChild>
                  <Link to="/produtos">
                    Ver Produtos
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Link>
                </Button>
                  <Button size="lg" variant="outline" className="hover-lift bg-white/90 text-black border-gray-200 hover:bg-white backdrop-blur-sm font-medium w-full sm:w-auto text-[clamp(0.95rem,0.8vw+0.5rem,1.2rem)]">
                    Fale Conosco
                  </Button>
                </div>
              </div>
            </div>

            {/* 3D Model Carousel Column */}
            <div className="flex items-center justify-center order-2 lg:order-2">
              <Suspense fallback={<div className="w-full h-64 sm:h-80 md:h-96" />}>
                <div 
                  className="transition-all duration-500 w-full"
                  style={{ 
                    width: 'clamp(280px, 44vw, 860px)',
                    opacity: show3DModel ? 1 : 0,
                    transform: show3DModel ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="w-full aspect-[4/3]">
                    <HeroModelCarousel className="w-full h-full" />
                  </div>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Presença Nacional */}
      <section id="presenca-nacional-section" className="pt-8 pb-16 bg-white -mt-1 relative overflow-hidden min-h-screen">
        {/* Background branco limpo */}
        <div className="absolute inset-0 pointer-events-none bg-white" />
        
        {/* Spline 3D Background - DESABILITADO (causava conflito com Three.js) */}
        {/* {presencaSplineVisible && (
          <Suspense fallback={null}>
            ...spline viewer code...
          </Suspense>
        )} */}
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Textos - aparecem primeiro com fade-in */}
          <div 
            className="text-center mb-8 sm:mb-12 transition-all duration-700 px-4"
            style={{
              opacity: presencaTextVisible ? 1 : 0,
              transform: presencaTextVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="outline">Presença Nacional</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Nossa Presença no Brasil</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Atendemos hospitais e clínicas em todo o território nacional
            </p>
          </div>

          {/* Mapa e Cards - aparecem depois dos textos */}
          <div 
            className="grid lg:grid-cols-2 gap-8 items-center transition-all duration-700"
            style={{
              opacity: presencaMapVisible ? 1 : 0,
              transform: presencaMapVisible ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            {/* Mapa do Brasil - Lado Esquerdo */}
            <iframe 
              src="/mapa-brasil.html" 
              className="w-full h-[700px] border-0"
              title="Mapa de Presença Nacional"
              style={{ display: 'block', background: 'transparent', overflow: 'hidden' }}
              scrolling="no"
              loading="lazy"
            />

            {/* Informações Dinâmicas - Lado Direito */}
            <div className="flex items-start justify-center py-12 relative">
              {/* Bola de luz azul desfocada atrás */}
              <div 
                className="absolute w-[400px] h-[400px] rounded-full opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(96, 165, 250, 0.3) 40%, transparent 70%)',
                  filter: 'blur(60px)',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              />
              
              {selectedState && hospitaisPorEstado[selectedState] ? (
                <div 
                  key={selectedState}
                  className="w-full max-w-[500px] p-8 animate-fade-in relative z-10"
                >
                  <div 
                    className="relative w-full rounded-3xl overflow-hidden"
                    style={{
                      minHeight: '300px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.85) 50%, rgba(219, 234, 254, 0.9) 100%)',
                      backdropFilter: 'blur(40px) saturate(150%) brightness(1.1)',
                      WebkitBackdropFilter: 'blur(40px) saturate(150%) brightness(1.1)',
                      border: '2px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: `
                        0 8px 32px rgba(59, 130, 246, 0.15),
                        0 16px 64px rgba(6, 107, 164, 0.1),
                        0 0 0 1.5px rgba(255, 255, 255, 0.4) inset,
                        0 2px 4px rgba(255, 255, 255, 0.6) inset,
                        0 0 80px rgba(59, 130, 246, 0.1)
                      `,
                    }}
                  >
                    {/* Reflexo de vidro intensificado */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                      }}
                    />
                    {/* Brilho adicional no canto */}
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                    />
                    
                    {/* Conteúdo */}
                    <div className="relative z-10 p-8">
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            {hospitaisPorEstado[selectedState].nome}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 ml-14">
                          <p className="text-sm font-medium text-gray-600">
                            Sanders Medical
                          </p>
                        </div>
                      </div>

                      {/* Hospitais */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                          Hospitais Atendidos
                        </p>
                        <ul className="space-y-3">
                          {hospitaisPorEstado[selectedState].hospitais.map((hospital, index) => (
                            <li 
                              key={index}
                              className="flex items-start gap-3 group"
                              style={{
                                animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                              }}
                            >
                              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                                <Building2 className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-800 text-sm leading-relaxed">
                                {hospital}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                ) : null}
              </div>
            </div>

          {/* Marquee de Hospitais Parceiros - aparece com mapa e cards */}
          <div 
            className="mt-8 transition-all duration-700"
            style={{
              opacity: presencaMapVisible ? 1 : 0,
              transform: presencaMapVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div 
              className="relative overflow-hidden py-6"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            >
              {/* Marquee Container */}
              <div className="marquee-container-slow flex">
                <div className="marquee-content-slow flex items-center gap-12">
                  {Object.values(hospitaisPorEstado).flatMap(estado => 
                    estado.hospitais.map((hospital, idx) => (
                      <span 
                        key={`${estado.nome}-${idx}`}
                        className="text-2xl font-medium text-gray-400 whitespace-nowrap"
                      >
                        {hospital}
                      </span>
                    ))
                  )}
                </div>
                {/* Duplicata para loop infinito */}
                <div className="marquee-content-slow flex items-center gap-12" aria-hidden="true">
                  {Object.values(hospitaisPorEstado).flatMap(estado => 
                    estado.hospitais.map((hospital, idx) => (
                      <span 
                        key={`${estado.nome}-${idx}-duplicate`}
                        className="text-2xl font-medium text-gray-400 whitespace-nowrap"
                      >
                        {hospital}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisor decorativo com onda */}
      <div className="relative -mt-24 pointer-events-none">
        <svg 
          className="w-full h-24" 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Onda azul de fundo */}
          <path 
            d="M0,10 C360,70 540,0 720,30 C900,60 1080,0 1440,30 L1440,100 L0,100 Z" 
            fill="#3b82f6"
            fillOpacity="0.15"
          />
          {/* Ondas brancas */}
          <path 
            d="M0,20 C320,80 420,0 720,40 C1020,80 1120,0 1440,40 L1440,100 L0,100 Z" 
            fill="white"
            fillOpacity="0.3"
          />
          <path 
            d="M0,40 C360,100 540,20 720,60 C900,100 1080,20 1440,60 L1440,100 L0,100 Z" 
            fill="white"
            fillOpacity="0.5"
          />
          <path 
            d="M0,60 C240,100 480,40 720,80 C960,100 1200,40 1440,80 L1440,100 L0,100 Z" 
            fill="white"
          />
        </svg>
      </div>

      {/* Container com Background Unificado para Certificações + Missão/Visão/Valores */}
      <div className="relative overflow-hidden bg-white [background:radial-gradient(ellipse_125%_125%_at_50%_110%,#bfdbfe_0%,#dbeafe_30%,#fff_70%)]">
        {/* Grid pattern decorativo */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Certificações e Qualidade */}
        <section id="certificacoes-section" className="py-16 relative">
          <div 
            className="container mx-auto px-4 relative z-10 transition-all duration-700"
            style={{
              opacity: certificacoesVisible ? 1 : 0,
              transform: certificacoesVisible ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
          <div className="text-center mb-8 sm:mb-12 px-4">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="outline">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Qualidade Garantida
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Certificações e Qualidade</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nosso compromisso com a qualidade é reconhecido pelas principais certificações nacionais e internacionais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* ISO 13485 - Liquid Glass Card */}
            <div className="group h-[320px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <svg viewBox="0 0 200 200" className="w-20 h-20 drop-shadow-2xl">
                      <circle cx="100" cy="100" r="95" fill="#0066B3" />
                      <text x="100" y="85" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="Arial">ISO</text>
                      <text x="100" y="120" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="Arial">13485</text>
                    </svg>
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">ISO 13485</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Certificação internacional para sistemas de gestão da qualidade em dispositivos médicos.
                </p>
                </div>
              </div>
            </div>

            {/* ANVISA - Liquid Glass Card */}
            <div className="group h-[320px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <svg viewBox="0 0 200 200" className="w-20 h-20 drop-shadow-2xl">
                      <rect width="200" height="200" fill="#00A859" rx="10" />
                      <text x="100" y="90" textAnchor="middle" fill="white" fontSize="38" fontWeight="bold" fontFamily="Arial">ANVISA</text>
                      <circle cx="100" cy="140" r="8" fill="white" />
                      <path d="M 100 148 L 85 165 L 115 165 Z" fill="white" />
                    </svg>
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">ANVISA</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Registro na Agência Nacional de Vigilância Sanitária para todos os nossos produtos.
                </p>
                </div>
              </div>
            </div>

            {/* CE Marking - Liquid Glass Card */}
            <div className="group h-[320px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <svg viewBox="0 0 200 100" className="w-20 h-auto drop-shadow-2xl">
                      <ellipse cx="45" cy="50" rx="38" ry="45" fill="none" stroke="#000" strokeWidth="8" />
                      <ellipse cx="155" cy="50" rx="38" ry="45" fill="none" stroke="#000" strokeWidth="8" />
                      <text x="43" y="70" textAnchor="middle" fill="#000" fontSize="55" fontWeight="bold" fontFamily="Arial, sans-serif">C</text>
                      <text x="153" y="70" textAnchor="middle" fill="#000" fontSize="55" fontWeight="bold" fontFamily="Arial, sans-serif">E</text>
                    </svg>
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">CE Marking</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Conformidade europeia para exportação e padrões internacionais de qualidade.
                </p>
                </div>
              </div>
                </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
        <section id="missao-section" className="py-16 relative">
        <div 
          className="container mx-auto px-4 relative z-10 transition-all duration-700"
          style={{
            opacity: missaoVisible ? 1 : 0,
            transform: missaoVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Missão - Liquid Glass Card */}
            <div className="group h-[280px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-16 h-16 bg-gradient-to-br from-sanders-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nossa missão é preservar a vida dos pacientes e profissionais da área da saúde através de equipamentos 
                    hospitalares de alta tecnologia e qualidade excepcional.
            </p>
          </div>
              </div>
            </div>

            {/* Visão - Liquid Glass Card */}
            <div className="group h-[280px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Visão</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Ser referência nacional em equipamentos médicos, reconhecida pela inovação, qualidade e 
                  excelência no atendimento.
                </p>
                  </div>
                  </div>
          </div>
          
            {/* Valores - Liquid Glass Card */}
            <div className="group h-[280px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Valores</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Qualidade, Inovação, Comprometimento, Sustentabilidade e Foco no Cliente são os pilares 
                  de nossa atuação.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Pós-venda e Garantia */}
      <section id="posvenda-section" className="py-16 bg-muted -mt-1">
        <div 
          className="container mx-auto px-4 transition-all duration-700"
          style={{
            opacity: posVendaVisible ? 1 : 0,
            transform: posVendaVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <div className="text-center mb-8 sm:mb-12 px-4">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="outline">
              <Wrench className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Suporte Completo
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Pós-venda e Garantia</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nosso compromisso com você não termina na venda. Oferecemos suporte completo durante toda a vida útil do equipamento.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Suporte Técnico - Liquid Glass Card */}
            <div className="group h-[240px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-12 h-12 bg-gradient-to-br from-sanders-blue to-blue-600 rounded-xl flex items-center justify-center shadow-xl">
                      <Headphones className="h-6 w-6 text-white" />
                </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Suporte Técnico</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Equipe especializada disponível para atendimento personalizado.
                </p>
                </div>
              </div>
            </div>

            {/* Garantia Estendida - Liquid Glass Card */}
            <div className="group h-[240px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-xl">
                      <Shield className="h-6 w-6 text-white" />
                </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Garantia Estendida</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Até 3 anos de garantia com manutenção preventiva incluída.
                </p>
                </div>
              </div>
            </div>

            {/* Peças Originais - Liquid Glass Card */}
            <div className="group h-[240px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-xl">
                      <Package className="h-6 w-6 text-white" />
                </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Peças Originais</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Estoque permanente de peças e acessórios originais.
                </p>
                </div>
              </div>
            </div>

            {/* Treinamento - Liquid Glass Card */}
            <div className="group h-[240px] [perspective:1000px]">
              <div className="relative h-full rounded-[40px] shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 50%, rgba(219, 234, 254, 0.95) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), 0 0 0 1.5px rgba(255, 255, 255, 0.5) inset',
              }}>
                {/* Glass layer */}
                <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/60 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                
                {/* Reflexo de vidro intensificado */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-[40px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                  }}
                />
                {/* Brilho adicional no canto superior direito */}
                <div 
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center [transform:translate3d(0,0,25px)]">
                  <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:[transform:translate3d(0,0,30px)]">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-xl">
                      <Users className="h-6 w-6 text-white" />
                </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Treinamento</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                  Capacitação da equipe para uso correto dos equipamentos.
                </p>
                  </div>
                  </div>
                  </div>
          </div>
        </div>
      </section>

      {/* Nossa Localização */}
      <section id="localizacao-section" className="py-16 bg-background">
        <div 
          className="container mx-auto px-4 transition-all duration-700"
          style={{
            opacity: localizacaoVisible ? 1 : 0,
            transform: localizacaoVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <div className="text-center mb-8 sm:mb-12 px-4">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="outline">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Localização
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Nossa Localização</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Estrategicamente localizada em Santa Rita do Sapucaí – MG, reconhecida como o Vale da Eletrônica, 
              facilitando logística e atendimento ágil em todo o território nacional.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sanders-blue" />
                  Endereço Completo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>Rua Industrial, 123</p>
                <p>Distrito Industrial</p>
                <p>Santa Rita do Sapucaí - MG</p>
                <p className="font-semibold">CEP: 37540-000</p>
                
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 text-sanders-blue mt-0.5" />
                    <div>
                      <p className="font-semibold">Horário de Funcionamento:</p>
                      <p>Segunda a Sexta: 8h às 18h</p>
                      <p>Sábado: 8h às 12h</p>
            </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mapa Interativo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117474.97330508835!2d-45.78688487289393!3d-22.250954499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc50dbadc8397b%3A0x7b6d5b25b5db5dd!2sSanta%20Rita%20do%20Sapuca%C3%AD%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Sanders do Brasil - Santa Rita do Sapucaí, MG"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default Index;