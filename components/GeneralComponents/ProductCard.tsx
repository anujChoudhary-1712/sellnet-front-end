"use client"
import React, { useContext } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "../ui/card";
import { Button } from '../ui/button';
import Image from 'next/image';
import { postRequest } from '@/actions/APICalls';
import { Context } from '@/contextapi/contextapi';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ProductCard = ({product}:any) => {
  const {user} = useContext(Context)

  const handleAddToCart = async() =>{
    try {
      const body = JSON.stringify({productId:product._id,userId:user._id})
      const res = await postRequest("cart/add",body)

      if(!res.success){
        toast.error(res?.message)
        return
      }

      toast.success(res.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className="shadow-xl">
    <img
      src={product.imageUrl}
      alt=""
      className="mx-auto my-2 rounded-t-md h-full w-full min-h-[250px]"
    />
    <CardContent className="flex flex-col gap-2 mt-4 px-2">
      <CardTitle className='hover:underline'><Link href={`/products/${product._id}`}>{product.name}</Link></CardTitle>
      <CardDescription>{product.description}</CardDescription>
      <p>{`Rs. ${product.price}`}</p>
      <Button
        className="bg-violet-700 text-white border hover:bg-white hover:text-blue-700 hover:border-blue-700"
        variant="default"
        onClick={handleAddToCart}
      >
        Add To Cart
      </Button>
    </CardContent>
  </Card>
  )
}

export default ProductCard
