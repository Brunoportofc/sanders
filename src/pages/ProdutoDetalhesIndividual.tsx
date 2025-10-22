import { useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from "framer-motion";
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
  // Animação vindo da direita com base no scroll - mais rápida
  const progress = (index + 1) / totalCards;
  
  // Reduzindo o range para completar a animação mais cedo (0.6 ao invés de 1)
  const x = useTransform(
    scrollYProgress,
    [Math.max(0, progress - 0.15) * 0.6, progress * 0.6],
    [200, 0]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, progress - 0.15) * 0.6, (progress - 0.05) * 0.6, progress * 0.6],
    [0, 0.5, 1]
  );

  return (
    <motion.div
      className="mb-8"
      style={{ x, opacity }}
    >
      <h3 className="text-3xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-sanders-blue to-blue-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-sanders-blue pl-6">
        {value}
      </p>
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

  const produto = id ? getProdutoById(id) : null;
  const specs = produto?.specifications ? Object.entries(produto.specifications) : [];

  // Hook de scroll progress para animação dos cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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
      <div ref={containerRef} className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Modelo 3D - Lado Esquerdo - Sticky */}
          {produto.gallery?.[0]?.endsWith('.glb') && (
            <div className="sticky top-24 h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-white shadow-2xl">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <directionalLight position={[-10, -10, -5]} intensity={0.6} />
                <Model modelPath={produto.gallery[0]} />
                <Environment preset="studio" />
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
          <div className="space-y-12">
            {specs.map(([key, value], index) => (
              <SpecCard
                key={key}
                title={key}
                value={value}
                index={index}
                totalCards={specs.length}
                scrollYProgress={scrollYProgress}
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
