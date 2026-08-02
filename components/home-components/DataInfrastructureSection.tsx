"use client";

import React from "react";
import InteractiveDataSphere from "@/components/ui/InteractiveDataSphere";
import CyberButton from "@/components/ui/CyberButton";

export default function DataInfrastructureSection() {
  return (
    <section className="relative w-full bg-[#050505] text-white flex flex-col">
      
      {/* =========================================
          PART 1: THE ARCHITECTURAL HEADER
          ========================================= */}
      <div className="relative w-full border-t border-b border-white/10">
        
        {/* 3 vertical lines dividing the section into 4 strictly equal columns */}
        <div className="absolute inset-0 z-0 flex pointer-events-none opacity-20">
          <div className="w-1/4 h-full border-r border-white/20" />
          <div className="w-1/4 h-full border-r border-white/20" />
          <div className="w-1/4 h-full border-r border-white/20" />
          <div className="w-1/4 h-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 relative z-10">
          <div className="hidden lg:block col-span-1 p-8" />
          
          {/* Header Content spanning 2 columns */}
          <div className="col-span-1 lg:col-span-2 p-8 pt-32 pb-20">
            <div className="flex items-center gap-3 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white opacity-80">
                <path d="M4 18L10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 18L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 18L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xs font-mono tracking-widest uppercase font-bold text-white/80">
                Our Product
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-[72px] font-medium tracking-tight leading-[1.05] mb-8">
              Build logic at <br />
              scale
            </h2>
            
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              Design, deploy, and manage sophisticated AI workflows through an intuitive visual interface. No complex coding—just pure logic.
            </p>
          </div>
          
          <div className="hidden lg:block col-span-1 p-8" />
        </div>
      </div>

      {/* =========================================
          PART 2: THE FULL SCREEN SPHERE LAYOUT
          ========================================= */}
      <div className="relative w-full min-h-[75vh] flex flex-col lg:flex-row p-6 md:p-12 lg:p-20 overflow-visible">
        
        {/* Faint Dotted Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* --- LEFT COLUMN: Typography & CyberButton --- */}
        {/* Adjusted to 35% width, centered vertically, and grouped tighter */}
        <div className="relative z-20 w-full lg:w-[45%] flex flex-col justify-center gap-10 py-12 lg:py-0">
          
          <div>
            {/* Reduced font size for a sharper, more minimal look */}
            <h3 className="text-3xl md:text-4xl lg:text-[48px] font-medium leading-[1.1] tracking-tight mb-6">
              Enterprise-Grade <br className="hidden lg:block" />
              Infrastructure, <br />
              <span className="text-white/30">Engineered to Scale.</span>
            </h3>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-[600px] font-light">
              Interact with our high-performance data visualization engine. Watch neural networks decode, tokenize, and route vast datasets in real-time.
            </p>
          </div>

          <div>
            <CyberButton text="EXPLORE DASHBOARD" className="w-[260px]" />
          </div>
          
        </div>

        {/* --- RIGHT COLUMN: The Masterpiece (Data Sphere) --- */}
        {/* Expanded to 65% width to give the sphere massive presence */}
        <div className="relative z-10 w-full lg:w-[65%] flex items-center justify-center overflow-visible mt-8 lg:mt-0">
          
          {/* Ambient background glow strictly behind the sphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

          {/* The Sphere Container: max-width increased and gently scaled up */}
          <div className="w-full max-w-[900px] lg:max-w-[1000px] xl:max-w-[1200px] scale-150 aspect-square flex items-center justify-center overflow-visible">
            <InteractiveDataSphere />
          </div>

        </div>

      </div>

    </section>
  );
}