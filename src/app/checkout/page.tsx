"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, ShieldCheck, Lock, ArrowLeft, DownloadCloud, Smartphone, Zap } from "lucide-react";
import { usePurchase } from "@/context/PurchaseContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addPurchase } = usePurchase();
  const { user, loading: authLoading } = useAuth();

  const itemId = searchParams.get("itemId") || "";
  const itemTitle = searchParams.get("title") || "Ebook Bundle";
  const amount = Number(searchParams.get("amount")) || 0;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/auth?redirect=/checkout?${searchParams.toString()}`);
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, authLoading, router, searchParams]);

  useEffect(() => {
    // Load Razorpay script dynamically
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !acceptedTerms) return;

    setLoading(true);

    try {
      // 1. Create order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const order = await orderRes.json();

      if (order.error) throw new Error(order.error);

      // 2. Setup Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy",
        amount: order.amount,
        currency: order.currency,
        name: "ISHQFLOW",
        description: `Purchase of ${itemTitle}`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email,
                name,
                itemId,
                itemTitle,
                userId: user?.id,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setSuccess(true);
              addPurchase(itemId);
              // Wait a bit before redirecting back or showing success screen
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("Something went wrong during verification.");
          }
        },
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#D4AF37",
        },
      };

      // 4. Open Razorpay
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 rounded-[3rem] border border-gold-primary/30 shadow-2xl"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-success/20 blur-[40px] rounded-full animate-pulse" />
            <CheckCircle2 className="w-24 h-24 text-success mx-auto relative z-10" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Payment Successful!</h1>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            Your ebook <span className="text-gold-soft font-semibold">{itemTitle}</span> has been sent to <span className="text-white font-medium">{email}</span>.
          </p>
          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-lg"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
            <p className="text-sm text-text-secondary">
              Need help? Contact support@ishqflow.com
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gold-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-text-secondary hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl font-display font-bold mb-8">Secure Checkout</h1>
            
            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-gold-primary/20 bg-card/50 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 blur-[50px] -z-10 group-hover:bg-gold-primary/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                <div>
                  <h2 className="text-xl font-display font-bold text-gold-soft mb-1">{itemTitle}</h2>
                  <p className="text-text-secondary">Digital Edition (PDF)</p>
                </div>
                <div className="text-3xl font-display font-bold">₹{amount}</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-primary/10 p-3 rounded-2xl">
                    <DownloadCloud className="w-6 h-6 text-gold-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Instant Delivery</h3>
                    <p className="text-sm text-text-secondary">Get your ebook via email immediately after payment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-primary/10 p-3 rounded-2xl">
                    <Smartphone className="w-6 h-6 text-gold-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Universal Access</h3>
                    <p className="text-sm text-text-secondary">Read on your phone, tablet, or laptop anytime.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-primary/10 p-3 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-gold-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Lifetime Updates</h3>
                    <p className="text-sm text-text-secondary">Receive all future editions and updates for free.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-text-secondary font-medium uppercase tracking-widest text-sm">Total Due</span>
                <span className="text-4xl font-display font-bold text-white">₹{amount}</span>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                <Lock className="w-6 h-6 text-gray-500 mb-3" />
                <span className="text-xs font-semibold text-text-secondary uppercase">256-bit SSL Secure</span>
              </div>
              <div className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                <Zap className="w-6 h-6 text-gold-soft mb-3" />
                <span className="text-xs font-semibold text-text-secondary uppercase">Priority Support</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2"
          >
            <div className="glass-card rounded-[3rem] p-8 md:p-12 border border-gold-primary/40 shadow-2xl relative">
              <h2 className="text-2xl font-display font-bold mb-8">Payment Details</h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2 px-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all text-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2 px-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all text-lg"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        required
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-white/5 checked:bg-gold-primary checked:border-gold-primary transition-all cursor-pointer"
                      />
                      <CheckCircle2 className="w-3 h-3 text-black absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="text-sm text-text-secondary group-hover:text-white/90 transition-colors">
                      I understand and agree that <strong className="text-white">payments are strictly non-refundable under any circumstances</strong>, as this is a digital product.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !acceptedTerms}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-gold-soft via-gold-primary to-gold-soft text-black font-display font-bold text-xl hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center group overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    {loading ? (
                      <Loader2 className="w-7 h-7 animate-spin" />
                    ) : (
                      `Complete Payment • ₹${amount}`
                    )}
                  </button>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="mt-12 flex justify-center items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">PCI Compliant</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold-primary animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
