"use client";
import { postRequest } from "@/actions/APICalls";
import Loader from "@/components/GeneralComponents/Loader";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDone } from "react-icons/md";

const Page = () => {
  const { id } = useParams();
  const router = useRouter()
  const [isLoading, setLoading] = useState(false);

  const createOrder = async () => {
    try {
      setLoading(true);
      const res = await postRequest(
        `orders/create`,
        JSON.stringify({ buyerId: id })
      );

      if (!res.success) {
        toast.error(res?.message);
        return;
      }

      console.log(res);
      toast.success(res?.message);
      router.push(`/order/${res?.orderId}`)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center w-11/12 sm:w-8/12 lg:w-1/2 max-w-[450px] p-8 rounded-lg shadow-lg">
        <div className="flex justify-center items-center h-20 w-20 rounded-full bg-green-600">
          <MdDone color="white" size={40} />
        </div>
        <h2 className="text-3xl font-bold">Payment Successfull</h2>
        <p className="text-slate-500 mt-3 text-center">
          Your order was processed and your assets are available now to download
        </p>
        <Button
          variant={"default"}
          className={`bg-[#7332bd] rounded-md w-full text-white font-medium mt-2`}
          onClick={createOrder}
        >
          {isLoading ? <Loader size={"4"} color="white"/> : <p>Get your asset</p>}
        </Button>
      </div>
    </div>
  );
};

export default Page;
