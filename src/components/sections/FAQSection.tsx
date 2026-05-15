"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card } from "../ui/Card";
import { useLanguage } from "@/context/LanguageContext";

export function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t.faq.items[0].q,
      answer: t.faq.items[0].a,
    },
    {
      question: t.faq.items[1].q,
      answer: t.faq.items[1].a,
    },
    {
      question: t.faq.items[2].q,
      answer: t.faq.items[2].a,
    },
    {
      question: t.faq.items[3].q,
      answer: t.faq.items[3].a,
    },
    {
      question: t.faq.items[4].q,
      answer: t.faq.items[4].a,
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            {t.faq.title1} <span className="text-gold-primary">{t.faq.title2}</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-colors p-6 ${openIndex === idx ? 'border-gold-primary/50 bg-white/5' : 'hover:border-white/20'}`}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold pr-8 ${openIndex === idx ? 'text-gold-soft' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                  <div className="shrink-0 text-text-secondary">
                    {openIndex === idx ? <Minus className="w-5 h-5 text-gold-soft" /> : <Plus className="w-5 h-5" />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
