"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Zap, CheckCircle2, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const features = [
    { icon: MessageCircle, text: t.hero.features.betterConvos },
    { icon: Heart, text: t.hero.features.strongConnections },
    { icon: Zap, text: t.hero.features.moreConfidence },
  ];

  const trustIndicators = [
    { icon: Zap, text: t.hero.pricing.trust1 },
    { icon: ShieldCheck, text: t.hero.pricing.trust2 },
    { icon: Smartphone, text: t.hero.pricing.trust3 },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-12 sm:pt-32 sm:pb-20 flex items-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-danger/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex flex-col space-y-3">
              <Logo iconSize={32} className="opacity-90" />
              <p className="text-sm font-sans tracking-wide text-gold-soft uppercase">
                {t.hero.tagline}
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight">
                {t.hero.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-gold-primary text-glow">
                  {t.hero.titleLine2}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary max-w-xl font-sans">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm sm:text-base font-medium">
                  <div className="bg-white/5 p-1.5 rounded-full text-gold-soft">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 rounded-3xl max-w-md border border-gold-primary/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/0 via-gold-primary/5 to-gold-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="flex items-end space-x-4 mb-6">
                <div className="text-gray-500 line-through text-2xl font-semibold">{t.hero.pricing.oldPrice}</div>
                <div className="text-5xl font-display font-bold text-white">{t.hero.pricing.newPrice} <span className="text-lg text-text-secondary font-sans font-normal">{t.hero.pricing.only}</span></div>
              </div>
              
              <Button size="xl" className="w-full mb-4 group/btn" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="flex items-center space-x-2">
                  <span>{t.hero.pricing.cta}</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  >
                    →
                  </motion.span>
                </span>
              </Button>
              
              <div className="flex justify-between items-center text-xs text-text-secondary mt-4">
                {trustIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-center space-x-1">
                    <indicator.icon className="w-3 h-3 text-success" />
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Cinematic 3D Ebook Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[350px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0 flex items-center justify-center perspective-[1200px]"
          >
            {/* Spotlight effect */}
            <div className="absolute bottom-10 w-full h-40 bg-gradient-radial from-gold-primary/40 to-transparent blur-[60px] rounded-[100%] transform -rotate-12" />
            
            {/* Ebook Mockups */}
            <div className="relative w-full h-full transform-style-3d rotate-y-[-15deg] rotate-x-[5deg] scale-75 sm:scale-100">
              
              {/* Book 3 (Left back) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[5%] top-[15%] w-36 h-52 rounded-r-md shadow-2xl transform -translate-z-[40px] -rotate-12 z-10 overflow-hidden border-l border-white/20 hover:scale-105 transition-transform"
              >
                <img src="/images/book3.png" alt="Book 3" className="w-full h-full object-cover" />
              </motion.div>

              {/* Book 2 (Right back) */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute right-[5%] top-[20%] w-40 h-56 rounded-r-md shadow-2xl transform translate-z-[10px] rotate-12 z-20 overflow-hidden border-l border-white/20 hover:scale-105 transition-transform"
              >
                <img src="/images/book2.png" alt="Book 2" className="w-full h-full object-cover" />
              </motion.div>

              {/* Book 4 (Left front) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute left-[15%] bottom-[10%] w-44 h-60 rounded-r-md shadow-[0_20px_50px_rgba(212,175,55,0.2)] transform translate-z-[30px] -rotate-6 z-30 overflow-hidden border-l border-white/20 hover:scale-105 transition-transform"
              >
                <img src="/images/book4.png" alt="Book 4" className="w-full h-full object-cover" />
              </motion.div>

              {/* Book 5 (Right front) */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute right-[15%] bottom-[15%] w-36 h-52 rounded-r-md shadow-2xl transform -translate-z-[10px] rotate-6 z-30 overflow-hidden border-l border-white/20 hover:scale-105 transition-transform"
              >
                <img src="/images/book5.png" alt="Book 5" className="w-full h-full object-cover" />
              </motion.div>

              {/* Book 1 (Center Main) */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-[22rem] rounded-r-lg shadow-[0_30px_80px_rgba(212,175,55,0.5)] transform translate-z-[60px] z-50 overflow-hidden border-l-2 border-gold-primary hover:scale-105 transition-transform duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none z-10 mix-blend-overlay" />
                <img src="/images/book1.png" alt="Book 1" className="w-full h-full object-cover" />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
