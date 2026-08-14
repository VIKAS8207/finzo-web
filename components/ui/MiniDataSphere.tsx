"use client";

import React, { useEffect, useRef } from "react";

// Reduced from 120 to 60 for less clutter at small sizes
const NUM_POINTS = 60; 

const basePoints = Array.from({ length: NUM_POINTS }).map((_, i) => {
  const baseAngle = (i / NUM_POINTS) * Math.PI * 2;
  
  // Deterministic pseudo-random numbers
  const rand1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const rand2 = Math.abs(Math.cos(i * 78.233) * 43758.5453) % 1;

  const bendDirection = rand1 > 0.5 ? 1 : -1;
  const twistIntensity = (Math.PI / 12) + (rand2 * Math.PI / 4); 
  const curveRadius = 30 + (rand1 * 40); 
  const duration = 15 + (rand2 * 15); 
  
  // Slightly larger base dots for visibility at scale
  const dotRadius = Number((1.2 + (rand1 * 1.5)).toFixed(3)); 

  return { baseAngle, bendDirection, twistIntensity, curveRadius, duration, dotRadius };
});

interface MiniDataSphereProps {
  color?: string;
}

export default function MiniDataSphere({ color = "#ffffff" }: MiniDataSphereProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  
  const stop1Ref = useRef<SVGStopElement>(null);
  const stop2Ref = useRef<SVGStopElement>(null);
  const stop3Ref = useRef<SVGStopElement>(null);
  
  const currentCpsRef = useRef(
    basePoints.map(pt => ({
      x: 100 + pt.curveRadius * Math.cos(pt.baseAngle),
      y: 100 + pt.curveRadius * Math.sin(pt.baseAngle)
    }))
  );

  const mouseRef = useRef({ x: 100, y: 100, isHovering: false, hoverIntensity: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const renderLoop = (time: number) => {
      const timeInSeconds = (time - startTime) * 0.001;
      const globalRotation = timeInSeconds * ((Math.PI * 2) / 90);
      const mouse = mouseRef.current;

      mouse.hoverIntensity += (mouse.isHovering ? 0.05 : -0.05);
      mouse.hoverIntensity = Math.max(0, Math.min(1, mouse.hoverIntensity));

      const pulseDuration = 8.0; 
      const rawProgress = (timeInSeconds % pulseDuration) / pulseDuration;
      const pulseProgress = (rawProgress * 1.6) - 0.3;

      if (stop1Ref.current && stop2Ref.current && stop3Ref.current) {
        stop1Ref.current.setAttribute("offset", Math.max(0, Math.min(1, pulseProgress - 0.20)).toString());
        stop2Ref.current.setAttribute("offset", Math.max(0, Math.min(1, pulseProgress)).toString());
        stop3Ref.current.setAttribute("offset", Math.max(0, Math.min(1, pulseProgress + 0.20)).toString());
      }

      basePoints.forEach((pt, i) => {
        const currentAngle = pt.baseAngle + globalRotation;
        
        const x = 100 + 90 * Math.cos(currentAngle); // Slightly tighter radius
        const y = 100 + 90 * Math.sin(currentAngle);

        const sway = Math.sin(timeInSeconds * ((Math.PI * 2) / pt.duration));
        const naturalTwist = pt.twistIntensity * pt.bendDirection * sway;

        const naturalCpX = 100 + pt.curveRadius * Math.cos(currentAngle + naturalTwist);
        const naturalCpY = 100 + pt.curveRadius * Math.sin(currentAngle + naturalTwist);

        let targetCpX = naturalCpX;
        let targetCpY = naturalCpY;

        if (mouse.hoverIntensity > 0) {
          const dx = naturalCpX - mouse.x;
          const dy = naturalCpY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInteractionDist = 80; 

          if (dist < maxInteractionDist) {
            const influence = Math.pow(1 - (dist / maxInteractionDist), 1.5) * mouse.hoverIntensity;
            const mouseAngle = Math.atan2(mouse.y - 100, mouse.x - 100);
            const cpAngle = Math.atan2(naturalCpY - 100, naturalCpX - 100);
            
            let angleDiff = cpAngle - mouseAngle;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            
            const slideDirection = angleDiff >= 0 ? 1 : -1;
            const maxDeflection = Math.PI / 1.5; 
            const angularPush = slideDirection * maxDeflection * influence;

            const finalCpAngle = cpAngle + angularPush;
            const finalRadius = pt.curveRadius + (influence * 15);

            targetCpX = 100 + finalRadius * Math.cos(finalCpAngle);
            targetCpY = 100 + finalRadius * Math.sin(finalCpAngle);
          }
        }

        const clampRadius = 88; 
        const targetDistFromCenter = Math.hypot(targetCpX - 100, targetCpY - 100);
        if (targetDistFromCenter > clampRadius) {
            const scale = clampRadius / targetDistFromCenter;
            targetCpX = 100 + (targetCpX - 100) * scale;
            targetCpY = 100 + (targetCpY - 100) * scale;
        }

        const LERP_FACTOR = 0.04;
        const currentCp = currentCpsRef.current[i];
        currentCp.x += (targetCpX - currentCp.x) * LERP_FACTOR;
        currentCp.y += (targetCpY - currentCp.y) * LERP_FACTOR;

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
    
    // Standard 0-200 mapping since text is removed
    const svgX = ((e.clientX - rect.left) / rect.width) * 200;
    const svgY = ((e.clientY - rect.top) / rect.height) * 200;
    
    mouseRef.current.x = svgX;
    mouseRef.current.y = svgY;
    
    const distFromCenter = Math.hypot(svgX - 100, svgY - 100);
    if (distFromCenter <= 98) {
      mouseRef.current.isHovering = true;
    } else {
      mouseRef.current.isHovering = false;
    }
  };

  const handlePointerLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/[0.05] rounded-full blur-[20px] pointer-events-none" />

      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <defs>
          <radialGradient id="miniLineGlow" gradientUnits="userSpaceOnUse" cx="100" cy="100" r="100">
            <stop stopColor={color} stopOpacity="0.4" offset="0" />
            <stop ref={stop1Ref} stopColor={color} stopOpacity="0.4" offset="0" />
            <stop ref={stop2Ref} stopColor={color} stopOpacity="1" offset="0" />
            <stop ref={stop3Ref} stopColor={color} stopOpacity="0.4" offset="0" />
            <stop stopColor={color} stopOpacity="0.4" offset="1" />
          </radialGradient>
        </defs>

        {basePoints.map((pt, index) => (
          <g key={index}>
            <path
              ref={(el) => { pathsRef.current[index] = el; }}
              stroke="url(#miniLineGlow)"
              strokeWidth="1.2" /* Significantly thicker lines for small scale */
              fill="none"
            />
            <circle
              ref={(el) => { circlesRef.current[index] = el; }}
              r={pt.dotRadius}
              fill={color}
              className="opacity-90"
            />
          </g>
        ))}
      </svg>
      
      {/* 
        CENTER DOT REMOVED
        If you want to shrink it down to your liking instead of removing it completely, 
        uncomment the line below and adjust the pixel values (e.g., w-[2px] h-[2px]).
      */}
      {/* <div className="w-[2px] h-[2px] bg-white rounded-full opacity-50 z-10 pointer-events-none" /> */}
    </div>
  );
}