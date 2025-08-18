import { useEffect, useState, useRef } from 'react';

interface Light {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  angle: number;
  radius: number;
}

const InteractiveLights = () => {
  const [lights, setLights] = useState<Light[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Cores das bolinhas baseadas em tons azuis suaves para harmonizar com o background clean
  const colors = [
    '#3b82f6', // azul médio
    '#60a5fa', // azul claro
    '#2563eb', // azul vibrante
    '#93c5fd', // azul muito claro
    '#1d4ed8', // azul profundo
    '#6366f1', // azul índigo
  ];

  // Inicializar as bolinhas próximas ao lado direito da tela (onde fica a animação)
  useEffect(() => {
    const centerX = window.innerWidth * 0.75; // 75% da largura da tela (lado direito)
    const centerY = window.innerHeight / 2;
    
    const initialLights: Light[] = Array.from({ length: 56 }, (_, i) => {
      const angle = (i / 56) * Math.PI * 2;
      const radius = 180 + Math.random() * 200; // 180-380px do centro (área muito maior)
      const baseX = centerX + Math.cos(angle) * radius;
      const baseY = centerY + Math.sin(angle) * radius;
      
      return {
        id: i,
        x: baseX,
        y: baseY,
        targetX: baseX,
        targetY: baseY,
        baseX: baseX,
        baseY: baseY,
        size: Math.random() * 3 + 1.5, // 1.5-4.5px (mais sutil para design clean)
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.15, // 0.15-0.45 (mais suave)
        speed: Math.random() * 0.02 + 0.005, // 0.005-0.025 (mais variação)
        angle: angle,
        radius: radius,
      };
    });
    
    setLights(initialLights);
  }, []);

  // Rastrear posição do mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animação das bolinhas
  useEffect(() => {
    const animate = () => {
      setLights(prevLights =>
        prevLights.map(light => {
          // Distância do mouse
          const distanceToMouse = Math.sqrt(
            Math.pow(mousePos.x - light.x, 2) + Math.pow(mousePos.y - light.y, 2)
          );

          let newTargetX = light.baseX;
          let newTargetY = light.baseY;

          // Se o mouse estiver próximo (menos de 120px), as bolinhas se afastam
          if (distanceToMouse < 120 && distanceToMouse > 0) {
            const repulsion = 80; // Força de repulsão
            const angle = Math.atan2(light.y - mousePos.y, light.x - mousePos.x);
            const force = (120 - distanceToMouse) / 120; // Força baseada na proximidade
            
            newTargetX = light.baseX + Math.cos(angle) * repulsion * force;
            newTargetY = light.baseY + Math.sin(angle) * repulsion * force;
          } else {
            // Movimento orbital suave ao redor da posição base para algumas bolinhas
            // Movimento aleatório para outras (bolinhas com id par fazem movimento aleatório)
            const time = Date.now() * 0.001;
            
            if (light.id % 3 === 0) {
              // Movimento aleatório para 1/3 das bolinhas
              const randomX = (Math.sin(time * 0.7 + light.id) * 80) + (Math.cos(time * 0.3 + light.id * 2) * 60);
              const randomY = (Math.cos(time * 0.5 + light.id) * 70) + (Math.sin(time * 0.8 + light.id * 1.5) * 50);
              
              newTargetX = light.baseX + randomX;
              newTargetY = light.baseY + randomY;
            } else {
              // Movimento orbital para as outras bolinhas
              const orbitRadius = 35 + Math.sin(time * 0.2 + light.id) * 15; // Raio variável maior
              const orbitSpeed = 0.4 + light.id * 0.08;
              
              newTargetX = light.baseX + Math.cos(time * orbitSpeed + light.angle) * orbitRadius;
              newTargetY = light.baseY + Math.sin(time * orbitSpeed + light.angle) * orbitRadius;
            }
          }

          // Movimento suave em direção ao target
          const newX = light.x + (newTargetX - light.x) * light.speed;
          const newY = light.y + (newTargetY - light.y) * light.speed;

          // Opacidade baseada na proximidade do mouse (diminui quando próximo)
          const newOpacity = distanceToMouse < 80
            ? Math.max(0.05, light.opacity - 0.2)
            : Math.min(0.45, light.opacity + 0.005);

          return {
            ...light,
            x: newX,
            y: newY,
            targetX: newTargetX,
            targetY: newTargetY,
            opacity: newOpacity,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {lights.map(light => (
        <div
          key={light.id}
          className="absolute rounded-full transition-opacity duration-200 ease-out"
          style={{
            left: `${light.x}px`,
            top: `${light.y}px`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            backgroundColor: light.color,
            opacity: light.opacity,
            boxShadow: `0 0 ${light.size * 3}px ${light.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveLights;