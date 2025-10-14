import { cn } from "@/lib/utils"; 
import { useState, useEffect, useRef } from "react"; 
import UnicornScene from "unicornstudio-react"; 

export const useWindowSize = () => { 
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0, 
  }); 

  useEffect(() => { 
    const handleResize = () => { 
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight, 
      }); 
    }; 

    // Detectar mudanças de zoom através de visualViewport
    const handleVisualViewportResize = () => {
      if (window.visualViewport) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize); 
    
    // Adicionar listener para mudanças de zoom
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportResize);
    }
    
    // Call handler right away so state gets updated with initial window size 
    handleResize(); 

    // Remove event listener on cleanup 
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportResize);
      }
    };
  }, []); 

  return windowSize; 
}; 

export const RaycastAnimatedBlueWhiteBackground = () => { 
  const { width, height } = useWindowSize(); 
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Garantir que o componente está montado antes de renderizar o UnicornScene
    setIsMounted(true);

    // Usar Intersection Observer para detectar quando o componente está visível
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentContainer = containerRef.current;
    
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      // Limpar o componente quando for desmontado
      setIsMounted(false);
      setIsVisible(false);
      
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      
      observer.disconnect();
      
      // Tentar limpar qualquer instância do Curtains (UnicornStudio)
      try {
        if (currentContainer) {
          const canvases = currentContainer.querySelectorAll('canvas');
          canvases.forEach(canvas => {
            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (gl) {
              gl.getExtension('WEBGL_lose_context')?.loseContext();
            }
          });
        }
      } catch (error) {
        // Ignorar erros de limpeza silenciosamente
      }
    };
  }, []);

  return ( 
    <div 
      ref={containerRef}
      className={cn("flex flex-col items-center w-full h-full")} 
      style={{ transformOrigin: 'top left' }}
    > 
      {isMounted && isVisible && width > 0 && height > 0 && (
        <UnicornScene 
          production={true} 
          projectId="2mMfzhTYIBPRbtfinXzB" 
          width={width} 
          height={height} 
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)',
            filter: 'brightness(1.2) contrast(1.1)',
            width: '100%',
            height: '100%'
          }}
        /> 
      )}
    </div> 
  ); 
};