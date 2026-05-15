"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Heart } from "lucide-react";

export function RomanticBanners() {
  const { t } = useLanguage();

  // If translations aren't fully loaded, fallback gracefully
  if (!t.romanticBanners) return null;

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2rem] overflow-hidden group"
        >
          {/* Banner Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/romantic-banner.png" 
              alt="Romantic Banner Background" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            
            {/* Soft Red/Gold Glow overlays */}
            <div className="absolute inset-0 bg-danger/10 mix-blend-overlay" />
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-full bg-gold-primary/20 blur-[120px] rounded-full pointer-events-none" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 h-full flex flex-col justify-center min-h-[400px] sm:min-h-[450px]">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6"
              >
                <Heart className="w-4 h-4 text-danger fill-danger" />
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90 uppercase">
                  {t.romanticBanners.badge}
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 text-white"
              >
                {t.romanticBanners.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-danger text-glow-danger">
                  {t.romanticBanners.title2}
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-white/80 max-w-lg mb-8 font-sans"
              >
                {t.romanticBanners.subtitle}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={() => document.getElementById('ebooks')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden group/btn bg-gradient-to-r from-gold-primary to-danger text-white font-bold px-8 py-4 rounded-xl text-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center space-x-2">
                  <span>{t.romanticBanners.cta}</span>
                  <Heart className="w-5 h-5 group-hover/btn:scale-125 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
