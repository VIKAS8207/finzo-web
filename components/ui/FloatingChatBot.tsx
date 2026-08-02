"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MiniDataSphere from "./MiniDataSphere"; // <-- Import the new Mini logo

export default function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- THE SLIDING CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-32 right-6 md:right-12 w-[calc(100vw-3rem)] md:w-[400px] h-[600px] max-h-[70vh] bg-[#050505] border border-white/15 z-[100] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Architectural Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500 z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30 z-20 pointer-events-none" />
            
            {/* Header */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono tracking-[0.2em] text-white/80 uppercase">
                  Daemon // Active
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-yellow-500 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat History Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
              {/* System Message */}
              <div className="text-[10px] font-mono tracking-widest text-white/30 text-center uppercase">
                Secure connection established
              </div>

              {/* AI Message */}
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[10px] font-mono tracking-wider text-yellow-500 uppercase">System</span>
                <div className="bg-white/5 border border-white/10 p-4 text-sm text-white/80 leading-relaxed rounded-sm max-w-[85%]">
                  Neural agent initialized. How can I assist you with your infrastructure deployment today?
                </div>
              </div>

              {/* User Message Example */}
              <div className="flex flex-col gap-2 items-end mt-4">
                <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">You</span>
                <div className="bg-white text-black p-4 text-sm leading-relaxed rounded-sm max-w-[85%]">
                  Can you analyze the current workflow metrics?
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Initiate command..." 
                  className="w-full bg-[#0a0a0a] border border-white/20 text-white text-sm font-mono p-4 pr-12 focus:outline-none focus:border-yellow-500 transition-colors rounded-sm placeholder:text-white/20"
                />
                <button className="absolute right-4 text-white/40 hover:text-yellow-500 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE TRIGGER BUTTON (Mini Sphere Logo) --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-[72px] h-[72px] rounded-full bg-[#050505] hover: transition-all duration-500 z-[100] flex items-center justify-center overflow-hidden group p-1"
      >
        <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-[0.22,1,0.36,1]">
          <MiniDataSphere />
        </div>
      </button>
    </>
  );
}