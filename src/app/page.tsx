import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { EbookShowcase } from "@/components/sections/EbookShowcase";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { MidPageBreak } from "@/components/sections/MidPageBreak";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-gold-primary selection:text-black relative overflow-hidden">
      
      {/* Global Background Flow Watermark */}
      <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-[200vw] h-[200vh] -top-[50vh] -left-[50vw] opacity-[0.02] text-gold-primary transform rotate-12">
          <path d="M0,50 Q25,25 50,50 T100,50 M0,60 Q25,35 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,40 Q25,65 50,40 T100,40" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <Navbar />
      <Hero />
      
      {/* Elegant Gold Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
      
      <div className="relative">
        {/* Subtle Section Watermark */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <ProblemSection />
        <EbookShowcase />
        <BenefitsSection />
      </div>
      
      <MidPageBreak />
      
      <div className="relative">
        {/* Subtle Section Watermark */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <TransformationSection />
        <Testimonials />
        
        {/* Elegant Gold Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent my-12" />
        
        <PricingSection />
        <FAQSection />
      </div>
      
      <Footer />
    </main>
  );
}
