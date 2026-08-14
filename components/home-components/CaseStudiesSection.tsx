"use client";

import React from "react";

const caseStudies = [
  {
    id: 1,
    company: "cigna",
    year: "2025",
    title: "Cigna Smart Health Systems",
    description: "Revolutionizing patient care through predictive analytics and seamless AI-driven diagnostic integration tools.",
  },
  {
    id: 2,
    company: "aetna",
    year: "2026",
    title: "Aetna Health Data Ecosystem",
    description: "We automated Aetna's member data management using secure AI to provide personalized care and clinical insights.",
  },
  {
    id: 3,
    company: "Anthem",
    year: "2026",
    title: "Anthem Neural Care Network",
    description: "We deployed a custom LLM to automate Anthem's provider relations, reducing ticket latency by eighty-five percent.",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="relative w-full bg-[#e5e5e5] text-[#111] overflow-hidden border-t border-black/10">
      
      {/* ARCHITECTURAL GRID BACKGROUND */}
      {/* 3 vertical lines dividing the section into 4 strictly equal columns */}
      <div className="absolute inset-0 z-0 flex pointer-events-none">
        <div className="w-1/4 h-full border-r border-black/10" />
        <div className="w-1/4 h-full border-r border-black/10" />
        <div className="w-1/4 h-full border-r border-black/10" />
        <div className="w-1/4 h-full" />
      </div>

      <div className="relative z-10 w-full">
        
        {/* HEADER ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-black/10">
          {/* Col 1: Empty to match reference */}
          <div className="hidden lg:block col-span-1 p-8" />
          
          {/* Col 2 & 3: Header Content spanning 2 columns */}
          <div className="col-span-1 lg:col-span-2 p-8 pt-24 pb-20">
            <div className="flex items-center gap-3 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 overflow-visible">
  <defs>
    {/* The View Window is now extremely wide (x="-20", width="64") 
        so it ONLY clips the top (y="7") and bottom (height="10"), allowing the sides to overflow. */}
    <clipPath id="view-window">
      <rect x="-20" y="7" width="64" height="10" />
    </clipPath>
  </defs>
  
  <g clipPath="url(#view-window)">
    {/* Line 1: Overflows left boundary (< 0) */}
    <path d="M-1 20L5 4" stroke="currentColor" strokeWidth="3.5" />
    {/* Line 2 */}
    <path d="M4 20L10 4" stroke="currentColor" strokeWidth="3.5" />
    {/* Line 3: Perfectly Centered */}
    <path d="M9 20L15 4" stroke="currentColor" strokeWidth="3.5" />
    {/* Line 4 */}
    <path d="M14 20L20 4" stroke="currentColor" strokeWidth="3.5" />
    {/* Line 5: Overflows right boundary (> 24) */}
    <path d="M19 20L25 4" stroke="currentColor" strokeWidth="3.5" />
  </g>
</svg>
              <span className="text-xs font-mono tracking-widest uppercase font-bold">Case Studies</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-[72px] font-medium tracking-tight leading-[1.05] mb-8">
              Proven neural <br />
              solutions
            </h2>
            
            <p className="text-[#555] text-sm leading-relaxed max-w-md">
              We partner with industry leaders to deploy bespoke AI agents that solve complex operational hurdles and drive measurable growth.
            </p>
          </div>
          
          {/* Col 4: Empty */}
          <div className="hidden lg:block col-span-1 p-8" />
        </div>

        {/* LIST ROWS */}
        <div className="flex flex-col">
          {caseStudies.map((study) => (
            <div 
              key={study.id} 
              className="grid grid-cols-1 lg:grid-cols-4 border-b border-black/10 group cursor-pointer hover:bg-black/[0.03] transition-colors duration-300"
            >
              
              {/* Col 1: Logo */}
              <div className="col-span-1 p-8 lg:px-12 flex items-center justify-start lg:justify-center">
                <span className="text-2xl font-bold tracking-tighter lowercase flex items-center gap-1">
                  {study.company === "aetna" && <span className="text-lg">♥</span>}
                  {study.company}
                  {study.company === "Anthem" && <span className="text-lg leading-none">✚♥</span>}
                </span>
              </div>

              {/* Col 2: Year Tag */}
              <div className="col-span-1 p-8 lg:pt-12 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 overflow-visible">
                  <defs>
                    <clipPath id={`view-window-${study.id}`}>
                      <rect x="-20" y="7" width="64" height="10" />
                    </clipPath>
                  </defs>
                  <g clipPath={`url(#view-window-${study.id})`}>
                    <path d="M-1 20L5 4" stroke="currentColor" strokeWidth="3.5" />
                    <path d="M4 20L10 4" stroke="currentColor" strokeWidth="3.5" />
                    <path d="M9 20L15 4" stroke="currentColor" strokeWidth="3.5" />
                    <path d="M14 20L20 4" stroke="currentColor" strokeWidth="3.5" />
                    <path d="M19 20L25 4" stroke="currentColor" strokeWidth="3.5" />
                  </g>
                </svg>
                <span className="font-mono text-xs text-[#555] tracking-widest">
                  {study.year}
                </span>
              </div>

              {/* Col 3: Title & Description */}
              <div className="col-span-1 p-8 lg:pt-10 flex flex-col justify-start">
                <h3 className="text-lg font-medium mb-6">
                  {study.title}
                </h3>
                <p className="font-mono text-xs text-[#666] leading-relaxed max-w-[90%]">
                  {study.description}
                </p>
              </div>

              {/* Col 4: Action Arrow */}
              <div className="col-span-1 p-8 flex items-center justify-end lg:justify-end">
                <svg
                  className="w-5 h-6 text-[#111] opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                  width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.61321" cy="1.61321" r="1.5" fill="currentColor"></circle>
                  <circle cx="5.73583" cy="1.61321" r="1.5" fill="currentColor"></circle>
                  <circle cx="5.73583" cy="5.5566" r="1.5" fill="currentColor"></circle>
                  <circle cx="9.85851" cy="5.5566" r="1.5" fill="currentColor"></circle>
                  <circle cx="9.85851" cy="9.5" r="1.5" fill="currentColor"></circle>
                  <circle cx="13.9811" cy="9.5" r="1.5" fill="currentColor"></circle>
                  <circle cx="5.73583" cy="13.4434" r="1.5" fill="currentColor"></circle>
                  <circle cx="9.85851" cy="13.4434" r="1.5" fill="currentColor"></circle>
                  <circle cx="1.61321" cy="17.3868" r="1.5" fill="currentColor"></circle>
                  <circle cx="5.73583" cy="17.3868" r="1.5" fill="currentColor"></circle>
                </svg>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}