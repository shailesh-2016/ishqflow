"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function MidPageBreak() {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden bg-black flex items-center justify-center min-h-[80vh]">
      {/* Background Effects */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-radial from-gold-primary/10 to-transparent blur-[80px] -z-10" />
      
      {/* Glowing spotlight from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gold-primary/20 blur-[100px] rounded-[100%] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl mx-auto leading-tight"
          >
            {t.midPageBreak.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-gold-primary text-glow text-2xl md:text-3xl lg:text-4xl block mt-4 font-sans font-normal">
              {t.midPageBreak.subtitle}
            </span>
          </motion.h2>
        </div>

        {/* 5 Books Platform Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-64 sm:h-80 md:h-[400px] flex justify-center items-end perspective-[1200px] mt-12"
        >
          {/* Luxury Platform */}
          <div className="absolute bottom-0 w-[90%] md:w-[800px] h-12 bg-gradient-to-t from-gold-primary/5 to-transparent border-b-2 border-gold-primary/40 rounded-[100%] blur-[2px] transform rotate-x-[60deg] shadow-[0_20px_50px_rgba(212,175,55,0.3)]" />
          
          <div className="relative w-full max-w-4xl h-full flex justify-center items-end transform-style-3d z-10 pb-4 md:pb-8">
            
            {/* Book 1 (Far Left) */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="absolute left-[5%] md:left-[10%] bottom-4 w-24 sm:w-32 md:w-40 aspect-[2/3] transform -rotate-12 -translate-z-[60px] shadow-2xl rounded-r-sm overflow-hidden border-l border-white/20"
            >
              <img src="/images/book3.png" alt="Book 3" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Book 2 (Mid Left) */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute left-[20%] md:left-[25%] bottom-2 w-28 sm:w-36 md:w-48 aspect-[2/3] transform -rotate-6 -translate-z-[30px] shadow-2xl rounded-r-md overflow-hidden border-l border-white/20 z-20"
            >
              <img src="/images/book4.png" alt="Book 4" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Book 5 (Far Right) */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute right-[5%] md:right-[10%] bottom-4 w-24 sm:w-32 md:w-40 aspect-[2/3] transform rotate-12 -translate-z-[60px] shadow-2xl rounded-r-sm overflow-hidden border-l border-white/20"
            >
              <img src="/images/book5.png" alt="Book 5" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Book 4 (Mid Right) */}
            <motion.div 
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute right-[20%] md:right-[25%] bottom-2 w-28 sm:w-36 md:w-48 aspect-[2/3] transform rotate-6 -translate-z-[30px] shadow-2xl rounded-r-md overflow-hidden border-l border-white/20 z-20"
            >
              <img src="/images/book2.png" alt="Book 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* Book 3 (Center Front) */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="relative w-36 sm:w-48 md:w-60 aspect-[2/3] transform translate-z-[20px] shadow-[0_30px_60px_rgba(212,175,55,0.4)] rounded-r-lg overflow-hidden border-l-2 border-gold-primary z-50"
            >
              <img src="/images/book1.png" alt="Main Book" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
