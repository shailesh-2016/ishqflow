"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EbookShowcase() {
  const { t } = useLanguage();
  const router = useRouter();

  const ebooks = t.ebookShowcase.books.map((book: any, idx: number) => ({
    title: book.title,
    benefit: book.desc,
    price: book.price,
    image: `/images/book${idx + 1}.png`,
  }));

  return (
    <section id="ebooks" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold mb-6"
          >
            {t.ebookShowcase.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-gold-primary text-glow">{t.ebookShowcase.title2}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary font-sans"
          >
            {t.ebookShowcase.subtitle}
          </motion.p>
        </div>

        {/* Desktop Grid & Mobile Carousel Container */}
        <div className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 md:snap-none hide-scrollbar">
          {ebooks.map((ebook, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center mr-6 md:mr-0`}
            >
              <div className="h-full flex flex-col group relative perspective-[1000px]">
                {/* Glow effect behind book */}
                <div className="absolute inset-0 top-10 bg-gold-primary/0 group-hover:bg-gold-primary/20 rounded-[2rem] blur-[40px] transition-all duration-700 -z-10" />
                
                {/* Glass card container */}
                <div className="glass-card rounded-3xl p-8 flex-grow border border-white/5 group-hover:border-gold-primary/50 transition-all duration-500 shadow-xl group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden relative">
                  
                  {/* Subtle animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* 3D Book Display */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-64 sm:h-80 w-full flex justify-center items-center mb-8 transform-style-3d group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] group-hover:scale-105 transition-all duration-700 ease-out"
                  >
                    {/* Shadow under book */}
                    <div className="absolute bottom-0 w-3/4 h-8 bg-black/60 blur-xl rounded-[100%] scale-y-50 group-hover:bg-gold-primary/20 transition-colors duration-500" />
                    
                    {/* Book Cover */}
                    <div className="relative w-40 sm:w-48 h-full rounded-r-md border-l-2 border-white/20 shadow-2xl overflow-hidden">
                      <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover" />
                      {/* Glass reflection on cover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="text-center relative z-10 mt-auto flex flex-col items-center">
                    <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-gold-soft transition-colors duration-300">{ebook.title}</h3>
                    <p className="text-text-secondary text-base mb-6">{ebook.benefit}</p>
                    
                    {/* Price & Buy Button */}
                    <div className="mt-auto w-full max-w-[200px]">
                      <button 
                        onClick={() => router.push(`/checkout?itemId=book${idx}&title=${encodeURIComponent(ebook.title)}&amount=${ebook.price}`)}
                        className="w-full relative group/btn flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-primary/50 hover:bg-gold-primary/10 transition-all duration-300"
                      >
                        <span className="text-xs text-text-secondary mb-1">{t.ebookShowcase.buyNow}</span>
                        <span className="text-xl font-bold text-gold-soft group-hover/btn:scale-110 transition-transform duration-300">{t.ebookShowcase.currency}{ebook.price}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Custom CSS to hide scrollbar but allow scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
