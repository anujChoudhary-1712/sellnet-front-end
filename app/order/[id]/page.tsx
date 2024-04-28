"use client";
import { getRequest } from "@/actions/APICalls";
import Loader from "@/components/GeneralComponents/Loader";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";

const Page = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await getRequest(`orders/getOrder/${id}`);
        if (!res.success) {
          console.log(res?.message);
          return;
        }

        console.log(res);
        setOrder(res?.data?.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <div className="min-h-[85vh] flex justify-center items-center">
          <Loader color="black" />
        </div>
      ) : (
        <div className="min-h-[89vh] p-4 sm:p-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-blue-700 font-medium">
              Order successfull
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold">
              Thanks for ordering
            </h2>
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex gap-2">
              <p className="text-slate-500 text-sm">Order no :</p>
              <p className="font-medium text-sm">{order?._id}</p>
            </div>
            <div className="w-full h-1 bg-gray-100"></div>
            <div className="flex flex-col gap-4 w-full">
              {order.products.map((product: any, index: number) => {
                return (
                  <div key={index} className="flex justify-between w-full">
                    <div className="flex gap-4">
                      <div className="relative w-[250px] h-[150px]">
                        <Image
                          src={product?.imageUrl}
                          alt={product?.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex flex-col justify-between h-[150px]">
                        <div>
                          <p className="text-xl font-semibold">
                            {product?.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            Category : {product?.category}
                          </p>
                        </div>
                        <Link
                          href={product?.fileUrl}
                          className="text-blue-600 hover:underline"
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download asset
                        </Link>
                      </div>
                    </div>
                    <p className="font-semibold">${product?.price}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-1 bg-gray-100"></div>
            <div className="flex justify-between w-full">
              <p className="font-semibold">Total Amount</p>
              <p className="font-semibold">$ {order?.totalAmount}</p>
            </div>
            <div className="w-full h-1 bg-gray-100"></div>
            <div className="flex justify-between w-full md:w-8/12">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-500">Shipping to</p>
                <p className="text-sm">{order?.buyerId?.email}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-500">Order status</p>
                <p className="text-sm">Payment successfull</p>
              </div>
            </div>
            <Link href={"/"} className="flex gap-2 items-center justify-center text-sm text-blue-500 w-fit mt-8">
              Continue shopping <MdArrowRightAlt />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
