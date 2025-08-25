import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, useAnimations } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';
import anime from 'animejs';

function Model({ resetTrigger }: { resetTrigger: number }) {
  const gltf: any = useGLTF('/teste2 copy.glb');
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
      
      // Centralizar o modelo
      scene.position.copy(center).multiplyScalar(-1);
      
      // Ajustar escala baseada no tamanho
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3 / maxDim; // Ajuste este valor conforme necessário
      modelRef.current.scale.setScalar(scale);
    }
  }, [scene]);

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

  // Rotação suave contínua opcional (desabilitada por padrão)
  // useFrame((state) => {
  //   if (modelRef.current) {
  //     modelRef.current.rotation.y += 0.002; // Rotação suave automática
  //   }
  // });

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

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

// Componente para controles de câmera melhorados
function CameraControls({ onReset }: { onReset: () => void }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();

  const handleZoomIn = () => {
    anime({
      targets: camera,
      zoom: Math.min(camera.zoom * 1.2, 3),
      duration: 500,
      easing: 'easeOutCubic',
      update: () => camera.updateProjectionMatrix()
    });
  };

  const handleZoomOut = () => {
    anime({
      targets: camera,
      zoom: Math.max(camera.zoom * 0.8, 0.5),
      duration: 500,
      easing: 'easeOutCubic',
      update: () => camera.updateProjectionMatrix()
    });
  };

  const handleReset = () => {
    if (controlsRef.current) {
      anime({
        targets: camera.position,
        x: 5,
        y: 5,
        z: 5,
        duration: 1000,
        easing: 'easeOutCubic',
        complete: () => {
          controlsRef.current?.reset();
          onReset();
        }
      });
    }
  };

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={15}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.8}
        zoomSpeed={0.8}
        panSpeed={0.8}
      />
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          className="bg-white/90 backdrop-blur-sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          className="bg-white/90 backdrop-blur-sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="bg-white/90 backdrop-blur-sm"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

interface ThreeDViewerProps {
  trigger?: React.ReactNode;
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            variant="outline" 
            className="glass-effect hover-lift"
            size="lg"
          >
            <Eye className="h-5 w-5 mr-2" />
            Viewer 3D
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl h-[85vh] p-0">
        <DialogHeader className="p-4 bg-gradient-to-r from-sanders-blue to-sanders-blue-dark text-white">
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Viewer 3D - Equipamento Sanders
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative h-full bg-gradient-to-b from-gray-50 to-gray-100">
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-sanders-blue border-t-transparent mx-auto mb-6"></div>
                <p className="text-lg font-medium text-sanders-blue">Carregando modelo 3D...</p>
                <p className="text-sm text-muted-foreground mt-2">Preparando visualização interativa</p>
              </div>
            </div>
          }>
            <Canvas 
              camera={{ 
                position: [5, 5, 5], 
                fov: 50,
                near: 0.1,
                far: 1000
              }}
              style={{ height: '100%' }}
              shadows
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              {/* Iluminação melhorada */}
              <ambientLight intensity={0.4} />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              {/* Ambiente HDR */}
              <Environment preset="studio" />
              
              {/* Modelo 3D */}
              <Model resetTrigger={resetTrigger} />
              
              {/* Sombras de contato */}
              <ContactShadows 
                position={[0, -1, 0]} 
                opacity={0.4} 
                scale={10} 
                blur={2} 
                far={4} 
              />
              
              {/* Controles de câmera */}
              <CameraControls onReset={handleReset} />
            </Canvas>
          </Suspense>
          
          {/* Painel de informações */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
              <p className="font-medium text-sanders-blue">Controles:</p>
              <p>• Clique e arraste para rotacionar</p>
              <p>• Scroll para zoom</p>
              <p>• Botão direito para mover</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/teste2 copy.glb', '_blank')}
              className="bg-white/90 backdrop-blur-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreeDViewer;