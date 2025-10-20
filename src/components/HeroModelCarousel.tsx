import React, { useState, Suspense, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import * as THREE from 'three';
import anime from 'animejs';

// Preload dos modelos para carregar mais rápido
useGLTF.preload('/Autoclave Stericlean_12_D.glb');
useGLTF.preload('/SeladoraPecksel.glb');
useGLTF.preload('/Termodesinfectora WDS-380SD.glb');

// Dados dos modelos 3D
const models = [
  {
    id: 'autoclave',
    name: 'Autoclave Stericlean 12D',
    path: '/Autoclave Stericlean_12_D.glb',
    description: 'Autoclave de alta performance para esterilização'
  },
  {
    id: 'seladora',
    name: 'Seladora Pecksel',
    path: '/SeladoraPecksel.glb',
    description: 'Seladora profissional para embalagens médicas'
  },
  {
    id: 'termodesinfectora',
    name: 'Termodesinfectora WDS-380SD',
    path: '/Termodesinfectora WDS-380SD.glb',
    description: 'Termodesinfectora automática de alta capacidade'
  }
];

// Componente do modelo 3D
// Componente de iluminação profissional - memoizado
const ProfessionalLighting = memo(() => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        color="#FFDDC9"
        position={[5, 5, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight 
        color="#FFFFFF"
        position={[-5, 3, 5]}
        intensity={0.8}
      />
      <directionalLight 
        color="#FFFFFF"
        position={[0, 2, -10]}
        intensity={1.5}
      />
      <Environment preset="studio" blur={0.5} />
    </>
  );
});

function Model({ modelPath, resetTrigger }: { 
  modelPath: string; 
  resetTrigger: number;
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

// Componente principal do carrossel
interface HeroModelCarouselProps {
  className?: string;
}

const HeroModelCarousel: React.FC<HeroModelCarouselProps> = ({ className = '' }) => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentModel = models[currentModelIndex];

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
            shadows
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
              powerPreference: "high-performance",
              pixelRatio: Math.min(window.devicePixelRatio, 2)
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            frameloop="always"
          >
            {/* Iluminação Profissional */}
            <ProfessionalLighting />
            
            {/* Modelo 3D */}
            <Model 
              modelPath={currentModel.path} 
              resetTrigger={resetTrigger}
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