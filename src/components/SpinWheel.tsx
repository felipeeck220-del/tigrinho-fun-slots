import { useRef, useEffect, useCallback, useState, useImperativeHandle, forwardRef } from "react";

export type PrizeType = "r1000" | "r100" | "loss";

export interface WheelSegment {
  label: string;
  type: PrizeType;
  value: number;
  color1: string;
  color2: string;
}

// Layout: R$1000 x4 (alternating), R$100 x1, Perdeu x3
export const SEGMENTS: WheelSegment[] = [
  { label: "R$ 1.000", type: "r1000", value: 1000, color1: "#B8860B", color2: "#FFD700" },
  { label: "Perdeu!", type: "loss", value: 0, color1: "#2a0a0a", color2: "#1a0505" },
  { label: "R$ 1.000", type: "r1000", value: 1000, color1: "#DAA520", color2: "#FFD700" },
  { label: "Perdeu!", type: "loss", value: 0, color1: "#2a0a0a", color2: "#1a0505" },
  { label: "R$ 1.000", type: "r1000", value: 1000, color1: "#B8860B", color2: "#FFD700" },
  { label: "R$ 100", type: "r100", value: 100, color1: "#0a2a0a", color2: "#0d3d0d" },
  { label: "R$ 1.000", type: "r1000", value: 1000, color1: "#DAA520", color2: "#FFD700" },
  { label: "Perdeu!", type: "loss", value: 0, color1: "#2a0a0a", color2: "#1a0505" },
];

const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS.length;

export interface SpinWheelHandle {
  spin: () => Promise<number>;
}

interface Props {
  size?: number;
}

const SpinWheel = forwardRef<SpinWheelHandle, Props>(({ size = 320 }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const animRef = useRef<number>(0);
  const [, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  const drawWheel = useCallback((angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasSize = size + 40; // extra for outer ring
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);

    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    const radius = size / 2;

    // Clear
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Outer decorative ring
    const outerGrad = ctx.createConicGradient(0, cx, cy);
    for (let i = 0; i < 24; i++) {
      const t = i / 24;
      outerGrad.addColorStop(t, i % 2 === 0 ? "#FFD700" : "#8B6914");
    }
    outerGrad.addColorStop(1, "#FFD700");
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 14, 0, Math.PI * 2);
    ctx.fillStyle = outerGrad;
    ctx.fill();

    // LED dots on outer ring
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + angle * 0.1;
      const lx = cx + Math.cos(a) * (radius + 10);
      const ly = cy + Math.sin(a) * (radius + 10);
      ctx.beginPath();
      ctx.arc(lx, ly, 3, 0, Math.PI * 2);
      const brightness = (Math.sin(Date.now() * 0.003 + i * 0.5) + 1) / 2;
      ctx.fillStyle = i % 2 === 0
        ? `rgba(255, 215, 0, ${0.4 + brightness * 0.6})`
        : `rgba(255, 68, 68, ${0.4 + brightness * 0.6})`;
      ctx.fill();
    }

    // Dark ring border
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.fillStyle = "#1a0808";
    ctx.fill();

    // Draw segments
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    SEGMENTS.forEach((seg, i) => {
      const startAngle = i * SEGMENT_ANGLE;
      const endAngle = startAngle + SEGMENT_ANGLE;

      // Segment fill with gradient
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      const grad = ctx.createRadialGradient(0, 0, 20, 0, 0, radius);
      grad.addColorStop(0, seg.color2);
      grad.addColorStop(1, seg.color1);
      ctx.fillStyle = grad;
      ctx.fill();

      // Segment border
      ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Content
      ctx.save();
      ctx.rotate(startAngle + SEGMENT_ANGLE / 2);

      if (seg.type === "r1000") {
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("R$", radius * 0.45, -8);
        ctx.font = "bold 18px Inter, sans-serif";
        ctx.fillText("1.000", radius * 0.55, 10);
      } else if (seg.type === "r100") {
        ctx.fillStyle = "#44FF44";
        ctx.font = "bold 14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("R$", radius * 0.45, -8);
        ctx.font = "bold 18px Inter, sans-serif";
        ctx.fillText("100", radius * 0.55, 10);
      } else {
        ctx.fillStyle = "#FF4444";
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("❌", radius * 0.55, -4);
        ctx.font = "bold 9px Inter, sans-serif";
        ctx.fillStyle = "#FF6666";
        ctx.fillText("Perdeu", radius * 0.55, 10);
      }

      ctx.restore();
    });

    ctx.restore();

    // Center hub
    const hubGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 28);
    hubGrad.addColorStop(0, "#FFD700");
    hubGrad.addColorStop(0.5, "#DAA520");
    hubGrad.addColorStop(1, "#8B6914");
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Tiger emoji in center
    ctx.font = "24px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🐯", cx, cy);

    // Pointer (top, pointing down)
    ctx.beginPath();
    ctx.moveTo(cx, 4);
    ctx.lineTo(cx - 14, -6);
    ctx.lineTo(cx + 14, -6);
    ctx.closePath();
    const pointerGrad = ctx.createLinearGradient(cx - 14, -6, cx + 14, -6);
    pointerGrad.addColorStop(0, "#B8860B");
    pointerGrad.addColorStop(0.5, "#FFD700");
    pointerGrad.addColorStop(1, "#B8860B");
    ctx.fillStyle = pointerGrad;
    ctx.fill();
    ctx.strokeStyle = "#8B6914";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pointer bottom triangle into wheel
    ctx.beginPath();
    ctx.moveTo(cx, 22);
    ctx.lineTo(cx - 8, 4);
    ctx.lineTo(cx + 8, 4);
    ctx.closePath();
    ctx.fillStyle = "#FFD700";
    ctx.fill();
  }, [size]);

  // Initial draw
  useEffect(() => {
    drawWheel(angleRef.current);
  }, [drawWheel]);

  // Helper: determine which segment the pointer is on given an angle
  const getSegmentAtPointer = useCallback((angle: number): number => {
    // Pointer is at top = -PI/2 in canvas coords
    // Local pointer angle in wheel's coordinate frame
    const localAngle = ((-Math.PI / 2 - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    return Math.floor(localAngle / SEGMENT_ANGLE) % SEGMENTS.length;
  }, []);

  const spin = useCallback((): Promise<number> => {
    return new Promise((resolve) => {
      // Random total rotation: 5-8 full spins + random offset
      const totalRotation = Math.PI * 2 * (5 + Math.random() * 3) + Math.random() * Math.PI * 2;
      const finalAngle = angleRef.current + totalRotation;

      const startAngle = angleRef.current;
      const duration = 4000 + Math.random() * 1500;
      const startTime = performance.now();

      const animateStep = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out for realistic deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentAngle = startAngle + totalRotation * eased;

        angleRef.current = currentAngle;
        drawWheel(currentAngle);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(animateStep);
        } else {
          angleRef.current = finalAngle;
          drawWheel(finalAngle);
          // Read the actual segment the pointer landed on
          const landedSegment = getSegmentAtPointer(finalAngle);
          resolve(landedSegment);
        }
      };

      cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(animateStep);
    });
  }, [drawWheel, getSegmentAtPointer]);

  useImperativeHandle(ref, () => ({ spin }), [spin]);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="rounded-full"
      style={{ imageRendering: "auto" }}
    />
  );
});

SpinWheel.displayName = "SpinWheel";
export default SpinWheel;
