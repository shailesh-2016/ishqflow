"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Book, Download, Loader2, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/sections/Navbar";

// Same ebook data structure as in EbookShowcase
const ebooksData = [
  { id: "book0", title: "99+ Flirty Texts To Make Her Blush", image: "/images/book1.png", pdfs: ["/pdfs/book1_part1.pdf", "/pdfs/book1_part2.pdf", "/pdfs/book1_part3.pdf"] },
  { id: "book1", title: "Confident Conversations", image: "/images/book2.png", pdfs: ["/pdfs/book2_part1.pdf", "/pdfs/book2_part2.pdf", "/pdfs/book2_part3.pdf"] },
  { id: "book2", title: "Friendship To Forever", image: "/images/book3.png", pdfs: ["/pdfs/book3_part1.pdf", "/pdfs/book3_part2.pdf", "/pdfs/book3_part3.pdf"] },
  { id: "book3", title: "Effortless Texting Secrets", image: "/images/book4.png", pdfs: ["/pdfs/book4_part1.pdf", "/pdfs/book4_part2.pdf", "/pdfs/book4_part3.pdf"] },
  { id: "book4", title: "Build Strong Attraction", image: "/images/book5.png", pdfs: ["/pdfs/book5_part1.pdf", "/pdfs/book5_part2.pdf", "/pdfs/book5_part3.pdf"] },
  { id: "book5", title: "Kamasutra", image: "/images/book6.png", pdfs: ["/pdfs/book6_part1.pdf", "/pdfs/book6_part2.pdf", "/pdfs/book6_part3.pdf"] },
  { id: "comboThree", title: "3 Book Bundle", image: "/images/bundle.png", pdfs: ["/pdfs/combo3_part1.pdf", "/pdfs/combo3_part2.pdf", "/pdfs/combo3_part3.pdf"] },
  { id: "comboAll", title: "All 6 Books Bundle", image: "/images/bundle.png", pdfs: ["/pdfs/bundle_part1.pdf", "/pdfs/bundle_part2.pdf", "/pdfs/bundle_part3.pdf"] },
];

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [purchasedBooks, setPurchasedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth?redirect=/library");
      return;
    }

    if (user) {
      // In a real app, you might fetch this from an API every time, 
      // but our AuthContext already has the user object.
      // However, the user object in AuthContext might not have the latest purchases
      // unless we refresh it. Let's fetch the latest user data.
      const fetchUserData = async () => {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          if (data.user && data.user.purchases) {
            // Filter the ebooksData to only show purchased ones
            const filtered = ebooksData.filter(book => 
              data.user.purchases.includes(book.id) || 
              (data.user.purchases.includes("comboAll")) || // If they bought all
              (data.user.purchases.includes("comboThree") && ["book0", "book1", "book2"].includes(book.id)) // Simplified combo logic
            );
            setPurchasedBooks(filtered);
          }
        } catch (err) {
          console.error("Failed to fetch library:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 pt-32 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-display font-bold mb-2"
            >
              My <span className="text-gold-primary">Library</span>
            </motion.h1>
            <p className="text-text-secondary">Welcome back, {user?.name}. Here are your purchased ebooks.</p>
          </div>
          
          <Button variant="outline" onClick={() => router.push("/#ebooks")}>
            Browse More Books
          </Button>
        </div>

        {purchasedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {purchasedBooks.map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-6 border border-white/5 hover:border-gold-primary/30 transition-all group"
              >
                <div className="relative aspect-[3/4] mb-6 rounded-xl overflow-hidden shadow-2xl">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm">Read Now</Button>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-4 line-clamp-2">{book.title}</h3>
                <div className="flex flex-col gap-2 w-full">
                  {(book.pdfs || []).map((pdfLink: string, pIdx: number) => (
                    <a key={pIdx} href={pdfLink} target="_blank" download className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gold-primary/10 text-gold-soft hover:bg-gold-primary/20 transition-colors text-sm">
                      <Download className="w-4 h-4" /> Part {pIdx + 1}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass-card rounded-[3rem] border border-white/5"
          >
            <Book className="w-20 h-20 text-white/10 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your library is empty</h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              You haven't purchased any ebooks yet. Start your journey by exploring our premium collections.
            </p>
            <Button onClick={() => router.push("/#ebooks")}>
              Explore Ebooks
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
