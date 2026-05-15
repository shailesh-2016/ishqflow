"use client";

import React from "react";
import { motion } from "framer-motion";
import { EyeOff, BatteryWarning, HelpCircle, Magnet } from "lucide-react";
import { Card } from "../ui/Card";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProblemSection() {
  const { t } = useLanguage();

  const problems = [
    {
      icon: EyeOff,
      title: t.problem.items[0].title,
      description: t.problem.items[0].desc,
    },
    {
      icon: BatteryWarning,
      title: t.problem.items[1].title,
      description: t.problem.items[1].desc,
    },
    {
      icon: HelpCircle,
      title: t.problem.items[2].title,
      description: t.problem.items[2].desc,
    },
    {
      icon: Magnet,
      title: t.problem.items[3].title,
      description: t.problem.items[3].desc,
    },
  ];

  return (
    <section className="py-12 sm:py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-danger/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
          >
            {t.problem.title1} <span className="text-danger">{t.problem.title2}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-secondary font-sans"
          >
            {t.problem.subtitle}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {problems.map((problem, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card glowOnHover className="h-full flex flex-col group hover:border-danger/30 hover:shadow-[0_0_30px_rgba(255,90,90,0.1)]">
                <div className="w-14 h-14 rounded-2xl bg-danger/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-7 h-7 text-danger" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{problem.title}</h3>
                <p className="text-text-secondary leading-relaxed flex-grow">{problem.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
