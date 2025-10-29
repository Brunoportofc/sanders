/**
 * 🚀 CARROSSEL 3D ULTRA-FLUIDO - VERSÃO OTIMIZADA
 * 
 * ESTRATÉGIA MÁXIMA PERFORMANCE:
 * 1. ✅ TODOS os modelos renderizados simultaneamente em memória
 * 2. ✅ Pré-carregamento automático com useGLTF.preload()
 * 3. ✅ Alternância instantânea por visibilidade (visible={true/false})
 * 4. ✅ Rotação apenas no modelo visível (economia de CPU)
 * 5. ✅ Transição de 100ms para bloqueio de cliques rápidos
 * 6. ✅ Zero lag ao trocar modelos (keep-alive pattern)
 * 7. ✅ OrbitControls para interação do usuário
 */

import React, { useState, Suspense, useRef, useEffect, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, ContactShadows, OrbitControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// Pré-carregamento dos modelos
useGLTF.preload('/Termodesinfectora WDS-380SD.glb');
useGLTF.preload('/Autoclave Stericlean_12_D.glb');
useGLTF.preload('/SeladoraPecksel.glb');

// Dados dos modelos
const models = [
  {
    id: 'termodesinfectora',
    name: 'Termodesinfectora WDS-380SD',
    path: '/Termodesinfectora WDS-380SD.glb',
    scale: 0.5,
    position: [0, -2.0, 0] as [number, number, number]
  },
  {
    id: 'autoclave',
    name: 'Autoclave Stericlean 12D',
    path: '/Autoclave Stericlean_12_D.glb',
    scale: 0.8,
    position: [0, -1, 0] as [number, number, number]
  },
  {
    id: 'seladora',
    name: 'Seladora Pecksel',
    path: '/SeladoraPecksel.glb',
    scale: 0.3,
    position: [0, -1, 0] as [number, number, number]
  }
];

// Iluminação otimizada
const Lighting = memo(() => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
    <directionalLight position={[-5, 3, 5]} intensity={0.6} />
    <hemisphereLight intensity={0.5} />
  </>
));

// Modelo 3D com rotação infinita - Versão otimizada
function Model({ 
  modelPath, 
  scale, 
  position,
  isVisible 
}: { 
  modelPath: string;
  scale: number;
  position: [number, number, number];
  isVisible: boolean;
}) {
  const gltf: any = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  // Rotação contínua apenas quando visível
  useFrame(() => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += 0.01; // Rotação suave
    }
  });

  // Escala responsiva
  const viewportScale = Math.min(1.8, Math.max(1, size.width / 1280));
  const finalScale = scale * viewportScale;

  return (
    <group 
      ref={groupRef} 
      scale={finalScale} 
      position={position}
      visible={isVisible}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

// Componente principal
interface HeroModelCarouselProps {
  className?: string;
}

const HeroModelCarousel: React.FC<HeroModelCarouselProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentModel = models[currentIndex];

  const nextModel = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % models.length);
    setTimeout(() => setIsTransitioning(false), 100); // Transição instantânea
  };

  const prevModel = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + models.length) % models.length);
    setTimeout(() => setIsTransitioning(false), 100); // Transição instantânea
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full" style={{ height: 'clamp(360px, 52vh, 900px)' }}>
        <Suspense fallback={
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sanders-blue border-t-transparent"></div>
          </div>
        }>
          <Canvas
            shadows
            camera={{ position: [4, 4, 4], fov: 48 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
            frameloop="always"
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <Lighting />
            
            {/* Renderiza TODOS os modelos simultaneamente - apenas alterna visibilidade */}
            {models.map((model, index) => (
              <Model 
                key={model.id}
                modelPath={model.path}
                scale={model.scale}
                position={model.position}
                isVisible={index === currentIndex}
              />
            ))}
            
            <ContactShadows 
              position={[0, -0.9, 0]} 
              opacity={0.4} 
              scale={8} 
              blur={2} 
            />

            {/* Controles de órbita para interação */}
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </Suspense>

        {/* Botão Anterior */}
        <div className="absolute inset-y-0 left-4 flex items-center z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevModel}
            disabled={isTransitioning}
            className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5 text-sanders-blue" />
          </Button>
        </div>

        {/* Botão Próximo */}
        <div className="absolute inset-y-0 right-4 flex items-center z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={nextModel}
            disabled={isTransitioning}
            className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-5 w-5 text-sanders-blue" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroModelCarousel;
