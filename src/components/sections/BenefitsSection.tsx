"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareHeart, Sparkles, Shield, HeartHandshake } from "lucide-react";
import { Card } from "../ui/Card";
import { useLanguage } from "@/context/LanguageContext";

export function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      title: t.benefits.items[0].title,
      description: t.benefits.items[0].desc,
      icon: Shield,
    },
    {
      title: t.benefits.items[1].title,
      description: t.benefits.items[1].desc,
      icon: Sparkles,
    },
    {
      title: t.benefits.items[2].title,
      description: t.benefits.items[2].desc,
      icon: MessageSquareHeart,
    },
    {
      title: t.benefits.items[3].title,
      description: t.benefits.items[3].desc,
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="benefits" className="py-12 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            {t.benefits.title1} <span className="text-gold-primary">{t.benefits.title2}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="flex items-start space-x-6 h-full group hover:border-gold-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gold-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-gold-soft" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-2 text-white group-hover:text-gold-soft transition-colors">{benefit.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{benefit.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
