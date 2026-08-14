"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CyberButton from '@/components/ui/CyberButton';

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#050505] text-white border-t border-white/10 flex flex-col font-sans overflow-hidden">
      
      {/* Texture Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* --- TOP SECTION: NEWSLETTER --- */}
      <div className="relative z-10 w-full border-b border-white/10 overflow-hidden bg-[#050505]">
        
        {/* Background Video */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 10%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)'
          }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale"
            src="/videos/Video.mp4" 
          />
        </div>

        {/* Continuous Vertical Lines (Matches Middle Section Exactly with grid-cols-4) */}
        <div className="absolute inset-0 hidden md:grid grid-cols-4 divide-x divide-white/10 pointer-events-none z-0">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Content Wrapper - LEFT ALIGNED */}
        <div className="relative z-10 flex flex-col items-start justify-center py-32 px-10 md:px-16 w-full max-w-7xl">
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
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-300">Get Started</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-left max-w-3xl leading-[1.1]">
            Get smarter about<br />AI systems
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base mb-12 text-left max-w-lg shadow-black drop-shadow-md">
            Weekly insights on automation, AI workflows, and real builds. No fluff, just what works.
          </p>

          {/* Custom Input Group */}
          <div className="flex w-full max-w-md bg-[#050505] border border-white/20 p-1.5 focus-within:border-white/50 transition-colors shadow-2xl">
            <input
              type="email"
              placeholder="vikas@finzo.com"
              className="flex-1 bg-transparent text-white px-4 py-2 outline-none text-sm placeholder:text-gray-600 font-sans"
            />
            
            <div className="shrink-0">
              <CyberButton text="Subscribe" className="w-[140px] md:w-[160px]" />
            </div>
            
          </div>
        </div>
      </div>

      {/* --- MIDDLE SECTION: FULL-WIDTH GRID LINKS --- */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10 bg-[#050505]">
        
        {/* Column 1: Logo */}
        <div className="p-10 md:p-16 flex items-start justify-start">
          <Link href="/" className="flex items-center gap-2 group">
             <Image src="/images/finzologo.png" alt="Finzo" width={22} height={22} className="w-8 h-8 object-contain" />
             <span className="text-3xl font-bold text-white">finzo</span>
          </Link>
        </div>

        {/* Column 2: Quick Links */}
        <div className="p-10 md:p-16 flex flex-col gap-8">
          <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Projects</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Articles</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="p-10 md:p-16 flex flex-col gap-8">
          <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">Company</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Book A Call</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">More Templates</Link></li>
          </ul>
        </div>

        {/* Column 4: Policies & Socials */}
        <div className="p-10 md:p-16 flex flex-col gap-8">
          <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">Policies</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-300 mb-4">
            <li><Link href="/" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
          
          {/* Social Icons Grid */}
          <div className="flex gap-2">
            {['X', 'In', 'Yt', 'Ig'].map((social) => (
              <div key={social} className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono hover:bg-white hover:text-black transition-colors cursor-pointer">
                {social}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: GIANT TYPOGRAPHY --- */}
      {/* Removed the bottom padding to tightly hug the text */}
      <div className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-end pt-12 bg-[#050505]">
        
        {/* Massive Text: Translated down to cut off the bottom 10-15% */}
        <h1 className="text-[26vw] leading-[0.75] font-medium font-black tracking-normal text-[#e5e5e5] text-center w-full select-none translate-y-[12%]">
          Finzo AI
        </h1>
        
        {/* Smoother bottom edge gradient blur effect */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-20" />
      </div>
      
    </footer>
  );
}