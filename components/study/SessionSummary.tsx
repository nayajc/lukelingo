'use client';
import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';

interface Props {
  total: number;
  knownCount: number;
  learningCount: number;
  onRetry: () => void;
  onExit: () => void;
}

function launchConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#0a0a0a', '#525252', '#a3a3a3', '#d4d4d4', '#404040'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height * 0.5,
    w: Math.random() * 8 + 4,
    h: Math.random() * 5 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 2,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.2,
    opacity: 1,
  }));

  let frame: number;
  let tick = 0;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tick++;

    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      if (tick > 80) p.opacity = Math.max(0, p.opacity - 0.015);

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (pieces.some((p) => p.opacity > 0)) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  frame = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(frame);
}

export default function SessionSummary({ total, knownCount, learningCount, onRetry, onExit }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pct = total > 0 ? Math.round((knownCount / total) * 100) : 0;

  useEffect(() => {
    if (!canvasRef.current) return;
    const cancel = launchConfetti(canvasRef.current);
    return cancel;
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      <div className="flex flex-col items-center gap-8 py-12 text-center">
        <div>
          <p className="label mb-2">Session complete</p>
          <p className="text-6xl font-black tracking-tighter text-ink-950">{pct}%</p>
          <p className="text-sm text-ink-400 mt-1">{total} cards reviewed</p>
        </div>

        <div className="w-full max-w-xs grid grid-cols-2 gap-3">
          <div className="border border-ink-200 rounded-sm p-4 text-left">
            <p className="text-2xl font-black text-ink-950">{knownCount}</p>
            <p className="label mt-1">Got It</p>
          </div>
          <div className="border border-ink-200 rounded-sm p-4 text-left">
            <p className="text-2xl font-black text-ink-950">{learningCount}</p>
            <p className="label mt-1">Practicing</p>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <div className="h-px bg-ink-100">
            <div className="h-px bg-ink-950 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onExit}>Back to Sets</Button>
          <Button onClick={onRetry}>Study Again</Button>
        </div>
      </div>
    </>
  );
}
