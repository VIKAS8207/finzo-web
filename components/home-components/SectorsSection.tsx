"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CyberButton from '@/components/ui/CyberButton'; 

gsap.registerPlugin(ScrollTrigger);

// Mathematical helper to place items in a strict, non-overlapping circle
const getCircleItemStyle = (index: number, total: number, radius: number) => {
  const angle = (index / total) * 360;
  return {
    transform: `rotate(${angle}deg) translateY(-${radius}px)`,
    transformOrigin: "center center",
  };
};

// Abstract/Cyber placeholder images
const placeholderImg = "/images/sector-1.jpg"; 
const placeholderImg2 = "/images/sector-2.jpg";
const placeholderImg3 = "/images/sector-3.jpg";

export default function SectorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --- 1. INFINITE ROTATION ANIMATIONS ---
    gsap.to('.ring-1', { rotation: 360, duration: 40, repeat: -1, ease: "none" });
    gsap.to('.ring-2', { rotation: -360, duration: 60, repeat: -1, ease: "none" });
    gsap.to('.ring-3', { rotation: 360, duration: 80, repeat: -1, ease: "none" });

    // --- 2. SCROLL SCRUB ANIMATION (Applied to the background rings) ---
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "bottom top",   
        scrub: 1,            
      }
    });

    scrollTl
      .fromTo(backgroundRef.current, 
        { scale: 0.3, opacity: 0 }, 
        { scale: 1.1, opacity: 1, duration: 0.35, ease: "power2.out" }
      )
      .to(backgroundRef.current, { scale: 1.1, opacity: 1, duration: 0.3 })
      .to(backgroundRef.current, { scale: 1.6, opacity: 0, duration: 0.35, ease: "power2.in" });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[100vh] bg-[#050505] flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      
      {/* --- BACKGROUND LAYER (Rings & Center Image) --- */}
      {/* Hidden on mobile (hidden md:flex) as requested */}
      <div ref={backgroundRef} className="absolute inset-0 w-full h-full hidden md:flex items-center justify-center pointer-events-none z-0">
        
        {/* Mask to fade top and bottom edges smoothly */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          
          {/* CENTER FIXED IMAGE */}
          <div className="absolute w-[140px] h-[140px] rounded-full overflow-hidden border border-white/20 z-10 ml-[50%] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
             {/* Using a placeholder avatar, replace src with your desired image */}
             <img src="/images/avatar.jpg" alt="Core Profile" className="w-full h-full object-cover grayscale opacity-90" />
             <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay"></div>
          </div>

          {/* INNER RING */}
          <div className="ring-1 absolute w-0 h-0 ml-[50%]"> 
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={`ring1-${i}`} 
                className="absolute -top-[24px] -left-[16px] w-[32px] h-[48px] overflow-hidden rounded-[1px] opacity-60 border border-white/10"
                style={getCircleItemStyle(i, 12, 240)}
              >
                <img src={i % 2 === 0 ? placeholderImg : placeholderImg2} alt="Sector" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            ))}
          </div>

          {/* MIDDLE RING */}
          <div className="ring-2 absolute w-0 h-0 ml-[50%]">
            {Array.from({ length: 18 }).map((_, i) => (
              <div 
                key={`ring2-${i}`} 
                className="absolute -top-[30px] -left-[20px] w-[40px] h-[60px] overflow-hidden rounded-[1px] opacity-80 border border-white/10"
                style={getCircleItemStyle(i, 18, 460)}
              >
                <img src={i % 2 === 0 ? placeholderImg3 : placeholderImg} alt="Sector" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            ))}
          </div>

          {/* OUTER RING */}
          <div className="ring-3 absolute w-0 h-0 ml-[50%]">
            {Array.from({ length: 28 }).map((_, i) => (
              <div 
                key={`ring3-${i}`} 
                className="absolute -top-[36px] -left-[24px] w-[48px] h-[72px] overflow-hidden rounded-[1px] opacity-40 border border-white/10"
                style={getCircleItemStyle(i, 28, 700)}
              >
                <img src={i % 2 === 0 ? placeholderImg2 : placeholderImg3} alt="Sector" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FOREGROUND CONTENT LAYER (Grid Structure) --- */}
      {/* A full-height grid splitting the screen. Right side is empty to expose the rings. */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 pointer-events-auto">
        
        {/* The Left Panel (Stretches 100vh with vertical border lines) */}
        <div className="h-full w-full border-x border-white/10 bg-black/50 backdrop-blur-xl flex flex-col justify-center p-8 md:p-14 relative">
          
          {/* Cyber-Industrial Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30"></div>

          {/* Subheading / Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-yellow-500 block"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">
              System Architecture
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
            Engineered for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              absolute scale.
            </span>
          </h2>

          {/* Description Paragraph */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-md">
            Deploy advanced logical structures without sacrificing visual fidelity. We build systems that adapt, rotate, and scale seamlessly into your operational requirements.
          </p>

          {/* Call to Action Container */}
          <div className="w-full flex items-center justify-between border-t border-white/10 pt-8 mt-auto md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Current Status</span>
              <span className="text-xs font-semibold text-white tracking-wider">ONLINE // ACTIVE</span>
            </div>
            
            <CyberButton text="Initialize" className="w-[160px]" />
          </div>

        </div>

        {/* The Right Panel (Empty, allows the background rings to show through) */}
        <div className="hidden md:block h-full w-full"></div>

      </div>

      {/* Subtle Grain Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

    </section>
  );
}