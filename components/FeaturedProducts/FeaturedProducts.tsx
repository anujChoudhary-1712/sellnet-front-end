"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Context } from "@/contextapi/contextapi";
import { getRequest } from "@/actions/APICalls";
import ProductCard from "../GeneralComponents/ProductCard";

export default function FeaturedProducts() {
  const { setCartItems, setTotal, total, cartItems } = useContext(Context);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getRequest(`products/get-featured-products/`);

        if (!res.success) {
          console.log(res.message);
          return;
        }
        setFeaturedProducts(res.data?.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="flex flex-col mx-auto max-w-[1400px] w-10/12 pt-6 pb-20">
      <p className="text-[#0F1035] text-3xl font-bold mb-6">
        Featured Products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {featuredProducts.map((product, index) => {
          return (
            <div key={index}>
              <ProductCard product={product}/>
            </div>
          );
        })}
      </div>
      <Button
        variant="default"
        className="rounded-md bg-violet-700 text-white text-lg h-12 font-medium mt-16 self-center hover:bg-white hover:text-violet-700 hover:border-2 hover:border-violet-700"
      >
        <Link href={"/products"}>More Products</Link>
      </Button>
    </section>
  );
}
