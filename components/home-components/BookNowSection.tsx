"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CyberButton from '@/components/ui/CyberButton'; // Import the new reusable button

// Register ScrollTrigger so the animation waits until the user scrolls to it
gsap.registerPlugin(ScrollTrigger);

export default function BookNowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Left side slides in from the left
    gsap.from(leftRef.current, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", 
        toggleActions: "play none none reverse"
      }
    });

    // Right side slides in from the right
    gsap.from(rightRef.current, {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* The Centered Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,rgba(5,5,5,0)_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Asymmetrical Grid Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* --- Left Content (col-span-8 for maximum space) --- */}
          <div ref={leftRef} className="lg:col-span-8 flex flex-col items-start">
            
            {/* Mockup of the Forbes Badge */}
            <div className="flex mb-8 rounded overflow-hidden shadow-lg border border-white/10">
              <div className="bg-white text-black px-3 py-2 flex flex-col justify-center">
                <span className="text-[11px] font-bold tracking-tight leading-none">Forbes</span>
                <span className="text-[10px] font-medium tracking-widest text-gray-600 leading-tight">ADVISOR</span>
                <span className="text-[11px] font-bold text-blue-700 mt-1 leading-none">BEST OF<br/>2026</span>
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 flex flex-col justify-center max-w-[130px]">
                <span className="text-[10px] leading-tight font-medium opacity-90">Premier Construction Software</span>
                <span className="text-[10px] font-bold mt-1">Best Construction ERP</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
              Industry-leading<br />
              cloud-based construction<br />
              ERP software
            </h2>
          </div>

          {/* --- Right Content (col-span-4 for smaller, tighter space) --- */}
          <div ref={rightRef} className="lg:col-span-4 flex flex-col items-start mt-8 lg:mt-0">
            <p className="text-base text-gray-300 w-full leading-relaxed mb-8">
              Control job costs, cash flow, and risk with one AI-powered construction ERP system. Unite your field teams and office in a single easy-to-use, modern platform.
            </p>

            {/* --- The Reusable Cyber-Industrial Button --- */}
            {/* You can now change the text dynamically if needed, e.g., text="Get Started" */}
            <CyberButton text="Build A Workflow" />
            
          </div>
        </div>
      </div>
    </section>
  );
}