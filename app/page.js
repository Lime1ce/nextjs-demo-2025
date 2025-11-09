"use client";

import React, { use, useEffect, useState } from "react";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');

      if (!response.ok) throw new Error('I have failed you, Anakin. I have failed you!');

      const allProduct = await response.json();

      setProducts(allProduct.products);
      setFilteredProduct(allProduct.products);

    } catch (error) {
      setProducts([]);
      setFilteredProduct([]);
    }
  }

  console.log('I--=[products]=--I', products);
  console.log('I--=[filteredProduct]=--I', filteredProduct);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSearch = (text) => {
    const filterProduct = products.filter((p) =>
      p.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredProduct(filterProduct);
  }

  return (
    <div className='bg-[#F5F5F5]'>
      <div className='flex w-full'>
        <div className='w-1/3'>
          <Header />
        </div>
        <div className='flex-1'>
          <FormComponent onSearch={handleSearch}/>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {filteredProduct.map((item) => (
          <div 
            key={item.id}
            className='bg-[#FFFFFF] flex flex-col border border-gray-300 rounded-sm hover:shadow-lg cursor-pointer hover:border-1px hover:!border-red-500  transform transition-transform duration-300 hover:-translate-y-2 hover:bg-red-50'
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <img
              alt={item.title}
              src={item.thumbnail}
            />
            <p className='text-[16px] font-bold pl-3'>{item.title}</p>
            <p className='text-[16px] pl-3'>${item.price}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}
