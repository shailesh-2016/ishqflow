"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { usePurchase } from "@/context/PurchaseContext";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemTitle: string;
  amount: number;
};

export function CheckoutModal({ isOpen, onClose, itemId, itemTitle, amount }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addPurchase } = usePurchase();

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
    if (!name || !email) return;

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
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setSuccess(true);
              addPurchase(itemId);
              setTimeout(() => {
                setSuccess(false);
                onClose();
              }, 3000);
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
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md glass-card bg-card p-8 rounded-[2rem] border border-gold-primary/30 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Payment Successful!</h2>
              <p className="text-text-secondary">Your ebook has been sent to your email and added to your library.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-display font-bold mb-2">Checkout</h2>
              <p className="text-text-secondary mb-6 text-sm">
                You are purchasing: <span className="text-gold-soft font-semibold">{itemTitle}</span> for ₹{amount}
              </p>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-primary/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold-primary/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-gold-soft via-gold-primary to-gold-soft text-black font-display font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex justify-center items-center"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : `Pay ₹${amount}`}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
