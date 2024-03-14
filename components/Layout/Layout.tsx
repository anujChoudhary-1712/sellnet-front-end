"use client";
import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import { usePathname } from "next/navigation";
import { AppContext } from "@/contextapi/contextapi";
import Sidebar from "../Header/Sidebar";

const authRoutes = ["/login","/register/buyer","/register/seller","/verifyEmail"]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <AppContext>
        {!authRoutes.includes(pathname) && !pathname.startsWith("/dashboard") && <Navbar />}
        {children}
      </AppContext>
    </div>
  );
}
