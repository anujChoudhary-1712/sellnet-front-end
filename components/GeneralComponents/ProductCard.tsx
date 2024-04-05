import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "../ui/card";
import { Button } from '../ui/button';
import Image from 'next/image';

const ProductCard = ({product}:any) => {
  return (
    <Card className="shadow-xl">
    <Image
      src={product.imageUrl}
      alt=""
      className="mx-auto my-2 rounded-t-md"
      width={400}
      height={600}
    />
    <CardContent className="flex flex-col gap-2 mt-4 px-1">
      <CardTitle>{product.name}</CardTitle>
      <CardDescription>{product.description}</CardDescription>
      <p>{`Rs. ${product.price}`}</p>
      <Button
        className="bg-violet-700 text-white hover:bg-white hover:text-blue-700 hover:border-2 hover:border-blue-700"
        variant="default"
      >
        Add To Cart
      </Button>
    </CardContent>
  </Card>
  )
}

export default ProductCard
