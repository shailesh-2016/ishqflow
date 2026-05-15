import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { PurchaseProvider } from "@/context/PurchaseContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ISHQFLOW | Meaningful Conversations. Natural Connection.",
  description: "Learn confident texting, engaging conversations, and meaningful communication naturally. The premium ebook bundle to transform your social life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <LanguageProvider>
          <PurchaseProvider>
            <AuthProvider>
              {children}
              <Toaster position="bottom-right" toastOptions={{
                style: {
                  background: '#121212',
                  color: '#fff',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                },
              }} />
            </AuthProvider>
          </PurchaseProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
