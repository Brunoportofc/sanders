import React, { useEffect, useRef } from "react";

// Animated blue lights background - defocused blue lights floating
// Creates a subtle ambient lighting effect with brand blue (#3687F2)
const HeroNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lightsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulseSpeed: number }>>([]);

  // Config
  const COLOR = "#3687F2"; // brand blue
  const MIN_SIZE = 20; // minimum light size
  const MAX_SIZE = 80; // maximum light size

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      const parent = canvas.parentElement as HTMLElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initLights(width, height);
    }

    function initLights(width: number, height: number) {
      const area = width * height;
      // Fewer lights for a cleaner look - about 1 per 15,000 px²
      const baseCount = Math.max(8, Math.min(15, Math.floor(area / 15000)));
      const targetCount = Math.max(6, baseCount);
      const arr: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulseSpeed: number }> = [];
      for (let i = 0; i < targetCount; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15, // very gentle movement
          vy: (Math.random() - 0.5) * 0.15,
          size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
          opacity: 0.1 + Math.random() * 0.15, // subtle opacity
          pulseSpeed: 0.01 + Math.random() * 0.02, // gentle pulsing
        });
      }
      lightsRef.current = arr;
    }

    function step() {
      const parent = canvas.parentElement as HTMLElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const lights = lightsRef.current;
      const time = Date.now() * 0.001; // time for pulsing effect

      ctx.clearRect(0, 0, width, height);

      // Move lights gently
      for (const light of lights) {
        light.x += light.vx;
        light.y += light.vy;
        
        // Bounce off edges with some padding
        const padding = light.size;
        if (light.x <= padding || light.x >= width - padding) light.vx *= -1;
        if (light.y <= padding || light.y >= height - padding) light.vy *= -1;
        
        // Keep within bounds
        light.x = Math.max(padding, Math.min(width - padding, light.x));
        light.y = Math.max(padding, Math.min(height - padding, light.y));
      }

      // Draw defocused blue lights
      for (const light of lights) {
        const pulseFactor = 1 + Math.sin(time * light.pulseSpeed) * 0.3; // gentle pulsing
        const currentSize = light.size * pulseFactor;
        const currentOpacity = light.opacity * (0.8 + Math.sin(time * light.pulseSpeed * 1.5) * 0.2);
        
        // Create gradient for defocused effect
        const gradient = ctx.createRadialGradient(
          light.x, light.y, 0,
          light.x, light.y, currentSize
        );
        
        gradient.addColorStop(0, `rgba(54, 135, 242, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(54, 135, 242, ${currentOpacity * 0.6})`);
        gradient.addColorStop(0.7, `rgba(54, 135, 242, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(54, 135, 242, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(light.x, light.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      aria-hidden
    />
  );
};

export default HeroNetworkBackground;
