import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import * as THREE from 'three';
import anime from 'animejs';

// Dados dos modelos 3D com especificações detalhadas
const models = [
  {
    id: 'autoclave',
    name: 'Autoclave Stericlean 12D',
    path: '/Autoclave Stericlean_12_D.glb',
    description: 'Autoclave de alta performance para esterilização',
    specifications: [
      {
        angle: 0, // Frente
        title: 'Capacidade',
        items: ['12 litros', 'Até 6 bandejas', 'Ciclo rápido 15min']
      },
      {
        angle: 90, // Lado direito
        title: 'Tecnologia',
        items: ['Vácuo pulsante', 'Secagem automática', 'Display digital']
      },
      {
        angle: 180, // Traseira
        title: 'Segurança',
        items: ['Trava automática', 'Sensor de pressão', 'Alarme sonoro']
      },
      {
        angle: 270, // Lado esquerdo
        title: 'Dimensões',
        items: ['45x35x60 cm', '220V/110V', 'Peso: 28kg']
      }
    ]
  },
  {
    id: 'seladora',
    name: 'Seladora Pecksel',
    path: '/SeladoraPecksel.glb',
    description: 'Seladora profissional para embalagens médicas',
    specifications: [
      {
        angle: 0, // Frente
        title: 'Performance',
        items: ['Selagem 300mm', 'Velocidade 12m/min', 'Temperatura ajustável']
      },
      {
        angle: 90, // Lado direito
        title: 'Controles',
        items: ['Painel digital', 'Timer automático', 'Pressão regulável']
      },
      {
        angle: 180, // Traseira
        title: 'Materiais',
        items: ['Papel grau médico', 'Filmes plásticos', 'Tyvek compatível']
      },
      {
        angle: 270, // Lado esquerdo
        title: 'Especificações',
        items: ['40x30x25 cm', '110V/220V', 'Peso: 15kg']
      }
    ]
  },
  {
    id: 'termodesinfectora',
    name: 'Termodesinfectora WDS-380SD',
    path: '/Termodesinfectora WDS-380SD.glb',
    description: 'Termodesinfectora automática de alta capacidade',
    specifications: [
      {
        angle: 0, // Frente
        title: 'Capacidade',
        items: ['380 litros', 'Carga até 50kg', 'Múltiplos ciclos']
      },
      {
        angle: 90, // Lado direito
        title: 'Ciclos',
        items: ['Desinfecção 93°C', 'Lavagem intensiva', 'Secagem térmica']
      },
      {
        angle: 180, // Traseira
        title: 'Automação',
        items: ['Sistema PLC', 'Dosagem automática', 'Relatórios digitais']
      },
      {
        angle: 270, // Lado esquerdo
        title: 'Instalação',
        items: ['120x80x180 cm', '380V trifásico', 'Peso: 450kg']
      }
    ]
  }
];

// Componente do modelo 3D
// Componente de iluminação profissional
function ProfessionalLighting() {
  return (
    <>
      {/* A luz ambiente previne que as sombras fiquem 100% pretas.
        Com um bom Environment, ela pode ter intensidade baixa.
      */}
      <ambientLight intensity={0.2} />

      {/* Luz Principal (Key Light): Forte, vindo da direita/frente, cria as sombras principais.
        A cor levemente quente (#FFDDC9) simula uma lâmpada de estúdio.
      */}
      <directionalLight 
        color="#FFDDC9"
        position={[5, 5, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048} // Maior resolução para sombras mais nítidas
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001} // Ajuste fino para evitar artefatos na sombra
      />

      {/* Luz de Preenchimento (Fill Light): Mais fraca, do lado oposto, para suavizar as sombras.
        Não precisa gerar sombras para não sobrecarregar e criar sombras duplas.
      */}
      <directionalLight 
        color="#FFFFFF"
        position={[-5, 3, 5]}
        intensity={0.8}
      />

      {/* Luz de Contorno (Rim Light): Vem de trás para destacar as bordas do modelo.
      */}
      <directionalLight 
        color="#FFFFFF"
        position={[0, 2, -10]}
        intensity={1.5}
      />

      {/* 
        O Environment é CRUCIAL. Ele usa uma imagem HDRI para criar reflexos realistas.
        'studio' é ótimo para produtos. Outras opções: 'city', 'apartment', 'sunset'.
      */}
      <Environment preset="studio" blur={0.5} />
    </>
  );
}

function Model({ modelPath, resetTrigger, onRotationChange }: { 
  modelPath: string; 
  resetTrigger: number;
  onRotationChange?: (angle: number) => void;
}) {
  const gltf: any = useGLTF(modelPath);
  const { scene } = gltf;
  const modelRef = useRef<THREE.Group>();
  const innerGroupRef = useRef<THREE.Group>();
  const { camera } = useThree();

  // Rotação automática suave no eixo central do modelo
  useFrame((state) => {
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.y += 0.005;
      
      // Converte radianos para graus e normaliza para 0-360
      const degrees = (innerGroupRef.current.rotation.y * 180 / Math.PI) % 360;
      const normalizedDegrees = degrees < 0 ? degrees + 360 : degrees;
      
      // Chama callback com o ângulo atual
      if (onRotationChange) {
        onRotationChange(normalizedDegrees);
      }
    }
  });

  // Reset da posição quando resetTrigger muda
  useEffect(() => {
    if (innerGroupRef.current && resetTrigger > 0) {
      // Reset da rotação com animação mais suave
      anime({
        targets: innerGroupRef.current.rotation,
        x: 0,
        y: 0,
        z: 0,
        duration: 600,
        easing: 'easeOutQuart'
      });

      // Reset da posição da câmera com animação mais suave
      anime({
        targets: camera.position,
        x: 4,
        y: 4,
        z: 4,
        duration: 600,
        easing: 'easeOutQuart'
      });
    }
  }, [resetTrigger, camera]);

  // Clona e prepara a cena
  const clonedScene = scene.clone();
  
  // Ajusta escala baseado no modelo
  let scale = 1;
  let position: [number, number, number] = [0, -1, 0];
  
  if (modelPath.includes('Autoclave')) {
    scale = 0.8;
    position = [0, -1, 0];
  } else if (modelPath.includes('Seladora')) {
    scale = 0.4;
    position = [0, -1, 0];
  } else if (modelPath.includes('Termodesinfectora')) {
    scale = 0.5;
    position = [0, -2.0, 0]; // Descido mais um pouco
  }

  return (
    <group ref={modelRef} scale={[scale, scale, scale]} position={position}>
      <group ref={innerGroupRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

// Componente de controles da câmera
function CameraControls({ onReset }: { onReset: () => void }) {
  const controlsRef = useRef<any>();

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      minDistance={1}
      maxDistance={15}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.6}
      zoomSpeed={0.8}
      autoRotate={false}
    />
  );
}

// Componente de cards de especificações
interface SpecificationCardProps {
  title: string;
  items: string[];
  isVisible: boolean;
  position: 'left' | 'right' | 'top' | 'bottom';
}

const SpecificationCard: React.FC<SpecificationCardProps> = ({ 
  title, 
  items, 
  isVisible, 
  position 
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-4 top-1/2 -translate-y-1/2';
      case 'right':
        return 'right-4 top-1/2 -translate-y-1/2';
      case 'top':
        return 'top-4 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'bottom-8 left-1/2 -translate-x-1/2';
      default:
        return 'left-4 top-1/2 -translate-y-1/2';
    }
  };

  const getAnimationClasses = () => {
    if (!isVisible) return 'opacity-0 scale-90 translate-y-4 pointer-events-none';
    return 'opacity-100 scale-100 translate-y-0';
  };

  return (
    <div 
      className={`absolute z-20 ${getPositionClasses()} transition-all duration-700 ease-out ${getAnimationClasses()}`}
    >
      <div className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-xl p-3 shadow-[0_8px_32px_rgba(31,38,135,0.25)] max-w-[280px] min-w-[240px]">
        <div className="absolute inset-0 bg-gradient-to-br from-sanders-blue/5 to-transparent rounded-xl"></div>
        <div className="relative">
          <h3 className="text-sanders-blue font-semibold text-base mb-2 drop-shadow-sm tracking-wide">
            {title}
          </h3>
          <ul className="space-y-1.5">
            {items.map((item, index) => (
              <li 
                key={index}
                className="text-gray-700 text-xs font-medium flex items-start leading-relaxed"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                }}
              >
                <div className="w-1.5 h-1.5 bg-sanders-blue rounded-full mr-2 mt-1.5 flex-shrink-0 shadow-sm"></div>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Componente principal do carrossel
interface HeroModelCarouselProps {
  className?: string;
}

const HeroModelCarousel: React.FC<HeroModelCarouselProps> = ({ className = '' }) => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentRotationAngle, setCurrentRotationAngle] = useState(0);

  const currentModel = models[currentModelIndex];

  // Função para determinar qual especificação mostrar baseado no ângulo
  const getCurrentSpecification = () => {
    if (!currentModel.specifications) return null;
    
    // Encontra a especificação mais próxima do ângulo atual
    const targetAngles = [0, 90, 180, 270];
    let closestAngle = targetAngles[0];
    let minDifference = Math.abs(currentRotationAngle - targetAngles[0]);
    
    targetAngles.forEach(angle => {
      const difference = Math.min(
        Math.abs(currentRotationAngle - angle),
        Math.abs(currentRotationAngle - angle + 360),
        Math.abs(currentRotationAngle - angle - 360)
      );
      
      if (difference < minDifference) {
        minDifference = difference;
        closestAngle = angle;
      }
    });
    
    // Só mostra o card se estiver próximo o suficiente (dentro de 30 graus)
    if (minDifference > 30) return null;
    
    const specIndex = targetAngles.indexOf(closestAngle);
    return currentModel.specifications[specIndex];
  };

  // Função para determinar a posição do card baseado no ângulo
  const getCardPosition = (): 'left' | 'right' | 'top' | 'bottom' => {
    // Todos os cards aparecem sempre abaixo do modelo
    return 'bottom';
  };

  const handleRotationChange = (angle: number) => {
    setCurrentRotationAngle(angle);
  };

  // Função para navegar para o próximo modelo
  const nextModel = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentModelIndex((prev) => (prev + 1) % models.length);
    setResetTrigger(prev => prev + 1);
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Função para navegar para o modelo anterior
  const prevModel = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentModelIndex((prev) => (prev - 1 + models.length) % models.length);
    setResetTrigger(prev => prev + 1);
    
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Canvas 3D sem container - direto na página */}
      <div className="relative h-[450px] w-full">
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-sanders-blue border-t-transparent mx-auto mb-4"></div>
              <p className="text-sm font-medium text-sanders-blue">Carregando modelo 3D...</p>
            </div>
          </div>
        }>
          <Canvas
            shadows // ESSENCIAL: Habilita o cálculo de sombras na cena
            camera={{ 
              position: [4, 4, 4], 
              fov: 60,
              near: 0.1,
              far: 100
            }}
            style={{ height: '100%', width: '100%' }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            {/* Iluminação Profissional */}
            <ProfessionalLighting />
            
            {/* Modelo 3D */}
            <Model 
              modelPath={currentModel.path} 
              resetTrigger={resetTrigger}
              onRotationChange={handleRotationChange}
            />
            
            {/* Controles da câmera */}
            <CameraControls onReset={handleReset} />
            
            {/* Sombras de contato mais próximas */}
            <ContactShadows 
              position={[0, -0.9, 0]} 
              opacity={0.5} 
              scale={8} 
              blur={1.5} 
              far={3} 
            />
          </Canvas>
        </Suspense>

        {/* Cards de especificações */}
        {(() => {
          const currentSpec = getCurrentSpecification();
          if (!currentSpec) return null;
          
          return (
            <SpecificationCard
              title={currentSpec.title}
              items={currentSpec.items}
              isVisible={true}
              position={getCardPosition()}
            />
          );
        })()}

        {/* Controles de navegação */}
        <div className="absolute inset-y-0 left-4 flex items-center z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevModel}
            disabled={isTransitioning}
            className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:from-white/30 hover:via-white/20 hover:to-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.37)] hover:shadow-[0_12px_40px_rgba(31,38,135,0.5)] transition-all duration-300 hover:scale-105 rounded-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-transparent before:opacity-50 before:blur-sm relative overflow-hidden"
          >
            <ChevronLeft className="h-5 w-5 text-sanders-blue drop-shadow-lg relative z-10" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={nextModel}
            disabled={isTransitioning}
            className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border border-white/30 hover:from-white/30 hover:via-white/20 hover:to-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.37)] hover:shadow-[0_12px_40px_rgba(31,38,135,0.5)] transition-all duration-300 hover:scale-105 rounded-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-transparent before:opacity-50 before:blur-sm relative overflow-hidden"
          >
            <ChevronRight className="h-5 w-5 text-sanders-blue drop-shadow-lg relative z-10" />
          </Button>
        </div>

        {/* Overlay de transição removido - sem blur */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-sanders-blue border-t-transparent opacity-80"></div>
          </div>
        )}
      </div>

      {/* Informações do modelo atual removidas */}
    </div>
  );
};

export default HeroModelCarousel;