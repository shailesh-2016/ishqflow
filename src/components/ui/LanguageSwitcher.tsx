"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md relative z-50">
      <div className="relative flex">
        {/* Background slider pill */}
        <motion.div
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-gold-soft to-gold-primary rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          initial={false}
          animate={{
            x: language === "en" ? "0%" : "100%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        <button
          onClick={() => setLanguage("en")}
          className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
            language === "en" ? "text-black" : "text-white/70 hover:text-white"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLanguage("hi")}
          className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
            language === "hi" ? "text-black" : "text-white/70 hover:text-white"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
}
