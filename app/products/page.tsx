"use client";
import { getRequest } from "@/actions/APICalls";
import Loader from "@/components/GeneralComponents/Loader";
import ProductCard from "@/components/GeneralComponents/ProductCard";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getRequest(`products/get-products`);

        if (!res.success) {
          console.log(res.message);
          return;
        }
        setProducts(res.data?.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[90vh]">
          <Loader color="black"/>
        </div>
      ) : (
        <div className="min-h-[85vh]">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-4 sm:mx-8 my-8 sm:my-12 w-full mx-auto max-w-[1400px]">
            {products.map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
