import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
}

export interface ParticleFieldProps {
  className?: string;
}

export function ParticleField({ className = "" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    const dots: Dot[] = [];
    const dotCount = 48;
    const cell = 56;

    const setup = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dots.length = 0;
      for (let i = 0; i < dotCount; i += 1) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          dx: (Math.random() - 0.5) * 0.15,
          dy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.4 + 0.3,
        });
      }
    };

    const draw = (time: number) => {
      const t = time * 0.00008;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(65,217,255,0.07)";
      ctx.lineWidth = 1;
      const xShift = (time * 0.005) % cell;
      const yShift = (time * 0.003) % cell;
      for (let x = -cell; x < width + cell; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x + xShift, 0);
        ctx.lineTo(x + xShift, height);
        ctx.stroke();
      }
      for (let y = -cell; y < height + cell; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y + yShift);
        ctx.lineTo(width, y + yShift);
        ctx.stroke();
      }

      for (const dot of dots) {
        dot.x += dot.dx + Math.sin(t + dot.y * 0.01) * 0.03;
        dot.y += dot.dy + Math.cos(t + dot.x * 0.01) * 0.03;
        if (dot.x < -4) dot.x = width + 4;
        if (dot.x > width + 4) dot.x = -4;
        if (dot.y < -4) dot.y = height + 4;
        if (dot.y > height + 4) dot.y = -4;

        ctx.beginPath();
        ctx.fillStyle = "rgba(65,217,255,0.55)";
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    };

    setup();
    seed();
    raf = window.requestAnimationFrame(draw);

    const onResize = () => {
      setup();
      seed();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hxn-particle-field"
      className={className}
      aria-hidden="true"
    />
  );
}
