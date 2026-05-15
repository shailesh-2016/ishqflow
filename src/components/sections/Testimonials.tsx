"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card } from "../ui/Card";
import { useLanguage } from "@/context/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = t.testimonials.items.map((item, index) => ({
    name: item.name,
    city: item.city,
    feedback: item.feedback,
    rating: 5,
    avatar: item.name.charAt(0).toUpperCase(),
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold mb-6"
          >
            {t.testimonials.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-soft to-gold-primary text-glow">
              {t.testimonials.title2}
            </span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-10">
            <button onClick={prev} className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-gold-primary/20 hover:border-gold-primary/50 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-10">
            <button onClick={next} className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-gold-primary/20 hover:border-gold-primary/50 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-hidden px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="border-gold-primary/20 relative">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
                  
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-primary text-gold-primary" />
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white font-medium italic mb-8 relative z-10">
                    "{testimonials[currentIndex].feedback}"
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-soft to-gold-primary flex items-center justify-center text-black font-bold text-xl">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-text-secondary">{testimonials[currentIndex].city}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? "bg-gold-primary w-8" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
