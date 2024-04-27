"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { deleteRequest, getRequest } from "@/actions/APICalls";
import toast from "react-hot-toast";
import Loader from "../GeneralComponents/Loader";

export default function Cart() {
  const { user } = useContext(Context);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const fetchCartItems = useCallback( async () => {
    try {
      const res = await getRequest(`cart/get/${user._id}`);
      if (!res.success) {
        console.log(res?.message);
        return;
      }

      setCartItems(res?.data?.content);

      let totalAmount: number = 0;
      for (let cart of res?.data?.content) {
        totalAmount += cart.price;
      }
      setTotal(totalAmount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },[user._id])

  useEffect(() => {
    if (user?._id) {
      fetchCartItems();
    }
  }, [fetchCartItems, user?._id]);

  const handleRemoveItem = async (id: any) => {
    try {
      const body = JSON.stringify({ productId: id, userId: user._id });
      const res = await deleteRequest("cart/remove", body);

      if (!res.success) {
        console.log(res?.message);
        return;
      }

      toast.success(res.message);
      fetchCartItems();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger onClick={fetchCartItems}>
        <IconContext.Provider
          value={{ style: { height: "30px", width: "30px", color: "white" } }}
        >
          <IoCartOutline />
        </IconContext.Provider>
      </SheetTrigger>
      <SheetContent className="w-full sm:min-w-[500px]">
        <SheetTitle className="w-full text-center mt-4">{`Cart(${cartItems.length})`}</SheetTitle>
        {cartItems.length === 0 && (
          <p className="w-full text-center text-gray-500 font-normal opacity-70 relative top-1/2 text-xl">
            No Items Added
          </p>
        )}
        {cartItems.length > 0 && (
          <div className="mt-6">
            <p className="text-lg font-normal">Cart Items</p>
            {cartItems.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between w-full my-3"
                >
                  <p className="font-light text-sm">{item.name}</p>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveItem(item._id)}
                    >
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
