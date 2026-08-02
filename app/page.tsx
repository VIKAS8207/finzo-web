"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BookNowSection from '@/components/home-components/BookNowSection'; 
import CyberButton from '@/components/ui/CyberButton'; 
import ProductivitySection from '@/components/home-components/ProductivitySection';
import FeaturesGridSection from '@/components/home-components/FeaturesGridSection'; // <-- Imported New Component
import ImageExpandSection from '@/components/home-components/ImageExpandSection';

import DataInfrastructureSection from '@/components/home-components/DataInfrastructureSection';
import CaseStudiesSection from '@/components/home-components/CaseStudiesSection';
import FloatingChatBot from '@/components/ui/FloatingChatBot';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLHeadingElement>(null);

  // The text to be animated letter-by-letter
  const revealTextContent = "Integrate with the world's most powerful neural engines. Seamlessly connect your custom data to GPT-4, Claude 3, and Perplexity for unmatched precision. Build agents that don't just process, they understand.";
  const revealWords = revealTextContent.split(' ');

  useGSAP(() => {
    // --- Text Reveal Letter-by-Letter Scroll Animation ---
    gsap.to('.reveal-char', {
      color: '#ffffff',
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRevealRef.current,
        start: "top 80%",    
        end: "bottom 50%", 
        scrub: true,            
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center font-sans overflow-x-hidden relative">
      
      {/* --- AMBIENT ELEMENTS --- */}
      {/* Three Vertical Lines (Divides screen into 4 equal parts) */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
        }}
      >
        <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-white/[0.1] -translate-x-1/2"></div>
        <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-white/[0.1] -translate-x-1/2"></div>
        <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-white/[0.1] -translate-x-1/2"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full flex flex-col items-center overflow-visible">
        
        {/* --- HERO VIDEO BACKGROUND (STABLE LOOP) --- */}
        <div className="absolute top-0 left-0 w-full h-[100vh] z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
            src="/videos/hero.mp4" 
          />
          
          {/* CLASSIC CORNER VIGNETTE */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{
              background: "radial-gradient(circle at center, transparent 50%, #000000 100%)"
            }}
          />
        </div>

        {/* THE GRADIENT */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] pointer-events-none z-0" 
          style={{
            background: "linear-gradient(to bottom, transparent 50%, #050505 95%, #050505 100%)"
          }}
        />

        {/* --- TEXT LAYER (Aligned Bottom-Left) --- */}
        <div className="relative z-10 flex flex-col items-start justify-end text-left px-6 md:px-12 w-full max-w-[full] mx-auto h-screen pb-[15vh] md:pb-[10vh] pointer-events-auto">
          
          {/* --- FLOATING RIGHT TEXT --- */}
          <div className="absolute right-6 md:right-12 top-[15%] md:top-[30%] flex flex-col items-end text-right z-20 pointer-events-none">
            <div className="w-8 md:w-22 h-[1px] bg-white/40 mb-3"></div>
            <p className="text-[8px] md:text-[14px] font-mono text-gray-200 tracking-[0.15em] md:tracking-[0.2em] uppercase mb-1.5">
              Systems Engineering &middot; Applied AI &middot; Manufacturing
            </p>
            <p className="text-[8px] md:text-[13px] font-mono text-gray-500 tracking-[0.15em] md:tracking-[0.2em] uppercase">
              Defense &middot; Intelligence &middot; Healthcare
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-semi-bold tracking-tighter leading-[1.05] mb-6 max-w-6xl">
            One platform.<br/>
            360° visibility.
          </h1>
          
          <p className="text-lg md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
            Real-time financials, job costing, and project management for construction finally in one place.
          </p>
          
          <div className="flex items-center">
            <CyberButton text="Book a demo" />
          </div>

        </div>

        {/* --- SCROLL REVEAL TEXT SECTION --- */}
        <div className="relative z-20 mb-32 w-full max-w-4xl px-6 md:px-0 flex flex-col items-start justify-center mt-32 md:mt-48">
          
          {/* Top Icons Row (Overlapped) */}
          <div className="flex items-center -space-x-4 mb-8">
            <div className="relative z-40 w-12 h-12 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center text-white/60">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div className="relative z-30 w-12 h-12 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center text-white/60">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="relative z-20 w-12 h-12 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center text-white/60">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center text-white/60">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
          </div>

          {/* Main Animated Text */}
          <h2 ref={textRevealRef} className="text-2xl md:text-4xl lg:text-[40px] font-medium tracking-tight leading-[1.25] mb-8">
            {revealWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.3em] whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className="reveal-char text-[#2a2a2a] transition-colors duration-100">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-[#6b6b6b] max-w-2xl leading-relaxed">
            Unlock the full potential of LLM-native workflows. Our infrastructure ensures low latency and high-fidelity output for every request.
          </p>
        </div>

      </section>

      {/* --- NEW FEATURES GRID COMPONENT --- */}
      <FeaturesGridSection />
      <ImageExpandSection />
      <CaseStudiesSection />

      

      
      
      
      <DataInfrastructureSection />
      <ProductivitySection />
      <FloatingChatBot />

     

      {/* --- REST OF THE PAGE --- */}
      <div className="relative z-20 w-full border-none">
        <BookNowSection />
      </div>
      

    </div>
  );
}