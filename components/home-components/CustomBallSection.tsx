"use client";

import React, { useEffect, useRef } from "react";

const NUM_POINTS = 120;

// Pre-calculate the base characteristics of each point
const basePoints = Array.from({ length: NUM_POINTS }).map((_, i) => {
  const baseAngle = (i / NUM_POINTS) * Math.PI * 2;
  
  // Deterministic pseudo-random numbers
  const rand1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const rand2 = Math.abs(Math.cos(i * 78.233) * 43758.5453) % 1;

  // Curve characteristics
  const bendDirection = rand1 > 0.5 ? 1 : -1;
  const twistIntensity = (Math.PI / 12) + (rand2 * Math.PI / 4); 
  const curveRadius = 30 + (rand1 * 40); 
  const duration = 15 + (rand2 * 15); 
  
  // Randomize the dot size (between 0.4 and 1.5) and fix to 3 decimals for hydration safety
  const dotRadius = Number((0.4 + (rand1 * 1.1)).toFixed(3)); 

  return { baseAngle, bendDirection, twistIntensity, curveRadius, duration, dotRadius };
});

export default function CustomBallSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  
  // Refs for the traveling gradient pulse inside the lines
  const stop1Ref = useRef<SVGStopElement>(null);
  const stop2Ref = useRef<SVGStopElement>(null);
  const stop3Ref = useRef<SVGStopElement>(null);
  
  // Store the current animated position of each control point for smooth LERPing
  const currentCpsRef = useRef(
    basePoints.map(pt => ({
      x: 100 + pt.curveRadius * Math.cos(pt.baseAngle),
      y: 100 + pt.curveRadius * Math.sin(pt.baseAngle)
    }))
  );
  
  const mouseRef = useRef({ 
    x: 100, 
    y: 100, 
    isHovering: false, 
    hoverIntensity: 0 
  });

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const renderLoop = (time: number) => {
      const timeInSeconds = (time - startTime) * 0.001;
      const globalRotation = timeInSeconds * ((Math.PI * 2) / 90);
      const mouse = mouseRef.current;

      mouse.hoverIntensity += (mouse.isHovering ? 0.05 : -0.05);
      mouse.hoverIntensity = Math.max(0, Math.min(1, mouse.hoverIntensity));

      // --- ULTRA SMOOTH TRAVELING LINE GLOW ---
      const pulseDuration = 8.0; 
      const rawProgress = (timeInSeconds % pulseDuration) / pulseDuration;
      const pulseProgress = (rawProgress * 1.6) - 0.3;

      if (stop1Ref.current && stop2Ref.current && stop3Ref.current) {
        stop1Ref.current.setAttribute("offset", Math.max(0, Math.min(1, pulseProgress - 0.20)).toString());
        stop2Ref.current.setAttribute("offset", Math.max(0, Math.min(1, pulseProgress)).toString());
        stop3Ref.current.setAttribute("offset", Math.max(0, Math.min(1, pulseProgress + 0.20)).toString());
      }
      // ----------------------------------------

      basePoints.forEach((pt, i) => {
        const currentAngle = pt.baseAngle + globalRotation;
        
        // Perimeter Dot
        const x = 100 + 98 * Math.cos(currentAngle);
        const y = 100 + 98 * Math.sin(currentAngle);

        // 1. Calculate the natural chaotic sway
        const sway = Math.sin(timeInSeconds * ((Math.PI * 2) / pt.duration));
        const naturalTwist = pt.twistIntensity * pt.bendDirection * sway;

        // Find where the control point WANTS to be NATURALLY
        const naturalCpX = 100 + pt.curveRadius * Math.cos(currentAngle + naturalTwist);
        const naturalCpY = 100 + pt.curveRadius * Math.sin(currentAngle + naturalTwist);

        let targetCpX = naturalCpX;
        let targetCpY = naturalCpY;

        // 2. Apply Relative "Parting the Sea" Physics
        if (mouse.hoverIntensity > 0) {
          const dx = naturalCpX - mouse.x;
          const dy = naturalCpY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxInteractionDist = 80; 

          if (dist < maxInteractionDist) {
            const influence = Math.pow(1 - (dist / maxInteractionDist), 1.5) * mouse.hoverIntensity;
            
            // Get angles relative to the center
            const mouseAngle = Math.atan2(mouse.y - 100, mouse.x - 100);
            const cpAngle = Math.atan2(naturalCpY - 100, naturalCpX - 100);
            
            // Find the shortest angular distance between the mouse and the control point
            let angleDiff = cpAngle - mouseAngle;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            
            // RELATIVE PARTING: Push away from the mouse's current angle, no matter where it is
            const slideDirection = angleDiff >= 0 ? 1 : -1;
            
            const maxDeflection = Math.PI / 1.5; 
            const angularPush = slideDirection * maxDeflection * influence;

            const finalCpAngle = cpAngle + angularPush;
            
            // Increase the radius slightly so the curves "bloom" and open up wider around the mouse
            const finalRadius = pt.curveRadius + (influence * 15);

            targetCpX = 100 + finalRadius * Math.cos(finalCpAngle);
            targetCpY = 100 + finalRadius * Math.sin(finalCpAngle);
          }
        }

        // 3. Strict Boundary Clamp
        const clampRadius = 94; 
        const targetDistFromCenter = Math.hypot(targetCpX - 100, targetCpY - 100);
        if (targetDistFromCenter > clampRadius) {
            const scale = clampRadius / targetDistFromCenter;
            targetCpX = 100 + (targetCpX - 100) * scale;
            targetCpY = 100 + (targetCpY - 100) * scale;
        }

        // 4. Smooth LERP
        const LERP_FACTOR = 0.04;
        const currentCp = currentCpsRef.current[i];
        currentCp.x += (targetCpX - currentCp.x) * LERP_FACTOR;
        currentCp.y += (targetCpY - currentCp.y) * LERP_FACTOR;

        // 5. Update DOM
        if (pathsRef.current[i]) {
          pathsRef.current[i]!.setAttribute("d", `M 100 100 Q ${currentCp.x} ${currentCp.y} ${x} ${y}`);
        }
        if (circlesRef.current[i]) {
          circlesRef.current[i]!.setAttribute("cx", x.toString());
          circlesRef.current[i]!.setAttribute("cy", y.toString());
        }
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 200;
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 200;
    mouseRef.current.isHovering = true;
  };

  const handlePointerLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <section className="relative w-full min-h-[60vh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-[400px] h-[400px] md:w-[700px] md:h-[700px] flex items-center justify-center">
        
        <svg 
          ref={svgRef}
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 200 200" 
          fill="none"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* DEFINITIONS FOR THE GLOWING LINE EFFECT */}
          <defs>
            <radialGradient id="lineGlow" gradientUnits="userSpaceOnUse" cx="100" cy="100" r="100">
              <stop stopColor="#141fdb" stopOpacity="0.30" offset="0" />
              <stop ref={stop1Ref} stopColor="#141fdb" stopOpacity="0.30" offset="0" />
              <stop ref={stop2Ref} stopColor="#141fdb" stopOpacity="0.8" offset="0" />
              <stop ref={stop3Ref} stopColor="#141fdb" stopOpacity="0.30" offset="0" />
              <stop stopColor="#141fdb" stopOpacity="0.30" offset="1" />
            </radialGradient>
          </defs>

          {/* Render lines and dots */}
          {basePoints.map((pt, index) => (
            <g key={index}>
              <path 
                ref={(el) => { pathsRef.current[index] = el; }}
                stroke="url(#lineGlow)"
                strokeWidth="0.15" 
                fill="none"
              />
              <circle 
                ref={(el) => { circlesRef.current[index] = el; }}
                r={pt.dotRadius} 
                fill="white" 
                className="opacity-70"
              />
            </g>
          ))}
        </svg>

        <div className="w-1 h-1 bg-white rounded-full opacity-30 z-10 pointer-events-none" />

      </div>

    </section>
  );
}