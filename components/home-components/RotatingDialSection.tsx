"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';

// ============================================================================
// IMAGE CONFIGURATION: Put your local image paths here (e.g., "/images/1.png")
// ============================================================================
const CENTER_LOGO_SRC = "/images/finzologo.png";

const LEFT_NODE_IMAGES = [
  "/images/epicor.webp",
  "/images/infor.webp",
  "/images/microsoft.png",
  "/images/odoo.png",
];

const RIGHT_NODE_IMAGES = [
  "/images/oracle.png",
  "/images/sap.png",
  "/images/tally.png",
  "/images/odoo.png",
];
// ============================================================================

export default function StringWorkflow() {
  const endPointsY = [-200, 0, 150, 300, 420, 500, 580, 700, 850, 1000, 1200];

  const leftImageIndices = [2, 4, 7, 9];
  const rightImageIndices = [1, 5, 8, 10];

  const sectionRef = useRef<HTMLElement>(null);
  const leftPathsRef = useRef<(SVGPathElement | null)[]>([]);
  const rightPathsRef = useRef<(SVGPathElement | null)[]>([]);
  
  // States to control the entrance animation sequence
  const [isVisible, setIsVisible] = useState(false);
  const [linesDrawn, setLinesDrawn] = useState(false);
  const visibleStartTimeRef = useRef<number | null>(null);

  // 1. Observe when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Triggers when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Trigger the images to start flowing 2 seconds after becoming visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setLinesDrawn(true);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // 3. Main physics and drawing loop
  useEffect(() => {
    let animationFrameId: number;

    const renderLoop = (time: number) => {
      // Pause loop logic until the section is visible
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      if (visibleStartTimeRef.current === null) {
        visibleStartTimeRef.current = time;
      }

      const timeInSeconds = (time - visibleStartTimeRef.current) * 0.001;

      // Calculate the drawing progress for the entrance animation (0 to 1 over 2 seconds)
      const rawProgress = Math.min(1, timeInSeconds / 2.0);
      // Smooth easing function so it starts fast and glides smoothly into the center
      const drawProgress = 1 - Math.pow(1 - rawProgress, 4);

      // --- INDEPENDENT HORIZONTAL BENDING (LEFT & RIGHT SWAY) ---
      leftPathsRef.current.forEach((path, i) => {
        if (!path) return;
        const y = endPointsY[i];
        
        const speed1 = 0.5 + (i % 3) * 0.2; 
        const speed2 = 0.4 + (i % 2) * 0.3;
        
        const swayX1 = Math.sin(timeInSeconds * speed1 + i) * (150 + (i % 4) * 80); 
        const swayX2 = Math.cos(timeInSeconds * speed2 + i * 2) * (200 + (i % 3) * 60); 
        
        const cx1 = 400 + swayX1; 
        const cy1 = y;            
        const cx2 = 600 + swayX2; 
        const cy2 = 500;          

        path.setAttribute("d", `M 0 ${y} C ${cx1} ${cy1}, ${cx2} ${cy2}, 1000 500`);
        
        // Apply the drawing animation
        path.style.strokeDasharray = "2500";
        path.style.strokeDashoffset = `${2500 * (1 - drawProgress)}`;
      });

      rightPathsRef.current.forEach((path, i) => {
        if (!path) return;
        const y = endPointsY[i];
        
        const speed1 = 0.45 + (i % 3) * 0.25; 
        const speed2 = 0.55 + (i % 2) * 0.2;
        
        const swayX1 = Math.sin(timeInSeconds * speed1 + i * 1.5) * (150 + (i % 4) * 80); 
        const swayX2 = Math.cos(timeInSeconds * speed2 + i * 2.5) * (200 + (i % 3) * 60); 
        
        const cx1 = 1600 + swayX1; 
        const cy1 = y;
        const cx2 = 1400 + swayX2; 
        const cy2 = 500;

        path.setAttribute("d", `M 2000 ${y} C ${cx1} ${cy1}, ${cx2} ${cy2}, 1000 500`);
        
        // Apply the drawing animation
        path.style.strokeDasharray = "2500";
        path.style.strokeDashoffset = `${2500 * (1 - drawProgress)}`;
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center font-sans">
      
      {/* --- TOP HEADING --- */}
      <div className={`absolute top-24 md:top-32 left-1/2 -translate-x-1/2 z-20 w-full text-center px-6 transition-all duration-1000 delay-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white">
          Connect your tools
        </h2>
      </div>

      {/* --- 1. THE STRINGS & IMAGES (SVG CANVAS) --- */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
        viewBox="0 0 2000 1000" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="circle-clip">
            <circle cx="0" cy="0" r="22" />
          </clipPath>
        </defs>

        <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" fill="none">
          
          {/* =========================================
              LEFT SIDE: STRINGS & IMAGES
              ========================================= */}
          {endPointsY.map((y, i) => {
            const pathId = `left-path-${i}`;
            const hasImage = leftImageIndices.includes(i);
            
            const duration = 6 + (i % 6) * 1.5; 
            const delay = -1 * (i % 6) * 1.5; 

            const arrayIndex = leftImageIndices.indexOf(i);

            return (
              <React.Fragment key={pathId}>
                {/* The physical string */}
                <path 
                  id={pathId} 
                  ref={(el) => { leftPathsRef.current[i] = el; }} 
                />
                
                {/* The Traveling Image Container (Only mounts after lines are drawn) */}
                {hasImage && linesDrawn && (
                  <g>
                    <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite">
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    
                    <g>
                      <animateTransform attributeName="transform" type="scale" values="1; 1; 0.2" keyTimes="0; 0.7; 1" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
                      
                      <circle cx="0" cy="0" r="22" fill="#0a0a0a" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
                      <image 
                        href={LEFT_NODE_IMAGES[arrayIndex]} 
                        x="-22" y="-22" width="44" height="44" 
                        clipPath="url(#circle-clip)" 
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                )}
              </React.Fragment>
            );
          })}

          {/* =========================================
              RIGHT SIDE: STRINGS & IMAGES
              ========================================= */}
          {endPointsY.map((y, i) => {
            const pathId = `right-path-${i}`;
            const hasImage = rightImageIndices.includes(i);
            
            const duration = 6.5 + (i % 6) * 1.5; 
            const delay = -1 * ((i + 3) % 6) * 1.4; 

            const arrayIndex = rightImageIndices.indexOf(i);

            return (
              <React.Fragment key={pathId}>
                {/* The physical string */}
                <path 
                  id={pathId} 
                  ref={(el) => { rightPathsRef.current[i] = el; }} 
                />

                {/* The Traveling Image Container (Only mounts after lines are drawn) */}
                {hasImage && linesDrawn && (
                  <g>
                    <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite">
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    <g>
                      <animateTransform attributeName="transform" type="scale" values="1; 1; 0.2" keyTimes="0; 0.7; 1" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.1; 0.9; 1" dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
                      
                      <circle cx="0" cy="0" r="22" fill="#0a0a0a" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
                      <image 
                        href={RIGHT_NODE_IMAGES[arrayIndex]} 
                        x="-22" y="-22" width="44" height="44" 
                        clipPath="url(#circle-clip)" 
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                )}
              </React.Fragment>
            );
          })}
          
        </g>
      </svg>

      {/* --- 2. THE MIDDLE LOGO CONTAINER --- */}
      {/* Fades in and scales up right as the lines finish drawing */}
      <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 bg-[#050505] rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-[1500ms] ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
        <div className="absolute inset-0 rounded-full bg-white/5 blur-md pointer-events-none" />
        
        {/* Local Finzo Logo Image */}
        <img 
          src={CENTER_LOGO_SRC} 
          alt="Finzo Core" 
          className="relative z-20 w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>

      {/* --- BOTTOM DESCRIPTION --- */}
      <div className={`absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 w-full text-center px-6 transition-all duration-1000 delay-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto leading-relaxed">
          Link your CRM, billing system, accounting stack, and more in a few clicks.
        </p>
      </div>

    </section>
  );
}