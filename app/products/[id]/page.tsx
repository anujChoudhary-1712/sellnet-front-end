"use client";
import { getRequest, postRequest } from "@/actions/APICalls";
import Loader from "@/components/GeneralComponents/Loader";
import { Button } from "@/components/ui/button";
import { Context } from "@/contextapi/contextapi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { id } = useParams();
  const { user } = useContext(Context);
  const [product, setProduct] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  const handleAddToCart = async () => {
    try {
      const body = JSON.stringify({ productId: product._id, userId: user._id });
      const res = await postRequest("cart/add", body);

      if (!res.success) {
        toast.error(res?.message);
        return;
      }

      toast.success(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProductDetails = async () => {
      try {
        const res = await getRequest(`products/product/${id}`);
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        setProduct(res.data.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="flex justify-center items-center max-w-[1200px] mx-auto my-8 sm:my-12 w-11/12 min-h-[85vh]">
      {isLoading ? (
        <Loader color="black" />
      ) : (
        <div className="flex flex-col-reverse gap-6 md:gap-4 md:flex-row justify-between items-center w-full">
          <div className="flex flex-col justify-between w-full md:w-5/12 md:min-h-[400px]">
            <div className="flex flex-col gap-4">
                <h2 className="text-black font-bold text-4xl">{product?.name}</h2>
                <p className="font-medium -mt-2">{`Rs ${product?.price} `} <span className="text-slate-500 font-normal">| {product?.category}</span></p>
                <p className="text-slate-500 font-normal italic">{product?.description}</p>
            </div>
            <Button
              className="bg-violet-700 text-white border hover:bg-white hover:text-blue-700 hover:border-blue-700 mt-8 md:mt-0"
              variant="default"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>
          <div className="relative w-full md:w-5/12 min-h-[320px] sm:min-h-[400px]">
            <Image
              src={product?.imageUrl || "/default-image.png"} // Consider a fallback image
              alt={product?.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
