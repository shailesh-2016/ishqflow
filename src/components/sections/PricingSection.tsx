"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Zap, Lock, Clock, Smartphone, DownloadCloud } from "lucide-react";
import { Button } from "../ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

export function PricingSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 0 }; // reset for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gold-primary/5 to-black -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gold-primary/10 blur-[150px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold mb-6"
          >
            {t.pricing.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-gold-primary text-glow">{t.pricing.title2}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary font-sans"
          >
            {t.pricing.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Left: Stacked Ebook Bundle */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center order-1 mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-[350px] h-[350px] perspective-[1000px] flex items-center justify-center">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gold-primary/20 blur-[80px] rounded-full -z-10" />
              
              <div className="relative w-full h-full transform-style-3d rotate-y-[15deg] rotate-x-[5deg]">
                {/* Book 3 (Back Left) */}
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }} className="absolute left-[0%] top-[10%] w-28 h-40 rounded-r-sm shadow-2xl transform -translate-z-[40px] -rotate-12 border-l border-white/20"><img src="/images/book3.png" alt="" className="w-full h-full object-cover" /></motion.div>
                {/* Book 2 (Back Right) */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute right-[0%] top-[15%] w-32 h-44 rounded-r-md shadow-2xl transform translate-z-[10px] rotate-12 border-l border-white/20"><img src="/images/book2.png" alt="" className="w-full h-full object-cover" /></motion.div>
                {/* Book 4 (Front Left) */}
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="absolute left-[15%] bottom-[15%] w-36 h-48 rounded-r-md shadow-2xl transform translate-z-[30px] -rotate-6 border-l border-white/20"><img src="/images/book4.png" alt="" className="w-full h-full object-cover" /></motion.div>
                {/* Book 6 (Front Right) */}
                <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute right-[15%] bottom-[20%] w-32 h-44 rounded-r-md shadow-2xl transform -translate-z-[10px] rotate-6 border-l border-white/20"><img src="/images/book6.png" alt="" className="w-full h-full object-cover" /></motion.div>
                {/* Book 1 (Center) */}
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-44 h-[16rem] rounded-r-lg shadow-[0_20px_60px_rgba(212,175,55,0.4)] transform translate-z-[60px] border-l-2 border-gold-primary z-50"><img src="/images/book1.png" alt="Main Book" className="w-full h-full object-cover" /></motion.div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12 w-full max-w-[280px]">
              <div className="glass-card px-4 py-3 rounded-xl border border-gold-primary/30 flex items-center space-x-3">
                <DownloadCloud className="w-5 h-5 text-gold-soft shrink-0" />
                <span className="text-sm font-medium text-white">{t.pricing.trust1}</span>
              </div>
              <div className="glass-card px-4 py-3 rounded-xl border border-gold-primary/30 flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gold-soft shrink-0" />
                <span className="text-sm font-medium text-white">{t.pricing.trust2}</span>
              </div>
            </div>
          </motion.div>

          {/* Middle: Any 3 Books Combo Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 h-full"
          >
            <div className="h-full relative glass-card bg-card/90 rounded-[2rem] p-8 border border-white/10 flex flex-col overflow-hidden hover:border-gold-primary/30 transition-colors duration-300">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold-soft rotate-45 transform origin-bottom-left flex items-end justify-center pb-2">
                <span className="text-black font-bold text-xs tracking-wider uppercase">{t.pricing.comboThree.save}</span>
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">
                {t.pricing.comboThree.title}
              </h2>
              <div className="flex items-end space-x-3 mb-8">
                <span className="text-xl text-gray-500 line-through font-semibold mb-1">{t.pricing.comboThree.oldPrice}</span>
                <div className="flex items-start">
                  <span className="text-xl font-bold text-gold-soft mt-1 mr-1">{t.pricing.currency}</span>
                  <span className="text-5xl font-display font-bold text-white leading-none">{t.pricing.comboThree.newPrice}</span>
                </div>
              </div>
              <div className="w-full space-y-4 mb-8 flex-grow text-sm">
                {t.pricing.comboThree.includes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="bg-success/20 p-1 rounded-full shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-white font-medium leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-auto"
              >
                <button 
                  onClick={() => router.push(`/checkout?itemId=comboThree&title=${encodeURIComponent(t.pricing.comboThree.title)}&amount=${t.pricing.comboThree.newPrice}`)}
                  className="w-full py-4 rounded-xl border border-gold-soft text-gold-soft font-display font-bold text-lg hover:bg-gold-soft/10 transition-colors duration-300"
                >
                  {t.pricing.comboThree.cta}
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: All 6 Books Combo Card (Featured) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative order-3 h-full"
          >
            {/* Animated Border */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-gold-primary via-gold-soft to-gold-primary rounded-[2rem] opacity-50 blur-sm animate-pulse" />
            
            <div className="h-full relative glass-card bg-card/90 rounded-[2rem] p-8 md:p-10 border-2 border-gold-primary/50 flex flex-col overflow-hidden">
              {/* Corner Badge */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-danger rotate-45 transform origin-bottom-left flex items-end justify-center pb-2">
                <span className="text-white font-bold text-sm tracking-wider uppercase">{t.pricing.comboAll.save}</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-danger/10 text-danger border border-danger/20 px-3 py-1.5 rounded-full mb-6 self-start">
                <Clock className="w-3 h-3 animate-pulse" />
                <span className="font-semibold text-xs">{t.pricing.offerEnds} {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
              <h2 className="text-3xl font-display font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-gold-primary">{t.pricing.comboAll.title}</span>
              </h2>
              <div className="flex items-end space-x-3 mb-8">
                <span className="text-2xl text-gray-500 line-through font-semibold mb-1">{t.pricing.comboAll.oldPrice}</span>
                <div className="flex items-start">
                  <span className="text-2xl font-bold text-gold-soft mt-1 mr-1">{t.pricing.currency}</span>
                  <span className="text-6xl font-display font-bold text-white leading-none">{t.pricing.comboAll.newPrice}</span>
                </div>
              </div>
              <div className="w-full space-y-4 mb-8 flex-grow text-sm">
                {t.pricing.comboAll.includes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="bg-success/20 p-1 rounded-full shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-white font-medium leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-auto"
              >
                <button 
                  onClick={() => router.push(`/checkout?itemId=comboAll&title=${encodeURIComponent(t.pricing.comboAll.title)}&amount=${t.pricing.comboAll.newPrice}`)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-soft via-gold-primary to-gold-soft text-black font-display font-bold text-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all bg-[length:200%_auto] hover:bg-right duration-500"
                >
                  {t.pricing.comboAll.cta}
                </button>
              </motion.div>
            </div>
          </motion.div>

        </div>
        
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-success" />
            <span>{t.pricing.guarantee}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-gray-400" />
            <span>{t.pricing.secure}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-gold-soft" />
            <span>{t.pricing.trust3}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
