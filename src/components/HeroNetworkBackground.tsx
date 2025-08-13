import React, { useEffect, useRef } from "react";

// Animated network: points and lines connecting nearby points
// White-first design; lines/points in brand blue (#3687F2) with subtle alpha
const HeroNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);

  // Config
  const COLOR = "#3687F2"; // brand blue
  const MAX_DISTANCE = 140; // fewer connections (shorter distance)
  const POINT_RADIUS = 3.0; // point size

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
      initParticles(width, height);
    }

    function initParticles(width: number, height: number) {
      const area = width * height;
      // slightly higher density: ~1 per 10,000 px², minus 35 points total (15 + 20 extra)
      const baseCount = Math.max(60, Math.min(220, Math.floor(area / 10000)));
      const targetCount = Math.max(20, baseCount - 35);
      const arr: Array<{ x: number; y: number; vx: number; vy: number }> = [];
      for (let i = 0; i < targetCount; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25, // gentle speed
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
      particlesRef.current = arr;
    }

    function step() {
      const parent = canvas.parentElement as HTMLElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, width, height);

      // Move
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }

      // Draw connections (reduced but more opaque)
      ctx.lineWidth = 1.1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist <= MAX_DISTANCE) {
            const t = 1 - dist / MAX_DISTANCE; // 0..1
            if (t < 0.55) continue; // draw only closer pairs to reduce line count
            ctx.strokeStyle = COLOR;
            ctx.globalAlpha = 0.3 * t; // higher opacity lines
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw points on top
      ctx.globalAlpha = 1; // fully opaque points
      ctx.fillStyle = COLOR;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, POINT_RADIUS, 0, Math.PI * 2);
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
