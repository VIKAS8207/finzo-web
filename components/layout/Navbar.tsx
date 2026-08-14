"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- Pure CSS Animated Desktop Link ---
const AnimatedLink = ({ title, href }: { title: string, href: string }) => {
  return (
    <Link href={href} className="relative inline-flex items-center gap-2 py-1 group overflow-hidden cursor-pointer">
      {/* Text Roll Container */}
      <div className="relative flex flex-col items-center justify-center h-[14px] overflow-hidden">
        <span className="text-[12px] lg:text-[13px] font-mono tracking-[0.15em] lg:tracking-[0.2em] uppercase text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-full block leading-none">
          {title}
        </span>
        <span className="text-[12px] lg:text-[13px] font-mono tracking-[0.15em] lg:tracking-[0.2em] uppercase text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-full absolute top-full left-0 block leading-none">
          {title}
        </span>
      </div>
      {/* Animated Underline */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
    </Link>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  
  // Strict click-state for Desktop Dropdown
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);

  const toggleMobileSubmenu = (menu: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
  };

  const toggleDesktopDropdown = () => {
    setIsDesktopDropdownOpen(!isDesktopDropdownOpen);
  };

  // Reusable Component for Mobile Nav Items
  const NavItem = ({ title, hasSubmenu = false, submenuId = "" }: { title: string, hasSubmenu?: boolean, submenuId?: string }) => {
    const isSubOpen = openMobileSubmenu === submenuId;
    return (
      <div className="flex flex-col border-b border-white/10 last:border-none">
        <button 
          onClick={() => hasSubmenu ? toggleMobileSubmenu(submenuId) : setIsMobileMenuOpen(false)}
          className="group w-full flex items-center justify-between py-6 px-4 text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center text-xl font-medium text-gray-200">
            <span className="group-hover:translate-x-3 transition-transform duration-500 ease-out group-hover:text-white">
              {title}
            </span>
          </div>
          {hasSubmenu && (
            <div className="text-gray-400 group-hover:text-white transition-colors">
              <span className="text-xl font-mono">{isSubOpen ? 'x' : '+'}</span>
            </div>
          )}
        </button>

        {hasSubmenu && (
          <div className={`grid transition-all duration-500 ease-in-out bg-black/20 ${isSubOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <ul className="flex flex-col divide-y divide-white/5 border-t border-white/5">
                {['General Inquiries', 'Support', 'Press'].map((subItem) => (
                  <li key={subItem}>
                    <Link 
                      href="#" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center py-4 px-8 text-sm text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-white transition-colors mr-4" />
                      {subItem}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      
      {/* --- DESKTOP INLINE HEADER --- */}
      <header className="fixed top-0 left-0 w-full h-[90px] px-6 md:px-12 flex items-center justify-between z-[110] bg-[#050505]/0 pointer-events-auto">
        
        {/* LEFT: Logo Image Container */}
        <div className="flex items-center h-full w-[150px] md:w-[200px] relative z-10">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={() => { setIsMobileMenuOpen(false); setIsDesktopDropdownOpen(false); }}>
            <div className="relative w-24 h-8 md:w-32 md:h-10">
              <Image 
                src="/images/finzowhite.png" 
                alt="Finzo Logo" 
                fill 
                sizes="(max-width: 768px) 96px, 128px"
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* CENTER ALIGNED LINKS */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-14">
          <AnimatedLink title="About" href="/about" />
          <AnimatedLink title="Product" href="/product" />
          <AnimatedLink title="Case studies" href="/case-studies" />
        </nav>

        {/* FAR RIGHT LINKS & HAMBURGER CONTAINER */}
        <div className="flex items-center justify-end w-[150px] md:w-[200px] gap-8 lg:gap-14 relative z-10">
          
          <div className="hidden md:flex items-center gap-8 lg:gap-14">
            
            {/* CLICK DROPDOWN TRIGGER */}
            <button 
              onClick={toggleDesktopDropdown}
              className="flex items-center gap-2 text-[12px] lg:text-[13px] font-mono tracking-[0.15em] lg:tracking-[0.2em] text-white uppercase group py-1 overflow-hidden"
            >
              {/* Text Roll Container for Button */}
              <div className="relative flex flex-col items-center justify-center h-[14px] overflow-hidden">
                <span className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full block leading-none">Company</span>
                <span className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full absolute top-full left-0 block leading-none">Company</span>
              </div>
              <span className={`text-[16px] leading-none transition-transform duration-500 ease-in-out origin-center flex items-center justify-center ${isDesktopDropdownOpen ? 'rotate-45' : 'rotate-0'}`}>
                +
              </span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON (PURE CSS) -> Hidden on Desktop */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-4 py-4 px-2 transition-colors cursor-pointer group"
            >
              <div className="flex flex-col justify-center gap-[6px] w-6 h-6 relative">
                <span className={`block w-full h-[2px] bg-white origin-center transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                <span className={`block w-full h-[2px] bg-white origin-center transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
              </div>
            </button>
          </div>
          
        </div>
      </header>

      {/* --- DESKTOP MEGA DROPDOWN (PURE CSS) --- */}
      <div 
        className="hidden md:block fixed top-0 left-0 w-full h-screen overflow-hidden z-[105] pointer-events-none"
      >
        <div 
          className={`w-full bg-[#050505] border-b border-white/10 pointer-events-auto pt-[90px] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isDesktopDropdownOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {/* Internal Grid keeping the structure but updated to general footer details */}
          <div className="w-full max-w-full mx-auto grid grid-cols-3 divide-x divide-white/10">
            
            <div className="p-12 lg:p-16 flex flex-col justify-between min-h-[400px]">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mb-8">
                  FINZO INC. / EST. 2026
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter text-white leading-[1.1] max-w-sm">
                  SYSTEMS DESIGN & DEVELOPMENT FOR THE MISSIONS THAT CANNOT FAIL.
                </h2>
              </div>
            </div>

            <div className="p-12 lg:p-16 flex flex-col justify-between min-h-[400px]">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mb-8">
                  Contact & Socials
                </p>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">Inquiries</span>
                    <Link href="mailto:hello@finzo.com" className="text-sm font-medium text-white hover:opacity-70 transition-opacity">
                      hello@finzo.com
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">LinkedIn</span>
                    <Link href="#" className="text-sm font-medium text-white hover:opacity-70 transition-opacity">
                      linkedin.com/company/finzo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-16 flex flex-col justify-between min-h-[400px]">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mb-8">
                  Location
                </p>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">Headquarters</span>
                    <p className="text-sm font-medium text-gray-300 leading-relaxed">
                      Raipur, Chhattisgarh<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          <div className="w-full border-t border-white/10 p-6 px-12 lg:px-16 flex items-center text-[9px] font-mono tracking-widest text-gray-600 uppercase gap-8">
            <span>DLMS #193873948</span>
            <span>NAICS 332888 / 541511</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>

      {/* --- MOBILE FULL SCREEN MENU OVERLAY (PURE CSS) --- */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-full h-[100vh] bg-[#050505] z-[100] flex flex-col justify-between overflow-y-auto transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="h-[90px] w-full shrink-0"></div>

        <div className="flex-1 w-full flex flex-col justify-center px-4">
          <div className="flex flex-col w-full divide-y divide-white/10 border-t border-white/10">
            <NavItem title="About" />
            <NavItem title="Product" />
            <NavItem title="Case studies" />
            <NavItem title="Company" hasSubmenu={true} submenuId="company" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 p-6 mt-auto">
          <button className="w-full py-5 rounded-none text-[11px] font-mono tracking-[0.15em] uppercase text-white border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
            Our Pitchdeck
          </button>
          <div className="flex w-full gap-4">
            <button className="w-1/2 py-5 rounded-none text-[11px] font-mono tracking-[0.15em] uppercase bg-white text-black hover:bg-gray-300 transition-colors duration-300">
              Schedule
            </button>
            <button className="w-1/2 py-5 rounded-none text-[11px] font-mono tracking-[0.15em] uppercase bg-white text-black hover:bg-gray-300 transition-colors duration-300">
              Project
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}