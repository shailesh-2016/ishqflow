"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User as UserIcon, LogOut } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const router = useRouter();

  const navLinks = [
    { name: t.navbar.home, href: "/#home" },
    { name: t.navbar.whatsInside, href: "/#ebooks" },
    { name: t.navbar.benefits, href: "/#benefits" },
    { name: t.navbar.testimonials, href: "/#testimonials" },
    { name: t.navbar.faq, href: "/#faq" },
    { name: t.navbar.myBooks, href: "/library" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/70 backdrop-blur-xl border-b border-gold-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative z-10">
            <Logo iconSize={28} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA and Switcher */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-gold-soft">
                  <UserIcon className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-text-secondary hover:text-danger transition-colors p-2"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => router.push("/auth")}
                  className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
                >
                  {t.navbar.login}
                </button>
                <Button size="sm" onClick={() => router.push("/auth")}>
                  {t.navbar.cta}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-text-secondary hover:text-white transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                {!user && (
                  <Button 
                    variant="outline"
                    size="md" 
                    className="w-full border-gold-primary/30 text-gold-soft"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/auth");
                    }}
                  >
                    {t.navbar.login}
                  </Button>
                )}
                <Button 
                  size="md" 
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth");
                  }}
                >
                  {t.navbar.cta}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
