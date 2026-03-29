import { useRef, useEffect, useCallback, useState } from "react";

const SYMBOLS = ["🐯", "💰", "🐉", "🏮", "💎", "🍀", "7️⃣", "⭐"];
const SYMBOL_SIZE = 80;
const VISIBLE_ROWS = 3;
const REEL_HEIGHT = SYMBOL_SIZE * VISIBLE_ROWS;
const STRIP_LENGTH = SYMBOLS.length * 3; // symbols repeated for seamless loop

function buildStrip() {
  const strip: string[] = [];
  for (let i = 0; i < STRIP_LENGTH; i++) {
    strip.push(SYMBOLS[i % SYMBOLS.length]);
  }
  return strip;
}

interface ReelState {
  offset: number;
  speed: number;
  stopping: boolean;
  stopped: boolean;
  targetIndex: number;
  strip: string[];
}

export interface CanvasReelsHandle {
  spin: (results: string[]) => Promise<string[]>;
  isSpinning: boolean;
}

interface Props {
  onSpinComplete?: (results: string[]) => void;
  reelsRef: React.MutableRefObject<CanvasReelsHandle | null>;
}

export default function CanvasReels({ onSpinComplete, reelsRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reelsState = useRef<ReelState[]>([]);
  const animRef = useRef<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const resolveRef = useRef<((results: string[]) => void) | null>(null);

  // Initialize reels
  useEffect(() => {
    reelsState.current = Array.from({ length: 3 }, () => ({
      offset: 0,
      speed: 0,
      stopping: false,
      stopped: true,
      targetIndex: 0,
      strip: buildStrip(),
    }));
    drawFrame();
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const reelWidth = 90;
    const gap = 8;
    const totalWidth = reelWidth * 3 + gap * 2;
    const padding = 16;

    canvas.width = (totalWidth + padding * 2) * dpr;
    canvas.height = (REEL_HEIGHT + padding * 2) * dpr;
    canvas.style.width = `${totalWidth + padding * 2}px`;
    canvas.style.height = `${REEL_HEIGHT + padding * 2}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = "#0a0506";
    ctx.fillRect(0, 0, totalWidth + padding * 2, REEL_HEIGHT + padding * 2);

    reelsState.current.forEach((reel, i) => {
      const x = padding + i * (reelWidth + gap);
      const y = padding;

      // Reel background
      const reelGrad = ctx.createLinearGradient(x, y, x, y + REEL_HEIGHT);
      reelGrad.addColorStop(0, "#0d0808");
      reelGrad.addColorStop(0.15, "#1a0f0f");
      reelGrad.addColorStop(0.5, "#1f1414");
      reelGrad.addColorStop(0.85, "#1a0f0f");
      reelGrad.addColorStop(1, "#0d0808");
      ctx.fillStyle = reelGrad;
      ctx.beginPath();
      ctx.roundRect(x, y, reelWidth, REEL_HEIGHT, 6);
      ctx.fill();

      // Clip for symbols
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, reelWidth, REEL_HEIGHT, 6);
      ctx.clip();

      // Draw symbols
      const totalStripHeight = reel.strip.length * SYMBOL_SIZE;
      const normalizedOffset = ((reel.offset % totalStripHeight) + totalStripHeight) % totalStripHeight;

      for (let s = -1; s < VISIBLE_ROWS + 2; s++) {
        const symbolY = y + s * SYMBOL_SIZE - (normalizedOffset % SYMBOL_SIZE);
        const stripIdx = Math.floor(normalizedOffset / SYMBOL_SIZE + s);
        const idx = ((stripIdx % reel.strip.length) + reel.strip.length) % reel.strip.length;
        const symbol = reel.strip[idx];

        if (symbolY > y - SYMBOL_SIZE && symbolY < y + REEL_HEIGHT) {
          ctx.font = "42px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(symbol, x + reelWidth / 2, symbolY + SYMBOL_SIZE / 2);
        }
      }

      ctx.restore();

      // Reel border
      ctx.strokeStyle = "#3d2a1a";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x, y, reelWidth, REEL_HEIGHT, 6);
      ctx.stroke();
    });

    // Center payline indicator
    const lineY = padding + REEL_HEIGHT / 2;
    ctx.strokeStyle = "rgba(255, 200, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(padding - 4, lineY - SYMBOL_SIZE / 2);
    ctx.lineTo(totalWidth + padding + 4, lineY - SYMBOL_SIZE / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding - 4, lineY + SYMBOL_SIZE / 2);
    ctx.lineTo(totalWidth + padding + 4, lineY + SYMBOL_SIZE / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Top/bottom shadow overlays
    const topShadow = ctx.createLinearGradient(0, padding, 0, padding + 40);
    topShadow.addColorStop(0, "rgba(10, 5, 6, 0.9)");
    topShadow.addColorStop(1, "rgba(10, 5, 6, 0)");
    ctx.fillStyle = topShadow;
    ctx.fillRect(padding, padding, totalWidth, 40);

    const bottomShadow = ctx.createLinearGradient(0, padding + REEL_HEIGHT - 40, 0, padding + REEL_HEIGHT);
    bottomShadow.addColorStop(0, "rgba(10, 5, 6, 0)");
    bottomShadow.addColorStop(1, "rgba(10, 5, 6, 0.9)");
    ctx.fillStyle = bottomShadow;
    ctx.fillRect(padding, padding + REEL_HEIGHT - 40, totalWidth, 40);

    // Outer frame gold border
    const frameGrad = ctx.createLinearGradient(0, 0, totalWidth + padding * 2, 0);
    frameGrad.addColorStop(0, "#8B6914");
    frameGrad.addColorStop(0.3, "#DAA520");
    frameGrad.addColorStop(0.5, "#FFD700");
    frameGrad.addColorStop(0.7, "#DAA520");
    frameGrad.addColorStop(1, "#8B6914");
    ctx.strokeStyle = frameGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(2, 2, totalWidth + padding * 2 - 4, REEL_HEIGHT + padding * 2 - 4, 10);
    ctx.stroke();
  }, []);

  const animate = useCallback(() => {
    let allStopped = true;

    reelsState.current.forEach((reel) => {
      if (!reel.stopped) {
        allStopped = false;

        if (reel.stopping) {
          // Decelerate towards target
          const targetOffset = reel.targetIndex * SYMBOL_SIZE;
          const totalStripHeight = reel.strip.length * SYMBOL_SIZE;
          const currentNormalized = ((reel.offset % totalStripHeight) + totalStripHeight) % totalStripHeight;

          let distance = targetOffset - currentNormalized;
          if (distance < 0) distance += totalStripHeight;

          if (distance < SYMBOL_SIZE * 0.5 && reel.speed < 3) {
            // Snap to position
            reel.offset = targetOffset;
            reel.speed = 0;
            reel.stopped = true;
          } else {
            reel.speed = Math.max(2, reel.speed * 0.96);
            reel.offset += reel.speed;
          }
        } else {
          // Full speed
          reel.offset += reel.speed;
        }
      }
    });

    drawFrame();

    if (allStopped) {
      setIsSpinning(false);
      // Extract final symbols (center row)
      const results = reelsState.current.map((reel) => {
        const idx = (reel.targetIndex + 1) % reel.strip.length;
        return reel.strip[idx];
      });
      onSpinComplete?.(results);
      resolveRef.current?.(results);
      resolveRef.current = null;
      return;
    }

    animRef.current = requestAnimationFrame(animate);
  }, [drawFrame, onSpinComplete]);

  const spin = useCallback((results: string[]): Promise<string[]> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setIsSpinning(true);

      reelsState.current.forEach((reel, i) => {
        reel.speed = 25 + Math.random() * 5;
        reel.stopping = false;
        reel.stopped = false;

        // Find target index for desired result
        const symbolIdx = reel.strip.indexOf(results[i]);
        // Point to one before so the center row shows the desired symbol
        reel.targetIndex = symbolIdx > 0 ? symbolIdx - 1 : reel.strip.length - 1;

        // Stagger stop times
        setTimeout(() => {
          reel.stopping = true;
        }, 800 + i * 500);
      });

      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(animate);
    });
  }, [animate]);

  // Expose methods
  useEffect(() => {
    reelsRef.current = { spin, isSpinning };
  }, [spin, isSpinning]);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg"
      style={{ imageRendering: "auto" }}
    />
  );
}
