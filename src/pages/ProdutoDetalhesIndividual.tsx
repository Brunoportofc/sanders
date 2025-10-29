import { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModal from "@/components/ChatModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { getProdutoById } from "@/data/produtos";
import { useChatContext } from "@/contexts/ChatContext";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Componente de Card Animado com Scroll
type SpecCardProps = {
  title: string;
  value: string;
  index: number;
  totalCards: number;
  scrollYProgress: any;
};

const SpecCard = ({
  title,
  value,
  index,
  totalCards,
  scrollYProgress,
}: SpecCardProps) => {
  // Range mais suave com overlap entre cards
  const step = 1 / (totalCards + 0.5);
  const start = index * step;
  const end = (index + 1.5) * step;
  
  // Animação de entrada da direita mais suave
  const x = useTransform(
    scrollYProgress,
    [start, end],
    [250, 0]
  );
  
  // Fade in mais gradual
  const opacity = useTransform(
    scrollYProgress,
    [start, start + (end - start) * 0.3, end],
    [0, 0.5, 1]
  );
  
  // Escala mais sutil
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [0.92, 1]
  );
  
  // Rotação sutil no eixo Y
  const rotateY = useTransform(
    scrollYProgress,
    [start, end],
    [5, 0]
  );

  // Animação infinita sutil após aparecer
  const isVisible = useTransform(opacity, (val) => val > 0.9);
  
  return (
    <motion.div
      className="mb-16 py-4 will-change-transform relative group"
      style={{ 
        x, 
        opacity, 
        scale,
        rotateY,
        transformOrigin: "left center"
      }}
      animate={
        isVisible 
          ? {
              y: [0, -5, 0],
            }
          : {}
      }
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }
      }}
    >
      {/* Brilho animado de fundo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-sanders-blue/5 to-transparent rounded-lg -z-10"
        animate={{
          x: ["-100%", "200%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.3
        }}
      />
      
      <motion.h3 
        className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-sanders-blue to-blue-600 bg-clip-text text-transparent"
        style={{
          opacity: useTransform(scrollYProgress, [start, end], [0.6, 1])
        }}
        whileHover={{ scale: 1.02, x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-lg text-gray-700 leading-relaxed border-l-4 border-sanders-blue pl-6 py-2"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
};

// Componente do Modelo 3D
function Model({ modelPath }: { modelPath: string }) {
  const gltf: any = useGLTF(modelPath);
  const { scene } = gltf;
  const modelRef = useRef<THREE.Group>(null!);
  const initializedRef = useRef(false);

  // Centraliza e escala o modelo UMA VEZ APENAS
  useEffect(() => {
    if (!modelRef.current || initializedRef.current) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim;
    modelRef.current.scale.setScalar(scale);
    modelRef.current.position.copy(center).multiplyScalar(-scale);
    
    initializedRef.current = true;
  }, [scene]);

  // Rotação automática suave
  useFrame((state) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

const ProdutoDetalhesIndividual = () => {
  const { id } = useParams<{ id: string }>();
  const { isChatModalOpen, setIsChatModalOpen } = useChatContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [hasEnteredSection, setHasEnteredSection] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const internalProgress = useMotionValue(0);

  const produto = id ? getProdutoById(id) : null;
  const specs = produto?.specifications ? Object.entries(produto.specifications) : [];

  // Atualiza o percentual
  useEffect(() => {
    const unsubscribe = internalProgress.on('change', (latest) => {
      setProgressPercent(Math.round(latest * 100));
    });
    return unsubscribe;
  }, [internalProgress]);

  // Detecta quando entrar na seção
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEnteredSection) {
          setIsLocked(true);
          setHasEnteredSection(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasEnteredSection]);

  // Controla o scroll interno com velocidade ajustada
  useEffect(() => {
    if (!isLocked) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Velocidade mais suave
      const delta = e.deltaY * 0.0012;
      const current = internalProgress.get();
      const newValue = Math.max(0, Math.min(1, current + delta));
      
      internalProgress.set(newValue);
      
      // Libera quando chegar ao fim
      if (newValue >= 0.98 && delta > 0) {
        setTimeout(() => {
          setIsLocked(false);
        }, 300);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.002;
      const current = internalProgress.get();
      const newValue = Math.max(0, Math.min(1, current + delta));
      
      internalProgress.set(newValue);
      touchStartY = touchY;
      
      // Libera quando chegar ao fim
      if (newValue >= 0.98 && delta > 0) {
        setTimeout(() => {
          setIsLocked(false);
        }, 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, internalProgress]);

  if (!produto) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button asChild>
            <Link to="/produtos">Voltar aos Produtos</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-white/70 backdrop-blur-md sticky top-0 z-20 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
            <span>/</span>
            <Link to="/produtos" className="hover:text-foreground transition-colors">Produtos</Link>
            <span>/</span>
            <span className="text-foreground">{produto.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
          <Button 
            variant="ghost" 
            asChild 
          className="mb-6"
          >
            <Link to="/produtos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Produtos
            </Link>
          </Button>

        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline">
                {produto.category === "hospitalares" ? "Hospitalares" : "Odontológicos"}
              </Badge>
              {produto.novo && (
                <Badge className="bg-sanders-success">Novo</Badge>
              )}
            </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {produto.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {produto.description}
          </p>
        </div>
            </motion.div>

      {/* Seção Principal: Modelo + Especificações */}
      <div ref={containerRef} className="relative min-h-screen py-16">
        {/* Dica de Scroll no Topo */}
        {isLocked && progressPercent < 10 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-sanders-blue/60 font-medium">
                Role para explorar
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-sanders-blue/60 to-transparent"></div>
            </div>
          </motion.div>
        )}
        
        {/* Indicador de Progresso */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3"
          >
            <div className="bg-white/95 backdrop-blur-lg border-2 border-sanders-blue/40 rounded-full p-4 shadow-2xl">
              <svg className="w-8 h-8 text-sanders-blue animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="bg-white/95 backdrop-blur-lg border-2 border-sanders-blue/40 rounded-full px-5 py-2 shadow-xl">
              <span className="text-base font-bold text-sanders-blue">
                {progressPercent}%
              </span>
            </div>
            <motion.p 
              className="text-sm text-gray-700 bg-white/95 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg font-medium"
              animate={{ scale: progressPercent >= 98 ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              {progressPercent < 98 ? 'Role para ver mais' : '✓ Pronto! Continue'}
            </motion.p>
          </motion.div>
        )}
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
          {/* Modelo 3D - Lado Esquerdo - Sticky */}
          {produto.gallery?.[0]?.endsWith('.glb') && (
            <div className="sticky top-24 h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-white shadow-2xl">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, 5, -5]} intensity={0.8} />
                <directionalLight position={[0, -5, 0]} intensity={0.4} />
                <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={1} castShadow />
                <Model modelPath={produto.gallery[0]} />
                <ContactShadows 
                  opacity={0.4} 
                  scale={15} 
                  blur={2.5} 
                  far={10} 
                  resolution={256} 
                  color="#000000" 
                />
              </Canvas>
            </div>
          )}

          {/* Especificações - Lado Direito - Textos Animados com Scroll */}
          <div 
            className="space-y-8"
            style={{ perspective: "1000px" }}
          >
            {specs.map(([key, value], index) => (
              <SpecCard
                key={key}
                title={key}
                value={value}
                index={index}
                totalCards={specs.length}
                scrollYProgress={internalProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features & CTA com Animação de Scroll 3D */}
      <div className="bg-white overflow-hidden pb-32 pt-16">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-sanders-blue to-blue-600 bg-clip-text text-transparent">
          Características Principais
        </h2>
        
        <ContainerScroll
          titleComponent={<></>}
        >
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 h-full overflow-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {produto.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/80 hover:bg-white transition-all hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sanders-blue to-blue-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                  <span className="text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 text-lg h-14"
                onClick={() => setIsChatModalOpen(true)}
              >
                Solicitar Cotação
              </Button>
              <Button variant="outline" size="lg" className="flex-1 text-lg h-14" asChild>
                <Link to="/contato">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </ContainerScroll>
      </div>

      <Footer />
      
      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
      </div>
    </ReactLenis>
  );
};

export default ProdutoDetalhesIndividual;
