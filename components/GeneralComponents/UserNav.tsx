"use client";
import { Context } from "@/contextapi/contextapi";
import React, { useContext } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserNav = () => {
  const { user, setAuthenticated } = useContext(Context);
  const router = useRouter()

  const handleLogout = () =>{
    Cookies.remove("token")
    setAuthenticated(false)
    router.push("/")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {" "}
        <Avatar className="hidden sm:block">
          <AvatarFallback>
            {user.fullname.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <Link
            href={`${
              user.accountType === "seller" ? "/dashboard" : "/profile"
            }`}
          >
            {" "}
            {user.accountType === "seller" ? "Dashboard" : "Profile"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
