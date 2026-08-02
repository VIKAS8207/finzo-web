"use client";

import React from "react";

const caseStudies = [
  {
    id: 1,
    company: "cigna",
    year: "// 2025",
    title: "Cigna Smart Health Systems",
    description: "Revolutionizing patient care through predictive analytics and seamless AI-driven diagnostic integration tools.",
  },
  {
    id: 2,
    company: "aetna",
    year: "// 2026",
    title: "Aetna Health Data Ecosystem",
    description: "We automated Aetna's member data management using secure AI to provide personalized care and clinical insights.",
  },
  {
    id: 3,
    company: "Anthem",
    year: "// 2026",
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
              {/* Abstract slash icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                <path d="M4 18L10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 18L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 18L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
              <div className="col-span-1 p-8 lg:pt-12">
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
                  className="w-5 h-5 text-[#111] opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter"
                >
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}