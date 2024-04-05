"use client";
import React, { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Context } from "@/contextapi/contextapi";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { isAuthenticated } = useContext(Context);
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden">
        <IconContext.Provider
          value={{ style: { height: "30px", width: "30px", color: "white" } }}
        >
          <GiHamburgerMenu />
        </IconContext.Provider>
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-col gap-4 text-violet-700 text-xl mt-10 font-light">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/blog"}>Blog</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>
        {!isAuthenticated && (
          <Button
            onClick={() => router.push("/login")}
            variant="default"
            className="bg-[#7332bd] text-white relative top-2/3 text-xl h-12 rounded-3xl w-full font-bold hover:bg-white hover:text-[#7332bd] hover:border-[1px] hover:border-[#7332bd]"
          >
            Sign in
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
