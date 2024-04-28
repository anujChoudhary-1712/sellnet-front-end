"use client";
import React, { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { postRequest } from "@/actions/APICalls";
import { Context } from "@/contextapi/contextapi";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const ProductCard = ({ product }: any) => {
  const { user,isAuthenticated } = useContext(Context);
  const router = useRouter()
  const [isLoading,setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      const body = JSON.stringify({ productId: product._id, userId: user._id });

      if(!isAuthenticated){
        router.push("/login")
        toast.error("You need to login first")
        return
      }
      setLoading(true)
      const res = await postRequest("cart/add", body);

      if (!res.success) {
        toast.error(res?.message)
        return;
      }

      toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };
  return (
    <Card className="shadow-xl">
      <div className="relative w-full h-[170px] sm:h-[220px] md:h-[250px]">
        <Image
          src={product?.imageUrl} // Consider a fallback image
          alt={product?.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <CardContent className="flex flex-col gap-2 mt-4 px-2">
        <CardTitle className="hover:underline">
          <Link href={`/products/${product._id}`}>{product.name}</Link>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <p>{`Rs. ${product.price}`}</p>
        <Button
          className="bg-violet-700 text-white"
          variant="default"
          disabled={isLoading}
          onClick={handleAddToCart}
        >
         {isLoading ? <Loader size={"4"} color="white"/> : <p>Add to cart</p>}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
