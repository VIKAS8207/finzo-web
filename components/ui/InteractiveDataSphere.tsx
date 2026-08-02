"use client";

import React, { useEffect, useRef } from "react";

const NUM_POINTS = 120;
const LABELS = ["INVOICE...", "AUDIT...", "FINANCE...", "AI WORKFLOW...", "AUToMATION..."];

// Pre-calculate the base characteristics of each point
const basePoints = Array.from({ length: NUM_POINTS }).map((_, i) => {
  const baseAngle = (i / NUM_POINTS) * Math.PI * 2;
  
  // Deterministic pseudo-random numbers
  const rand1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  const rand2 = Math.abs(Math.cos(i * 78.233) * 43758.5453) % 1;

  const bendDirection = rand1 > 0.5 ? 1 : -1;
  const twistIntensity = (Math.PI / 12) + (rand2 * Math.PI / 4); 
  const curveRadius = 30 + (rand1 * 40); 
  const duration = 15 + (rand2 * 15); 
  
  // Randomize the dot size and fix to 3 decimals for hydration safety
  const dotRadius = Number((0.3 + (rand1 * 1.1)).toFixed(3)); 

  return { baseAngle, bendDirection, twistIntensity, curveRadius, duration, dotRadius };
});

export default function InteractiveDataSphere() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const textsRef = useRef<(SVGTextElement | null)[]>([]);
  
  const stop1Ref = useRef<SVGStopElement>(null);
  const stop2Ref = useRef<SVGStopElement>(null);
  const stop3Ref = useRef<SVGStopElement>(null);
  
  const currentCpsRef = useRef(
    basePoints.map(pt => ({
      x: 100 + pt.curveRadius * Math.cos(pt.baseAngle),
      y: 100 + pt.curveRadius * Math.sin(pt.baseAngle)
    }))
  );
  
  // Track the text lifecycle and guarantee initial overlap-free spawning
  const textCycleRef = useRef(-1);
  const textDataRef = useRef(
    LABELS.map((_, i) => {
      const segment = (Math.PI * 2) / LABELS.length;
      return {
        baseAngle: (i * segment) + (Math.random() * segment), // Confined to its own slice
        radius: 112 + Math.random() * 10 // Pushed out to 112 to prevent touching dots
      };
    })
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

      // --- SYNCHRONIZED ORBITING TEXT LABELS LOGIC ---
      const TEXT_CYCLE_DURATION = 8.0; 
      const currentCycle = Math.floor(timeInSeconds / TEXT_CYCLE_DURATION);
      const textLife = (timeInSeconds % TEXT_CYCLE_DURATION) / TEXT_CYCLE_DURATION;

      if (currentCycle !== textCycleRef.current) {
        textCycleRef.current = currentCycle;
        const segment = (Math.PI * 2) / LABELS.length;
        
        textDataRef.current.forEach((t, i) => {
          // Guarantee no overlaps by keeping each text in its own random slice of the pie
          t.baseAngle = (i * segment) + (Math.random() * segment);
          // Strict padding: 112 minimum radius guarantees the text box never clips the dots
          t.radius = 112 + Math.random() * 10;
        });
      }

      const textOpacity = Math.sin(textLife * Math.PI);

      LABELS.forEach((_, i) => {
        const data = textDataRef.current[i];
        const currentAngle = data.baseAngle + globalRotation; 

        const x = 100 + data.radius * Math.cos(currentAngle);
        const y = 100 + data.radius * Math.sin(currentAngle);

        if (textsRef.current[i]) {
          textsRef.current[i]!.setAttribute("x", x.toString());
          textsRef.current[i]!.setAttribute("y", y.toString());
          textsRef.current[i]!.setAttribute("opacity", (textOpacity * 0.85).toString());
        }
      });

      // --- CORE PHYSICS & RENDER LOOP ---
      basePoints.forEach((pt, i) => {
        const currentAngle = pt.baseAngle + globalRotation;
        
        const x = 100 + 98 * Math.cos(currentAngle);
        const y = 100 + 98 * Math.sin(currentAngle);

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

        const clampRadius = 94; 
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
    
    // Correct mapping for the wider viewBox="-40 -40 280 280" (Width is 280, starting at -40)
    const svgX = ((e.clientX - rect.left) / rect.width) * 280 - 40;
    const svgY = ((e.clientY - rect.top) / rect.height) * 280 - 40;
    
    mouseRef.current.x = svgX;
    mouseRef.current.y = svgY;
    
    // Check if the mouse is physically inside the circle bounds (radius 98)
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
    <div className="relative w-full max-w-[500px] lg:max-w-[700px] aspect-square flex items-center justify-center">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full" 
        viewBox="-40 -40 280 280" 
        fill="none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <defs>
          <radialGradient id="lineGlow" gradientUnits="userSpaceOnUse" cx="100" cy="100" r="100">
            <stop stopColor="White" stopOpacity="0.30" offset="0" />
            <stop ref={stop1Ref} stopColor="White" stopOpacity="0.30" offset="0" />
            <stop ref={stop2Ref} stopColor="White" stopOpacity="0.8" offset="0" />
            <stop ref={stop3Ref} stopColor="White" stopOpacity="0.30" offset="0" />
            <stop stopColor="White" stopOpacity="0.30" offset="1" />
          </radialGradient>
        </defs>

        {/* Outer Orbiting Text Labels */}
        {LABELS.map((label, index) => (
          <text
            key={label}
            ref={(el) => { textsRef.current[index] = el; }}
            fontSize="2.5"
            fill="white"
            className="font-mono tracking-[0.1em] uppercase pointer-events-none"
            textAnchor="middle"
            alignmentBaseline="middle"
            opacity="0"
          >
            {label}
          </text>
        ))}

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
  );
} 