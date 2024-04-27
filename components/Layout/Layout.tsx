"use client";
import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import { usePathname } from "next/navigation";
import { AppContext } from "@/contextapi/contextapi";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "../Header/Sidebar";
import DashboardLeft from "../GeneralComponents/DashboardLeft";
import {Toaster} from "react-hot-toast"
import Footer from "../Footer/Footer";

const authRoutes = [
  "/login",
  "/register/buyer",
  "/register/seller",
  "/verifyEmail",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname.startsWith("/dashboard") ? "bg-black min-h-screen" : "bg-white"
      } `}
    >
      <Toaster position="top-center" reverseOrder={false} toastOptions={{duration:2000}}/>
      <AppContext>
        <NextTopLoader color="#ffffff" />
        {!authRoutes.includes(pathname) &&
          !pathname.startsWith("/dashboard") && <Navbar />}
        {pathname.startsWith("/dashboard") && <DashboardLeft />}
        {children}
        {!authRoutes.includes(pathname) &&
          !pathname.startsWith("/dashboard") && <Footer />}
      </AppContext>
    </div>
  );
}
