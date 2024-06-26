"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Cart from "../Cart/Cart";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import { Context } from "@/contextapi/contextapi";
import UserNav from "../GeneralComponents/UserNav";

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(Context);
  return (
    <header className="flex justify-between items-center gap-4 h-20 w-full px-6 bg-[#7332bd]">
      <div className="flex gap-10 items-center">
        <h2 className="text-white text-2xl font-medium">Creatify</h2>
        <nav className="hidden sm:flex gap-4 text-white font-light">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
        </nav>
      </div>
      <div className="flex gap-4 items-center">
        <Cart />
        {!isAuthenticated ? (
          <Button
            variant="default"
            className="hidden sm:block bg-white rounded-md text-[#7332bd] font-bold hover:bg-[black] hover:text-white"
            onClick={() => {
              router.push("/login");
              console.log("hello")
            }}
          >
            Sign in
          </Button>
        ) : (
          <UserNav />
        )}
        <Sidebar />
      </div>
    </header>
  );
}
