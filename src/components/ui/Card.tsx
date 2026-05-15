import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function Card({ children, className = "", glowOnHover = false, ...props }: CardProps) {
  return (
    <motion.div
      className={`glass-card rounded-3xl p-6 sm:p-8 transition-all duration-500 ${
        glowOnHover ? "hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-gold-primary/30 hover:-translate-y-1" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
