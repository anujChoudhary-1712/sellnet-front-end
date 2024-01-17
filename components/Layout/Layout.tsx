"use client";
import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import { usePathname } from "next/navigation";
import { AppContext } from "@/contextapi/contextapi";
import Sidebar from "../Header/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <AppContext>
        {pathname !== "/login" && <Navbar />}
        {children}
      </AppContext>
    </div>
  );
}
