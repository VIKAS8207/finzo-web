"use client";

import { useEffect, useRef } from "react";

type ParticleSphereProps = {
  labels?: string[];
  pointCount?: number;
  radius?: number;
  color?: string; // RGB string, e.g., "255, 255, 255"
  background?: string; 
};

type Point3D = { x: number; y: number; z: number };

export default function ParticleSphere({
  labels = ["ENCODING...", "TOKENIZATION...", "RETRIEVAL...", "ROUTING...", "DECODING..."],
  pointCount = 220,
  radius = 260,
  color = "255, 255, 255",
  background = "transparent",
}: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Build sphere points using Fibonacci sphere distribution[cite: 4]
    const points: Point3D[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2; 
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      points.push({ x: x * radius, y: y * radius, z: z * radius });
    }

    // Rotation state[cite: 4]
    let rotY = 0; 
    let rotX = 0.15; 
    
    // Target rotation driven by pointer[cite: 4]
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const AUTO_ROTATE_SPEED = 0.0022;
    const EASE = 0.045; 
    const MAX_TILT = 0.35;

    function onPointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; 
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetOffsetY = nx * 0.6; 
      targetOffsetX = -ny * MAX_TILT; 
    }
    
    function onPointerLeave() {
      targetOffsetX = 0;
      targetOffsetY = 0;
    }

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function project(p: Point3D, ry: number, rx: number) {
      // rotate around Y axis (yaw)
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      let x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      let y = p.y;

      // rotate around X axis (pitch)
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      y = y2;
      z = z2;

      // perspective
      const perspective = 900;
      const scale = perspective / (perspective + z);
      const sx = x * scale;
      const sy = y * scale;
      return { sx, sy, z, scale };
    }

    let raf = 0;

    function draw() {
      offsetX += (targetOffsetX - offsetX) * EASE;
      offsetY += (targetOffsetY - offsetY) * EASE;
      rotY += AUTO_ROTATE_SPEED + offsetY * 0.01;
      rotX += (0.15 + offsetX - rotX) * 0.03;

      ctx!.clearRect(0, 0, width, height);
      if (background !== "transparent") {
        ctx!.fillStyle = background;
        ctx!.fillRect(0, 0, width, height);
      }

      const cx = width / 2;
      const cy = height / 2;

      const projected = points.map((p) => project(p, rotY, rotX));

      // depth-sort so far points draw first, near points on top
      const order = projected
        .map((pr, i) => ({ i, z: pr.z }))
        .sort((a, b) => a.z - b.z);

      // Lines back to center
      for (const { i } of order) {
        const pr = projected[i];
        const depth = (pr.z + radius) / (radius * 2); 
        const alpha = 0.05 + depth * 0.22; 
        ctx!.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx!.lineWidth = 0.6;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(cx + pr.sx, cy + pr.sy);
        ctx!.stroke();
      }

      // Dots on the surface
      for (const { i } of order) {
        const pr = projected[i];
        const depth = (pr.z + radius) / (radius * 2);
        const alpha = 0.35 + depth * 0.65;
        const size = 0.9 + depth * 1.6;
        ctx!.fillStyle = `rgba(${color}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(cx + pr.sx, cy + pr.sy, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Soft center glow
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 40);
      glow.addColorStop(0, `rgba(${color}, 0.9)`);
      glow.addColorStop(1, `rgba(${color}, 0)`);
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx!.fill();

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap!.removeEventListener("pointermove", onPointerMove);
      wrap!.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [pointCount, radius, color, background]);

  // fixed positions for the labels[cite: 4]
  const labelPositions = [
    { top: "8%", left: "50%", translate: "-50%, 0" },
    { top: "42%", left: "94%", translate: "-50%, -50%" },
    { top: "58%", left: "94%", translate: "-50%, -50%" },
    { top: "92%", left: "70%", translate: "-50%, -100%" },
    { top: "80%", left: "6%", translate: "-50%, -50%" },
  ];

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        aspectRatio: "1 / 1",
        margin: "0 auto",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      {labels.map((label, i) => {
        const pos = labelPositions[i % labelPositions.length];
        return (
          <span
            key={label + i}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              transform: `translate(${pos.translate})`,
              fontFamily: "var(--font-mono)", // Adapting to your Tailwind configuration
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.85)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}