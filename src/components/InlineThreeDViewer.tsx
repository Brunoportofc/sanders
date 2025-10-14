import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, useAnimations } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Eye, RotateCcw, Settings } from 'lucide-react';
import * as THREE from 'three';
import anime from 'animejs';

function Model({ resetTrigger, isRotating, modelPath }: { resetTrigger: number; isRotating: boolean; modelPath: string }) {
  const gltf: any = useGLTF(modelPath);
  const { scene, animations } = gltf;
  const modelRef = useRef<THREE.Group>();
  const { camera } = useThree();
  const { actions, names } = useAnimations(animations || [], scene as any);
  const primaryClipNameRef = useRef<string | null>(null);

  // Calcular bounding box para posicionamento correto
  useEffect(() => {
    if (scene && modelRef.current) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Ajustar escala baseada no tamanho
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.2 / maxDim; // Tamanho aumentado para hero section
      modelRef.current.scale.setScalar(scale);
      
      // Centralizar o modelo completamente - resetar posições
      scene.position.set(0, 0, 0);
      modelRef.current.position.copy(center).multiplyScalar(-1);
      
      // Forçar atualização da matriz
      modelRef.current.updateMatrixWorld(true);
    }
  }, [scene]);

  // Garantir centralização contínua do modelo
  useEffect(() => {
    if (modelRef.current && scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      // Aplicar a mesma lógica de centralização do carregamento inicial
      scene.position.set(0, 0, 0);
      modelRef.current.position.copy(center).multiplyScalar(-1);
      modelRef.current.updateMatrixWorld(true);
    }
  }, [resetTrigger, scene]);

  // Animação de reset suave
  useEffect(() => {
    if (resetTrigger > 0 && modelRef.current) {
      anime({
        targets: modelRef.current.rotation,
        x: 0,
        y: 0,
        z: 0,
        duration: 1000,
        easing: 'easeOutCubic'
      });
    }
  }, [resetTrigger]);

  // Rotação suave contínua (controlada por estado)
  useFrame(() => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  // Preparar e tocar a animação da porta em loop ping-pong
  useEffect(() => {
    if (!actions || !names || names.length === 0) return;
    const chosen = names.find((n: string) => /door|porta|open|abrir/i.test(n)) || names[0];
    primaryClipNameRef.current = chosen;
    const action = actions[chosen];
    if (action) {
      action.reset();
      action.enabled = true;
      action.paused = false;
      (action as any).clampWhenFinished = false;
      action.setLoop(THREE.LoopPingPong, Infinity);
      (action as any).timeScale = 1;
      action.play();
    }
  }, [actions, names]);

  const handleClickOnlyDoor = (e: any) => {
    e.stopPropagation();
    let node: THREE.Object3D | null = e.object as THREE.Object3D;
    let matched = false;
    while (node) {
      if (node.name && /door|porta/i.test(node.name)) { matched = true; break; }
      node = node.parent as THREE.Object3D | null;
    }
    if (matched && primaryClipNameRef.current && actions) {
      const action = actions[primaryClipNameRef.current];
      if (action) {
        action.reset();
        action.play();
      }
    }
  };

  return (
    <group ref={modelRef}>
      <primitive object={scene} onClick={handleClickOnlyDoor} />
    </group>
  );
}

// Componente para controles de câmera apenas Three.js
function CameraControlsOnly({ onReset }: { onReset: () => void }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>();

  const handleReset = () => {
    if (controlsRef.current) {
      anime({
        targets: camera.position,
        x: 4,
        y: 4,
        z: 4,
        duration: 800,
        easing: 'easeOutCubic',
        complete: () => {
          controlsRef.current?.reset();
          onReset();
        }
      });
    }
  };

  // Expor funções para uso externo e limpar no unmount
  useEffect(() => {
    if (controlsRef.current) {
      (window as any).cameraControls = {
        reset: handleReset
      };
    }
    return () => {
      if ((window as any).cameraControls) {
        delete (window as any).cameraControls;
      }
    };
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false} // Desabilitar pan para container menor
      enableRotate={true}
      minDistance={2}
      maxDistance={8}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI - Math.PI / 6}
      enableDamping={true}
      dampingFactor={0.08}
      rotateSpeed={0.6}
      
      autoRotate={false}
    />
  );
}

interface InlineThreeDViewerProps {
  isActive: boolean;
  onClose?: () => void;
  modelPath?: string;
}

const InlineThreeDViewer: React.FC<InlineThreeDViewerProps> = ({ isActive, onClose, modelPath = '/Termodesinfectora WDS-380SD.glb' }) => {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [canvasKey, setCanvasKey] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (isActive && containerRef.current) {
      // Animação de entrada
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 600,
        easing: 'easeOutCubic'
      });
    }
  }, [isActive]);

  // Forçar remontagem do Canvas a cada abertura para evitar estado residual
  useEffect(() => {
    if (isActive) {
      setCanvasKey((k) => k + 1);
    }
  }, [isActive]);

  // Clique fora do viewer retoma a rotação
  useEffect(() => {
    const handleDocPointerDown = (e: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsRotating(true);
      }
    };
    document.addEventListener('pointerdown', handleDocPointerDown, { capture: true });
    return () => document.removeEventListener('pointerdown', handleDocPointerDown, { capture: true } as any);
  }, []);

  if (!isActive) {
    return (
      <div className="text-center text-sanders-blue relative z-10">
        <Settings className="h-20 w-20 mx-auto mb-4 animate-float" />
        <p className="font-bold text-lg">Equipamentos Sanders</p>
        <p className="text-sm opacity-80">Tecnologia e Qualidade</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full" style={{ opacity: 0 }}>
      <Suspense fallback={
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sanders-blue border-t-transparent mx-auto mb-4"></div>
            <p className="text-sm font-medium text-sanders-blue">Carregando modelo 3D...</p>
          </div>
        </div>
      }>
        <Canvas 
          key={canvasKey}
          camera={{ 
            position: [2.8, 2.8, 2.8], 
            fov: 38,
            near: 0.1,
            far: 100
          }}
          style={{ height: '100%', width: '100%' }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          onPointerDown={() => setIsRotating(false)}
        >
          {/* Iluminação otimizada para container menor */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 3]} 
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-3, -3, -3]} intensity={0.3} />
          
          {/* Ambiente HDR */}
          <Environment preset="city" />
          
          {/* Modelo 3D */}
          <Model resetTrigger={resetTrigger} isRotating={isRotating} modelPath={modelPath} />
          
          {/* Sem plano de sombra para manter fundo 100% transparente */}
          
          {/* Controles apenas Three.js */}
          <CameraControlsOnly onReset={handleReset} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default InlineThreeDViewer;
