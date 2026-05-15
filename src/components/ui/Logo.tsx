import React from "react";

export function Logo({ className = "", iconSize = 24 }: { className?: string; iconSize?: number }) {
  return (
    <div className={`flex items-center space-x-2 group ${className}`}>
      {/* Abstract Elegant Infinity/Wave Connection Symbol */}
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-gold-primary transition-transform duration-500 group-hover:scale-110"
      >
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" />
        <path d="M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8" />
        <path d="M12 4v16" strokeDasharray="2 2" className="opacity-30" />
        {/* Swirling wave overlay */}
        <path d="M7 12c2-2 3-5 5-5s3 3 5 5-2 5-5 5-3-3-5-5z" className="text-gold-soft drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
      </svg>
      
      {/* ISHQFLOW Typography */}
      <span className="font-display text-xl sm:text-2xl tracking-tight text-white flex items-center">
        <span className="font-bold">ISHQ</span>
        <span className="font-light tracking-[0.1em] text-white/90 ml-0.5">FLOW</span>
      </span>
    </div>
  );
}
