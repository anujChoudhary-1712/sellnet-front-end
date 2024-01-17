"use client"
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import demoImg from "@/public/demo.jpg";
import Link from "next/link";
import { Button } from "../ui/button";
import { Context } from "@/contextapi/contextapi";

const products = [
  {
    name: "Kiamu",
    description: "Photography Word Press Theme",
    price: 3000,
    image: demoImg,
  },
  {
    name: "Kiamu",
    description: "Photography Word Press Theme",
    price: 3000,
    image: demoImg,
  },
  {
    name: "Kiamu",
    description: "Photography Word Press Theme",
    price: 3000,
    image: demoImg,
  },
  {
    name: "Kiamu",
    description: "Photography Word Press Theme",
    price: 3000,
    image: demoImg,
  },
];

export default function FeaturedProducts() {
  const {setCartItems,setTotal,total,cartItems} = useContext(Context)

  const handleAddToCart = (name:String,price:number) =>{
    const existingItem = cartItems.find(item => item.itemName === name);
    if(existingItem){
      alert("Product has been already added to cart")
    }else{
      setCartItems((arr)=>{
        return[...arr,{itemName:name,price}]
      })
      setTotal(total + price)
      alert("Item added to the cart")
    }
  }
  return (
    <section className="flex flex-col mx-auto max-w-[1400px] w-10/12 pt-6 pb-20">
      <p className="text-[#0F1035] text-3xl font-bold mb-6">
        Featured Products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => {
          return (
            <Card key={index} className="shadow-xl">
              <Image
                src={product.image}
                alt=""
                className="h-[250px] w-[98%] mx-auto my-2 rounded-t-md"
              />
              <CardContent className="flex flex-col gap-2 mt-4 px-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p>{`Rs. ${product.price}`}</p>
                <Button
                  className="bg-violet-700 text-white hover:bg-white hover:text-blue-700 hover:border-2 hover:border-blue-700"
                  variant="default"
                  onClick={()=>handleAddToCart(product.name,product.price)}
                >
                  Add To Cart
                </Button>
              </CardContent>
            </Card>
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
