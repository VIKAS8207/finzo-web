"use client";

import React from "react";
import MiniDataSphere from "@/components/ui/MiniDataSphere";

export default function FeaturesSplitSection() {
  return (
    <section className="relative w-full bg-[#E5E5E5] text-[#050505] border-t border-b border-black/10">
      {/* single center divider line — no 4-col grid here, just left/right split */}
      <div className="absolute hidden lg:block inset-y-0 left-1/2 w-px bg-black/15 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        
        {/* =========================================
            LEFT: CUSTOM FLOW CREATION
            ========================================= */}
        <div className="flex flex-col items-center text-center justify-start p-10 md:p-16 lg:p-20 border-b lg:border-b-0 border-black/15">
          
          {/* Detailed Graphic: Custom Flows (Faded Edges, Symmetrical Size) */}
          <div className="relative w-full max-w-[380px] aspect-square mb-10 flex items-center justify-center mx-auto [mask-image:radial-gradient(circle_at_center,black_45%,transparent_75%)]">
            <svg viewBox="0 0 500 500" className="w-full h-full bg-transparent">
              <defs>
                {/* Soft Drop Shadows */}
                <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.08" />
                </filter>
                <filter id="tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1" />
                </filter>

                {/* Gradients */}
                <linearGradient id="pill-grad" x1="0" y1="0.5" x2="1" y2="0.5">
                  <stop offset="0%" stopColor="#FDBA74" /> {/* Orange */}
                  <stop offset="50%" stopColor="#F472B6" /> {/* Pink */}
                  <stop offset="100%" stopColor="#60A5FA" /> {/* Blue */}
                </linearGradient>
                
                <linearGradient id="design-bg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E0E7FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
                </linearGradient>

                <linearGradient id="line-grad-1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#D1D5DB" />
                </linearGradient>

                <linearGradient id="line-grad-2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D1D5DB" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>

                <radialGradient id="sphere-grad" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D1D5DB" />
                </radialGradient>
              </defs>

              {/* Grid Lines */}
              <path d="M 125 0 L 125 500 M 250 0 L 250 500 M 375 0 L 375 500" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />

              {/* Decorative Spheres */}
              <circle cx="70" cy="110" r="4" fill="url(#sphere-grad)" filter="url(#tooltip-shadow)" />
              <circle cx="430" cy="80" r="5" fill="url(#sphere-grad)" filter="url(#tooltip-shadow)" />
              <circle cx="330" cy="380" r="7" fill="url(#sphere-grad)" filter="url(#tooltip-shadow)" />
              <circle cx="90" cy="440" r="5" fill="url(#sphere-grad)" filter="url(#tooltip-shadow)" />

              {/* Connecting Paths (Drawn behind nodes) */}
              <path d="M -20 60 L 200 60 Q 220 60 220 80 L 220 90 Q 220 110 240 110 L 320 110" fill="none" stroke="url(#line-grad-1)" strokeWidth="2" />
              <path d="M 260 250 L 275 250 Q 285 250 285 240 L 285 205 Q 285 195 295 195 L 320 195" fill="none" stroke="#3B82F6" strokeWidth="2" />
              <path d="M 260 250 L 300 250 Q 315 250 315 265 L 315 295 Q 315 310 330 310 L 390 310" fill="none" stroke="url(#line-grad-1)" strokeWidth="2" />
              <path d="M 50 440 L 140 440 Q 160 440 160 420 L 160 405 Q 160 385 180 385 L 390 385" fill="none" stroke="url(#line-grad-2)" strokeWidth="2" />

              {/* Inactive Nodes Background */}
              <rect x="310" y="90" width="160" height="40" rx="20" fill="white" filter="url(#node-shadow)" />
              <rect x="-20" y="150" width="160" height="40" rx="20" fill="white" filter="url(#node-shadow)" />
              <circle cx="95" cy="170" r="3.5" fill="#D1D5DB" />
              
              <rect x="105" y="305" width="155" height="40" rx="20" fill="white" filter="url(#node-shadow)" />
              <rect x="385" y="365" width="160" height="40" rx="20" fill="white" filter="url(#node-shadow)" />

              {/* Main Node 1: Project Research */}
              <circle cx="85" cy="215" r="4" fill="#10B981" />
              <text x="97" y="219" fontFamily="monospace" fontSize="12" fill="#111827" fontWeight="600">Your Audit Flow</text>
              <rect x="65" y="225" width="195" height="48" rx="24" fill="white" filter="url(#node-shadow)" />
              <path d="M 87 250 L 93 256 L 103 244" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="125" y="231" width="76" height="36" rx="18" fill="white" stroke="url(#pill-grad)" strokeWidth="3" filter="url(#tooltip-shadow)" />
              <circle cx="163" cy="249" r="4.5" fill="none" stroke="#3B82F6" strokeWidth="3" />
              <circle cx="230" cy="249" r="10" fill="#F3F4F6" />
              <circle cx="230" cy="249" r="2.5" fill="#111827" />
              <text x="89" y="295" fontFamily="sans-serif" fontSize="10" fill="#9CA3AF" textAnchor="middle">Invoice</text>
              <text x="163" y="295" fontFamily="sans-serif" fontSize="10" fill="#111827" fontWeight="600" textAnchor="middle">Approval</text>
              <text x="230" y="295" fontFamily="sans-serif" fontSize="10" fill="#9CA3AF" textAnchor="middle">Payment</text>

              {/* Main Node 2: Design */}
              <circle cx="325" cy="160" r="4" fill="#EF4444" />
              <text x="337" y="164" fontFamily="monospace" fontSize="12" fill="#111827" fontWeight="600">Start Flow 1</text>
              <rect x="310" y="170" width="200" height="48" rx="24" fill="url(#design-bg)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#node-shadow)" />
              <circle cx="355" cy="194" r="14" fill="white" />
              <circle cx="355" cy="194" r="4.5" fill="#3B82F6" />
              <circle cx="430" cy="194" r="10" fill="#F3F4F6" />
              <circle cx="430" cy="194" r="2.5" fill="#111827" />
              <text x="355" y="238" fontFamily="sans-serif" fontSize="10" fill="#9CA3AF" textAnchor="middle">Diffrence Report</text>
              <text x="430" y="238" fontFamily="sans-serif" fontSize="10" fill="#9CA3AF" textAnchor="middle">Feedback</text>
              
              

              {/* Main Node 3: Development */}
              <circle cx="410" cy="275" r="4" fill="#F59E0B" />
              <text x="422" y="279" fontFamily="monospace" fontSize="12" fill="#111827" fontWeight="600">Audit</text>
              <rect x="385" y="285" width="150" height="48" rx="24" fill="white" filter="url(#node-shadow)" />
              <circle cx="430" cy="309" r="10" fill="#F3F4F6" />
              <circle cx="430" cy="309" r="2.5" fill="#111827" />
              <text x="430" y="353" fontFamily="sans-serif" fontSize="10" fill="#9CA3AF" textAnchor="middle">Audit 19</text>
            </svg>
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
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
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-black/60">
              Custom Flows
            </span>
          </div>

          {/* Description */}
          <p className="text-black/50 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8 h-auto md:h-16">
            Drag, connect, and configure every step by hand. No rigid templates —
            just a visual canvas that bends to how your business actually runs.
          </p>

          {/* Bullets */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
            {["Drag-and-drop step builder", "Conditional branching & approvals", "Reusable flow templates"].map((f) => (
              <div key={f} className="flex items-center justify-center gap-3 text-sm text-black/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141fdb]" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* =========================================
            RIGHT: APPLIED AI
            ========================================= */}
        <div className="flex flex-col items-center text-center justify-start p-10 md:p-16 lg:p-20">

          {/* Mini Data Sphere (Symmetrical Size, Match Left Side) */}
          <div className="relative w-full max-w-[380px] aspect-square mb-10 flex items-center justify-center mx-auto overflow-hidden [mask-image:radial-gradient(circle_at_center,black_50%,transparent_90%)]">
            <div className="w-[120%] h-[120%] flex items-center justify-center">
              <MiniDataSphere color="#3B82F6" />
            </div>
          </div>

          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
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
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-black/60">
              Applied AI
            </span>
          </div>

          {/* Description */}
          <p className="text-black/50 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-8 h-auto md:h-16">
            From parsing inbound bills to flagging reconciliation variances,
            our models sit inside every flow — reading, matching, and deciding
            in real time.
          </p>

          {/* Bullets */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
            {["Document parsing & GL coding", "Anomaly & variance detection", "Natural language flow queries"].map((f) => (
              <div key={f} className="flex items-center justify-center gap-3 text-sm text-black/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141fdb]" />
                {f}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}