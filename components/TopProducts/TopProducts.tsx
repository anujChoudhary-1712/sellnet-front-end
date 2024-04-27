"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '../GeneralComponents/ProductCard';
import { getRequest } from '@/actions/APICalls';
import Loader from '../GeneralComponents/Loader';

const TopProducts = () => {
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [isLoading,setLoading] = useState(true)

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await getRequest(`products/get-featured-products/`);
  
          if (!res.success) {
            console.log(res.message);
            return;
          }
          setTopProducts(res.data?.content);
        } catch (error) {
          console.log(error);
        } finally{
            setLoading(false)
        }
      };
      fetchProducts();
    }, []);
    return (
        <>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Loader color="black"/>
          </div>
        ) : (
          <section className="flex flex-col mx-auto max-w-[1400px] w-10/12 pt-6 pb-20">
            <p className="text-[#0F1035] text-3xl font-bold mb-6">
              Top Products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {topProducts.map((product, index) => {
                return (
                  <div key={index}>
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>

          </section>
        )}
      </>
  )
}

export default TopProducts
