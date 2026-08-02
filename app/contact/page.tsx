import React from 'react';

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white border-t border-white/10">
      
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 bg-yellow-500 block"></span>
        <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">
          Communications
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
        CONTACT
      </h1>
      
      <p className="text-sm font-mono tracking-[0.2em] text-gray-500 uppercase mt-4">
        System Online // Awaiting Input
      </p>

    </div>
  );
}