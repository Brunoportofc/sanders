import React, { useEffect, useRef } from "react";

// Metaballs WebGL background: white-first with subtle blue details
// Renders a full-size canvas inside its parent (absolute positioning handled by parent)
const HeroMetaballsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const metaballsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const numMetaballs = 20; // quantidade estável; aumentamos o tamanho

  function hslToRgb01(h: number, sPct: number, lPct: number) {
    const s = sPct / 100;
    const l = lPct / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = (h % 360) / 60;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let r1 = 0, g1 = 0, b1 = 0;
    if (0 <= hp && hp < 1) { r1 = c; g1 = x; b1 = 0; }
    else if (1 <= hp && hp < 2) { r1 = x; g1 = c; b1 = 0; }
    else if (2 <= hp && hp < 3) { r1 = 0; g1 = c; b1 = x; }
    else if (3 <= hp && hp < 4) { r1 = 0; g1 = x; b1 = c; }
    else if (4 <= hp && hp < 5) { r1 = x; g1 = 0; b1 = c; }
    else if (5 <= hp && hp < 6) { r1 = c; g1 = 0; b1 = x; }
    const m = l - c / 2;
    return [r1 + m, g1 + m, b1 + m];
  }

  // Compile shader helper
  function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("Shader compile failed: " + info);
    }
    return shader;
  }

  // Create program helper
  function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
    const vs = compileShader(gl, vsSrc, gl.VERTEX_SHADER);
    const fs = compileShader(gl, fsSrc, gl.FRAGMENT_SHADER);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("Program link failed: " + info);
    }
    return program;
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = (canvas.getContext("webgl", { antialias: true, alpha: true }) as WebGLRenderingContext) || null;
    if (!gl) return;
    glRef.current = gl;

    // Vertex shader: fullscreen quad
    const vertexShaderSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader:
    // - white-first background (alpha 0); blue metaballs with soft edges and slight gradient
    const fragmentShaderSrc = `
      precision highp float;

      uniform float uWidth;
      uniform float uHeight;
      uniform vec3 uMetaballs[${numMetaballs}];
      uniform vec3 uBlueA; // deep blue
      uniform vec3 uBlueB; // light blue
      uniform float uThreshold;

      void main() {
        float x = gl_FragCoord.x;
        float y = uHeight - gl_FragCoord.y; // flip Y to be intuitive

        float sum = 0.0;
        for (int i = 0; i < ${numMetaballs}; i++) {
          vec3 mb = uMetaballs[i];
          float dx = mb.x - x;
          float dy = mb.y - y;
          float r = mb.z;
          sum += (r * r) / (dx * dx + dy * dy + 0.0001);
        }

        // Soft thresholding
        float edge = smoothstep(uThreshold - 0.15, uThreshold + 0.15, sum);
        if (edge <= 0.001) {
          // Transparent where there are no metaballs (white page shows through)
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          return;
        }

        // Subtle vertical gradient across the shapes
        float t = clamp(y / uHeight, 0.0, 1.0);
        vec3 color = mix(uBlueA, uBlueB, t);

        // Alpha based on intensity for soft edges
        float alpha = clamp((sum - (uThreshold - 0.25)) * 0.6, 0.08, 0.35);
        gl_FragColor = vec4(color, alpha * edge);
      }
    `;

    const program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
    programRef.current = program;
    gl.useProgram(program);

    // Fullscreen quad buffer
    const vertexData = new Float32Array([
      -1.0, 1.0,
      -1.0, -1.0,
       1.0, 1.0,
       1.0, -1.0,
    ]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 2 * 4, 0);

    // Uniform locations
    const uWidth = gl.getUniformLocation(program, "uWidth");
    const uHeight = gl.getUniformLocation(program, "uHeight");
    const uMetaballs = gl.getUniformLocation(program, "uMetaballs");
    const uBlueA = gl.getUniformLocation(program, "uBlueA");
    const uBlueB = gl.getUniformLocation(program, "uBlueB");
    const uThreshold = gl.getUniformLocation(program, "uThreshold");

    // Cor fixa solicitada: #3687F2 (RGB 54, 135, 242)
    const r = 54 / 255;
    const g = 135 / 255;
    const b = 242 / 255;
    gl.uniform3f(uBlueA, r, g, b);
    gl.uniform3f(uBlueB, r, g, b);
    gl.uniform1f(uThreshold, 0.94);

    // Initialize metaballs positions (x, y, r)
    metaballsRef.current = new Float32Array(3 * numMetaballs);
    velocitiesRef.current = new Float32Array(2 * numMetaballs);

    function randomizeMetaballs(width: number, height: number) {
      const m = metaballsRef.current!;
      const v = velocitiesRef.current!;
      for (let i = 0; i < numMetaballs; i++) {
        const base = 3 * i;
        const vb = 2 * i;
        const radius = Math.random() * 60 + 28; // tamanho moderado
        m[base + 0] = Math.random() * (width - 2 * radius) + radius;
        m[base + 1] = Math.random() * (height - 2 * radius) + radius;
        m[base + 2] = radius * 0.75;
        v[vb + 0] = (Math.random() - 0.5) * 0.5; // Velocidade reduzida de 1.0 para 0.5
        v[vb + 1] = (Math.random() - 0.5) * 0.5; // Velocidade reduzida de 1.0 para 0.5
      }
    }

    function resize() {
      const parent = canvas.parentElement as HTMLElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uWidth, canvas.width);
      gl.uniform1f(uHeight, canvas.height);
      // Re-randomize on resize to avoid stretched trajectories
      randomizeMetaballs(canvas.width, canvas.height);
    }

    // Initial sizing
    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    // Animation loop
    const loop = () => {
      const m = metaballsRef.current!;
      const v = velocitiesRef.current!;
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < numMetaballs; i++) {
        const base = 3 * i;
        const vb = 2 * i;
        m[base + 0] += v[vb + 0];
        m[base + 1] += v[vb + 1];
        const r = m[base + 2];
        if (m[base + 0] < r || m[base + 0] > w - r) v[vb + 0] *= -1;
        if (m[base + 1] < r || m[base + 1] > h - r) v[vb + 1] *= -1;
      }

      gl.uniform3fv(uMetaballs, m);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
      glRef.current = null;
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

export default HeroMetaballsBackground;
