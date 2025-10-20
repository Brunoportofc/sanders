import { useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import anime from "animejs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModal from "@/components/ChatModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { getProdutoById } from "@/data/produtos";
import { useChatContext } from "@/contexts/ChatContext";

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
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const produto = id ? getProdutoById(id) : null;
  const specs = produto?.specifications ? Object.entries(produto.specifications) : [];

  // Animação com Anime.js baseada no scroll
  useEffect(() => {
    if (specs.length === 0) return;
    
    let observer: IntersectionObserver | null = null;
    
    // Pequeno delay para garantir que os refs estejam prontos
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
              entry.target.classList.add('animated');
              
              const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
              
              anime({
                targets: entry.target,
                translateX: [100, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: index >= 0 ? index * 100 : 0,
                easing: 'easeOutExpo'
              });
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
      );

      cardsRef.current.forEach((card) => {
        if (card && observer) observer.observe(card);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [specs.length]);

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
      <div className="container mx-auto px-4 py-12">
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
            </div>

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

          {/* Cards de Especificações - Lado Direito - Liquid Glass Style */}
          <div className="space-y-8">
            {specs.map(([key, value], index) => (
              <div
                  key={key}
                  ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="card-spec opacity-0 translate-x-[100px] group h-auto [perspective:1000px]"
                style={{ minHeight: '200px' }}
              >
                <div className="relative h-full rounded-[40px] bg-gradient-to-br from-white to-gray-50 shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.1)_30px_50px_25px_-40px,rgba(0,0,0,0.05)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,15deg)]">
                  {/* Glass layer */}
                  <div className="absolute inset-2 rounded-[45px] border-b border-l border-white/50 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md [transform-style:preserve-3d] [transform:translate3d(0,0,20px)]"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center p-8 [transform:translate3d(0,0,25px)]">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-sanders-blue to-blue-600 bg-clip-text text-transparent">
                      {key}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>

      {/* Features & CTA */}
      <div className="bg-white py-24 px-4 mt-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 max-w-5xl mx-auto shadow-2xl border border-blue-100">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-sanders-blue to-blue-600 bg-clip-text text-transparent">
              Características Principais
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
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
        </div>
                    </div>

      <Footer />
      
      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
};

export default ProdutoDetalhesIndividual;
