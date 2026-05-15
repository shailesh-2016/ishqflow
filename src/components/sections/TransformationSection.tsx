"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import { useLanguage } from "@/context/LanguageContext";

export function TransformationSection() {
  const { t } = useLanguage();

  const befores = t.transformation.beforeItems;
  const afters = t.transformation.afterItems;

  return (
    <section className="py-12 sm:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-success/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            {t.transformation.title1} <span className="text-success text-glow">{t.transformation.title2}</span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Before */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-2/5"
          >
            <Card className="bg-danger/5 border-danger/20">
              <h3 className="text-2xl font-display font-bold text-white mb-6 text-center border-b border-danger/20 pb-4">{t.transformation.before}</h3>
              <ul className="space-y-4">
                {befores.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <XCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Arrow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-danger/20 to-success/20 border border-white/10 shrink-0 relative"
          >
            <div className="absolute inset-0 rounded-full bg-white/5 animate-ping" />
            <ArrowRight className="w-8 h-8 text-white rotate-90 md:rotate-0" />
          </motion.div>

          {/* After */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-2/5"
          >
            <Card className="bg-success/5 border-success/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-success/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full opacity-50 blur-2xl" />
              <h3 className="relative z-10 text-2xl font-display font-bold text-white mb-6 text-center border-b border-success/20 pb-4">{t.transformation.after}</h3>
              <ul className="space-y-4 relative z-10">
                {afters.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
