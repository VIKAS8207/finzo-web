"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollZoomImageProps {
  imageSrc?: string;
  imageAlt?: string;
  pinLengthVh?: number;
  initialWidthVw?: number;
  initialHeightVh?: number;
}

export default function ImageExpandSection({
  imageSrc = "/images/gridbghard.png",
  imageAlt = "Expanding background",
  pinLengthVh = 250, // Controls how long you scroll before it fills the screen
  initialWidthVw = 60,
  initialHeightVh = 60,
}: ScrollZoomImageProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Use matchMedia to disable the scrub on mobile or for reduced motion preferences
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Ties animation progress directly to scroll position[cite: 2]
                pin: pinRef.current, // Pins the inner sticky container[cite: 2]
                anticipatePin: 1,
              },
            })
            .to(imgWrapRef.current, {
              width: "100vw",
              height: "100vh",
              ease: "none", // Required for smooth scrubbing[cite: 2]
            });
        }
      );

      // Mobile/Fallback: Just show the image full screen without the pinned scroll
      mm.add(
        "(max-width: 767px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(imgWrapRef.current, {
            width: "100vw",
            height: "100vh",
          });
        }
      );
    },
    { scope: wrapperRef }
  );

  return (
    // 1. The outer wrapper controls the total scroll distance (e.g., 250vh)[cite: 2]
    <section 
      ref={wrapperRef} 
      className="relative w-full bg-[#050505]"
      style={{ height: `${pinLengthVh}vh` }}
    >
      
      {/* 2. The inner sticky div is the actual pinned viewport[cite: 2] */}
      <div 
        ref={pinRef} 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        
        {/* 3. The image wrapper starts contained and animates to 100vw/100vh[cite: 2] */}
        <div 
          ref={imgWrapRef} 
          className="relative overflow-hidden will-change-[width,height]"
          style={{ width: `${initialWidthVw}vw`, height: `${initialHeightVh}vh` }}
        >
          <Image
            src={imageSrc} 
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}