"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconContext } from "react-icons";
import { IoCartOutline } from "react-icons/io5";
import { Context } from "@/contextapi/contextapi";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "../ui/button";

export default function Cart() {
  const { cartItems, total, setTotal,setCartItems } = useContext(Context);

  const handleRemoveItem = (name:String,price:number) =>{
    const updatedArr = cartItems.filter((item)=>item.itemName !== name)
    setCartItems(updatedArr)
    setTotal(total - price)
  }
  return (
    <Sheet>
      <SheetTrigger>
        <IconContext.Provider
          value={{ style: { height: "30px", width: "30px", color: "white" } }}
        >
          <IoCartOutline />
        </IconContext.Provider>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetTitle className="w-full text-center mt-4">{`Cart(${cartItems.length})`}</SheetTitle>
        {cartItems.length === 0 && (
          <p className="w-full text-center text-gray-500 font-normal opacity-70 relative top-1/2 text-xl">
            No Items Added
          </p>
        )}
        {cartItems.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-normal">Cart Items</p>
            {cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between w-full my-3"
                >
                  <p className="font-light text-sm">{item.itemName}</p>
                  <div className="flex gap-2 items-center">
                    <Button variant="ghost" onClick={()=>handleRemoveItem(item.itemName,item.price)}>
                      <IconContext.Provider
                        value={{
                          style: {
                            height: "18px",
                            width: "18px",
                            color: "red",
                          },
                        }}
                      >
                        <MdDeleteOutline />
                      </IconContext.Provider>
                    </Button>
                    <p className="font-light text-sm">{`Rs. ${item.price}`}</p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-between w-full my-5">
              <p className="text-sm">Total Amount</p>
              <p className="text-sm">{`Rs. ${total}`}</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
