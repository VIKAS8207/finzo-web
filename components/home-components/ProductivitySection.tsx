"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CyberButton from "@/components/ui/CyberButton";

// Expanded data to fill the right side and balance the layout height
const faqs = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    question: "What is the primary platform infrastructure?",
    answer: "It is a specialized infrastructure for building and deploying custom AI agents. We provide the neural logic and edge nodes required to run autonomous workflows at enterprise scale.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    question: "Who is this architecture designed for?",
    answer: "It is designed for engineering teams and enterprise product managers who need strict control over their AI deployments without getting bogged down in boilerplate infrastructure.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16.01"></line>
        <line x1="16" y1="16" x2="16" y2="16.01"></line>
      </svg>
    ),
    question: "Do you provide pre-built agents?",
    answer: "Yes. We offer a library of pre-trained models tailored for specific industries including healthcare, fintech, and logistics, which can be immediately fine-tuned on your data.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    question: "How does it differ from a standard chatbot?",
    answer: "Unlike standard chatbots that rely on static decision trees, our neural agents execute multi-step reasoning, access live APIs, and synthesize information dynamically based on context.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    question: "Can I use my own custom domain?",
    answer: "Absolutely. Full DNS configuration and white-labeling is supported on all Enterprise plans, ensuring the experience is completely seamless for your end-users.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"></path>
        <path d="M14 12h.01"></path>
        <path d="M10 12h.01"></path>
      </svg>
    ),
    question: "Is there a limit to how many agents I can build?",
    answer: "There are no hard limits on the number of agents. Scaling is handled automatically, and you are billed strictly based on the compute and token throughput utilized by your network.",
  },
];

interface AccordionItemProps {
  icon: React.ReactNode;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isLast: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ icon, question, answer, isOpen, onClick, isLast }) => {
  return (
    // Removes the bottom border on the last item so it doesn't double-up with the full-width border
    <div className={`border-black/10 ${!isLast ? "border-b" : ""}`}>
      <button
        className="w-full py-6 md:py-8 px-6 lg:px-10 flex justify-between items-center focus:outline-none group text-left transition-colors hover:bg-black/[0.02]"
        onClick={onClick}
      >
        <div className="flex items-center gap-6 text-black">
          {/* Blue Hover State on Icon */}
          <div className="text-black/50 group-hover:text-[#141fdb] transition-colors duration-300">
            {icon}
          </div>
          {/* Blue Hover State on Text */}
          <span className="text-base md:text-lg font-medium text-[#111] pr-8 group-hover:text-[#141fdb] transition-colors duration-300">
            {question}
          </span>
        </div>
        
        {/* Animated + to x Icon with Blue Hover Border */}
        <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#141fdb] transition-colors duration-300">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-3 h-3 text-[#111] group-hover:text-[#141fdb]"
          >
            {/* Horizontal line */}
            <div className="absolute w-full h-[1.5px] bg-current transition-colors" />
            {/* Vertical line */}
            <div className="absolute h-full w-[1.5px] bg-current transition-colors" />
          </motion.div>
        </div>
      </button>

      {/* Smooth Height Expansion */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2 pl-[4.5rem] pr-10 text-black/60 leading-relaxed max-w-2xl text-sm md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductivitySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); 

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-[#e5e5e5] text-[#111] flex flex-col pt-16 lg:pt-24 pb-24">
      
      {/* =========================================
          ARCHITECTURAL GRID BACKGROUND
          ========================================= */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-20">
        <div className="w-1/4 h-full border-r border-black/20" />
        <div className="w-1/4 h-full border-r border-black/20" />
        <div className="w-1/4 h-full border-r border-black/20" />
        <div className="w-1/4 h-full" />
      </div>

      {/* FULL WIDTH TOP & BOTTOM BORDER WRAPPER */}
      <div className="relative z-10 w-full border-t border-b border-black/10 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[80vh]">
          
          {/* =========================================
              LEFT COLUMN (Spans 2 columns on Desktop)
              ========================================= */}
          <div className="col-span-1 lg:col-span-2 p-8 md:p-12 lg:p-16 flex flex-col justify-between border-r border-black/10">
            
            {/* Top Section */}
            <div>
              <div className="flex items-center gap-3 mb-12">
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
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-black/70">
                  FAQ
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-[72px] font-medium tracking-tight leading-[1.05]">
                Common <br />
                inquiries
              </h2>
            </div>

            {/* Bottom Section with Custom CyberButton */}
            <div className="pb-8 mt-24 lg:mt-0">
              <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-sm mb-10">
                Everything you need to know about deploying, scaling, and securing your neural agents with us. Can't find an answer?
              </p>
              
              {/* Uses your CyberButton component and passes the requested Blue hover color */}
              <CyberButton 
                text="CONTACT US" 
                className="w-[200px] border-black text-black"
              />
            </div>

          </div>

          {/* =========================================
              RIGHT COLUMN (Spans 2 columns on Desktop)
              ========================================= */}
          <div className="col-span-1 lg:col-span-2 flex flex-col">
            <div className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  icon={faq.icon}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  isLast={index === faqs.length - 1} // Check to disable the bottom border on the last element
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}