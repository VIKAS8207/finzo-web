"use client";

import React from 'react';

interface CyberButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string; // Allows you to pass custom widths if needed in the future
}

export default function CyberButton({ text = "Build A Workflow", onClick, className = "w-[220px]" }: CyberButtonProps) {
  return (
    <>
      <style>{`
        @keyframes infiniteMarquee {
          0% { transform: translateX(-16px); }
          100% { transform: translateX(0px); }
        }
        .group:hover .custom-marquee {
          animation: infiniteMarquee 0.6s linear infinite;
        }
      `}</style>

      {/* 
        Decreased height to h-[48px]. 
        Default width is w-[220px], making it slightly tighter for phrases like "Book a demo".
      */}
      <button 
        onClick={onClick}
        className={`group relative flex items-center h-[48px] bg-white border-[2px] border-white cursor-pointer overflow-hidden shadow-[0px_5px_15px_rgba(255,255,255,0.05)] hover:shadow-[0px_5px_20px_rgba(255,255,255,0.15)] transition-shadow duration-300 ${className}`}
      >
        
        {/* 
          THE EXPANDING BACKGROUND 
          w-[44px] perfectly matches the inner height (48px - 4px for top/bottom borders) to keep the box a perfect square.
        */}
        <div className="absolute left-0 top-0 h-full w-[44px] bg-black transition-all duration-[600ms] ease-in-out group-hover:w-full z-0 rounded-[4px]"></div>

        {/* 
          THE ICON CONTAINER
          Slides to the right exactly. Flex justify-center automatically keeps the expanding window centered without margin hacks.
        */}
        <div className="absolute left-0 top-0 h-full w-[44px] flex items-center justify-center text-white transition-all duration-[600ms] ease-in-out z-10 group-hover:left-[calc(100%-60px)]">
          
          <div className="w-[16px] group-hover:w-[32px] h-[19px] overflow-hidden flex relative transition-all duration-[600ms] ease-in-out">
            <div className="flex w-[48px] custom-marquee">
              <svg className="flex-shrink-0" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <svg className="flex-shrink-0" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <svg className="flex-shrink-0" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>

        {/* 
          DYNAMIC TEXT CENTERING
          Uses left/right coordinates to frame the available space, and flex-center to position the text perfectly.
        */}
        <div className="absolute top-0 left-[44px] right-0 h-full flex items-center justify-center transition-all duration-[600ms] ease-in-out z-10 group-hover:left-0 group-hover:right-[44px]">
          <span className="text-[#050505] font-medium text-[14px] group-hover:text-white transition-colors duration-[600ms] whitespace-nowrap">
            {text}
          </span>
        </div>
        
      </button>
    </>
  );
}