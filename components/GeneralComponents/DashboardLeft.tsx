"use client";
import React, { useContext, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Context } from "@/contextapi/contextapi";
import UserNav from "./UserNav";
import { Button } from "../ui/button";

const DashboardLeft = () => {
  const { windowWidth } = useContext(Context);
  const [isOpen, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet>
      <div className="flex justify-between w-full px-8 py-4">
        <SheetTrigger className="border border-white rounded-md p-2 outline-none">
          <MdKeyboardArrowRight className="text-white h-5 w-5" />
        </SheetTrigger>
        <div className="flex gap-4">
          {pathname === "/dashboard/products" && (
            <Button
              variant={"secondary"}
              className="bg-violet-700 text-white hover:bg-blue-700"
              onClick={() => router.push("/dashboard/products/create")}
            >
              Add New Product
            </Button>
          )}
          <UserNav />
        </div>
      </div>

      <SheetContent className="bg-black" side={"left"}>
        <div className="flex justify-between items-center mb-12">
          <h2 className="">
            <Link href={"/"} className="text-white font-medium text-2xl">
              Creatify
            </Link>
          </h2>
          <SheetClose className="border border-white rounded-md p-2 outline-none">
            <MdKeyboardArrowLeft className="text-white h-5 w-5" />
          </SheetClose>
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            className={`${
              pathname === "/dashboard" ? "text-slate-400" : "text-white"
            }`}
            href={"/dashboard"}
          >
            Dashboard
          </Link>
          <Link
            className={`${
              pathname === "/dashboard/orders" ? "text-slate-400" : "text-white"
            }`}
            href={"/dashboard/orders"}
          >
            Orders
          </Link>
          <Link
            className={`${
              pathname === "/dashboard/products"
                ? "text-slate-400"
                : "text-white"
            }`}
            href={"/dashboard/products"}
          >
            Products
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardLeft;
