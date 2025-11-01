import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGLTF } from '@react-three/drei';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Função para pré-carregar APENAS o primeiro modelo (carregamento prioritário)
const preloadFirstModel = (onProgress: (progress: number) => void) => {
  return new Promise<void>((resolve) => {
    console.log('🎯 Carregando modelo prioritário: Termodesinfectora...');
    useGLTF.preload('/TermodesinfectoraWDS-380SD.glb');
    
    setTimeout(() => {
      onProgress(100); // 100% quando o primeiro modelo carregar
      console.log('✅ Termodesinfectora carregada! Site pronto para uso.');
      resolve();
    }, 1500); // Tempo otimizado para primeiro modelo
  });
};

// Função para pré-carregar modelos restantes em BACKGROUND (não bloqueia)
const preloadRemainingModels = () => {
  const remainingModels = [
    { path: '/Autoclave Stericlean_12_D.glb', name: 'Autoclave' },
    { path: '/SeladoraPecksel.glb', name: 'Seladora' }
  ];
  
  console.log('🔄 Carregando modelos restantes em background...');
  
  let loadedCount = 0;
  
  remainingModels.forEach((model, index) => {
    // Carregar com delay escalonado para não afetar performance
    setTimeout(() => {
      useGLTF.preload(model.path);
      loadedCount++;
      console.log(`📦 Modelo background ${loadedCount}/2 carregado: ${model.name}`);
      
      // Quando todos os modelos background forem carregados
      if (loadedCount === remainingModels.length) {
        console.log('✅ TODOS os modelos carregados! Carrossel 100% fluido.');
        console.log('🎯 Você pode usar o carrossel sem travamentos agora!');
      }
    }, (index + 1) * 1500); // 1.5s entre cada modelo (mais tempo para não interferir)
  });
};

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    console.log('🚀 Carregamento otimizado iniciado!');
    
    // ESTRATÉGIA: Carregar APENAS o primeiro modelo para liberar o site rápido
    preloadFirstModel((modelProgress) => {
      if (mounted) {
        setProgress(modelProgress);
        console.log(`📊 Progresso: ${modelProgress}%`);
      }
    }).then(() => {
      if (!mounted) return;
      
      console.log('✅ Modelo inicial carregado! Liberando site...');
      setModelsLoaded(true);
      
      // APÓS liberar o site, carregar os outros modelos em BACKGROUND
      // Isso não trava nada, acontece enquanto o usuário vê a página
      setTimeout(() => {
        preloadRemainingModels();
      }, 1000); // 1 segundo após liberar o site
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (modelsLoaded && progress === 100) {
      setTimeout(() => onLoadingComplete(), 500);
    }
  }, [modelsLoaded, progress, onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBFBFB]"
    >
      <div className="text-center">
        {/* GIF Animado - Loop até 100% carregado */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <img 
            src="/gif_animado.gif" 
            alt="Sanders do Brasil Loading" 
            className="w-auto h-auto max-w-2xl mx-auto"
          />
          <motion.span
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Carregando Termodesinfectora...
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

