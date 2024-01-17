"use client";
import { context } from "@/types/contextapi";
import { cartItems } from "@/types/types";
import React, { createContext, useState } from "react";

export const Context = createContext<context>({
  cartItems: [],
  setCartItems: (): cartItems[] => [],
  total: 0,
  setTotal: (): number => 0,
});

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItems[]>([]);
  const [total, setTotal] = useState(0);

  return (
    <Context.Provider value={{ cartItems, setCartItems, total, setTotal }}>
      {children}
    </Context.Provider>
  );
};
