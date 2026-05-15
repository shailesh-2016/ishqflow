import React from "react";
import { Mail } from "lucide-react";
import { Logo } from "../ui/Logo";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-6">
              <Logo iconSize={28} />
            </a>
            <p className="text-text-secondary max-w-sm mb-6 leading-relaxed">
              Master the art of texting, build deep connections, and transform your communication skills with our premium guides.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-gold-soft hover:bg-gold-primary/10 transition-all border border-transparent hover:border-gold-primary/30">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-gold-soft hover:bg-gold-primary/10 transition-all border border-transparent hover:border-gold-primary/30">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-gold-soft hover:bg-gold-primary/10 transition-all border border-transparent hover:border-gold-primary/30">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-text-secondary hover:text-gold-soft transition-colors text-sm">Home</a></li>
              <li><a href="#ebooks" className="text-text-secondary hover:text-gold-soft transition-colors text-sm">What's Inside</a></li>
              <li><a href="#benefits" className="text-text-secondary hover:text-gold-soft transition-colors text-sm">Benefits</a></li>
              <li><a href="#testimonials" className="text-text-secondary hover:text-gold-soft transition-colors text-sm">Testimonials</a></li>
              <li><a href="#faq" className="text-text-secondary hover:text-gold-soft transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-text-secondary hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-text-secondary hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-white transition-colors text-sm">Refund Policy</a></li>
              <li><a href="#" className="text-text-secondary hover:text-white transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary">
          <p>© {new Date().getFullYear()} ISHQFLOW. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for better conversations.</p>
        </div>
      </div>
    </footer>
  );
}
