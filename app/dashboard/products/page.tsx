"use client";
import { getRequest } from "@/actions/APICalls";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Context } from "@/contextapi/contextapi";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

const Page = () => {
  const { products, setProducts, user } = useContext(Context);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getRequest(`products/get-products/${user._id}`);

        if (!res.success) {
          console.log(res.message);
          return;
        }
        console.log(res.data?.content);
        setProducts(res.data?.content);
      } catch (error) {
        console.log(error);
      }
    };
    if (user._id) {
      fetchProducts();
    }
  }, [user._id]);
  return (
    <div className="p-8">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-white text-3xl">Products:</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8">
        {products.map((product: any, index: number) => {
          return (
            <Card key={index} className="bg-violet-500 text-white border-none">
              <Image
                src={product.imageUrl}
                alt=""
                className="w-full mx-auto mb-2 rounded-t-md border"
                height={400}
                width={400}
              />

              <CardContent className="flex flex-col mt-4 px-4">
                <div className="flex justify-between items-center w-full">
                  <CardTitle className="hover:underline"><Link href={`/dashboard/products/${product._id}`}>{product.name}</Link></CardTitle>
                  <p>{product.category}</p>
                </div>

                <CardDescription className="mb-4 text-slate-200">{product.description}</CardDescription>
                <p>{`Rs. ${product.price}`}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
