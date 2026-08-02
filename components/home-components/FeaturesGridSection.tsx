"use client";

import React from "react";
import Image from "next/image";

export default function FeaturesGridSection() {
  const features = [
    {
      title: "Secure Guard",
      description: "We fortify your AI deployments with robust security protocols. Our team ensures every model adheres to strict data privacy standards.",
      image: "/images/feature-1.png", // Replace with your actual image path
    },
    {
      title: "Agent Build",
      description: "Tailored AI agents designed for your specific needs. We develop custom logic and workflows that integrate deeply with your existing tools.",
      image: "/images/feature-2.png", // Replace with your actual image path
    },
    {
      title: "Cloud Scale",
      description: "Infrastructure optimization for high traffic AI apps. We ensure your systems remain fast, responsive, and ready for any level of demand.",
      image: "/images/feature-3.png", // Replace with your actual image path
    },
    {
      title: "Data Mining",
      description: "Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your organization's future.",
      image: "/images/feature-4.png", // Replace with your actual image path
    }
  ];

  return (
    <section className="relative w-full border-t border-white/[0.05] bg-[#050505]">
      
      {/* Grid Container - No internal borders so the page's ambient lines show through */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col justify-between p-8 md:p-12 min-h-[600px] relative">
            
            {/* Top: Image Container + Constrained Dot Area */}
            <div className="relative flex-1 flex items-center justify-center">
              
              {/* Isolated Dot Background - Slightly larger dots (1.5px) */}
              <div 
                className="absolute inset-x-4 top-4 bottom-8 z-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
                  backgroundSize: '24px 24px',
                  // This mask fades the dots out before they reach the text at the bottom
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
              />

              {/* Image Container sitting above the dots */}
              <div className="relative z-10 w-20 h-20">
                <Image 
                  src={feature.image} 
                  alt={feature.title} 
                  fill 
                  className="object-contain opacity-80"
                />
              </div>
            </div>

            {/* Bottom: Text Content - Safe from dots */}
            <div className="mt-12 relative z-10">
              <h3 className="text-sm font-mono tracking-widest text-white uppercase mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}