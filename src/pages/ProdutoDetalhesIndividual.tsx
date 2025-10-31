import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProdutoById } from "@/data/produtos";

// Componente do Modelo 3D
function Model({ modelPath }: { modelPath: string }) {
  const gltf: any = useGLTF(modelPath);
  const { scene } = gltf;
  const modelRef = useRef<THREE.Group>(null!);
  const initializedRef = useRef(false);

  // Centraliza e escala o modelo
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

  // Rotação suave
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
  const produto = id ? getProdutoById(id) : null;

  if (!produto) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Modelo 3D no centro com container transparente */}
      <div className="flex-1 w-full flex items-center justify-center py-16">
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ alpha: true, antialias: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, 5, -5]} intensity={0.8} />
            <directionalLight position={[0, -5, 0]} intensity={0.4} />
            <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={1} castShadow />
            <Model modelPath="/Termodesinfectora WDS-380SD.glb" />
          </Canvas>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProdutoDetalhesIndividual;
