"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type PurchaseContextType = {
  purchasedItems: string[];
  addPurchase: (itemId: string) => void;
};

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export function PurchaseProvider({ children }: { children: React.ReactNode }) {
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("ishqflow_purchases");
    if (saved) {
      try {
        setPurchasedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing purchases", e);
      }
    }
  }, []);

  const addPurchase = (itemId: string) => {
    setPurchasedItems((prev) => {
      if (prev.includes(itemId)) return prev;
      const newItems = [...prev, itemId];
      localStorage.setItem("ishqflow_purchases", JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <PurchaseContext.Provider value={{ purchasedItems, addPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export function usePurchase() {
  const context = useContext(PurchaseContext);
  if (context === undefined) {
    throw new Error("usePurchase must be used within a PurchaseProvider");
  }
  return context;
}
