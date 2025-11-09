"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "reactstrap";

function formatStars(score) {
  if (!score) score = 0;

  if (score > 5) score = 5;
  if (score < 0) score = 0;

  let stars = "★".repeat(score);
  stars += "☆".repeat(5 - score);

  return stars;
}

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState({});

  const getProductById = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      setProduct({});
    }
  };
  console.log('--product--', product);

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div>
      <div className='h-20 w-full'>
        <Header />
      </div>

      <div className="flex flex-column h-auto justify-center gap-4 m-auto p-[1rem] max-w-[600px]">
        <p className="text-2xl font-bold text-center">อ่านดูก่อนซื้อเด้อพี่น้องเด้อ</p>

        <div className="flex flex-column w-full gap-2 items-center">
          <img
            alt={product.title}
            src={product.thumbnail}
            className='h-[200px]'
          />
          <p className='text-xl font-bold'>{product.title}</p>
          <p className='text-lg'>Description: {product.description}</p>
          <p className='text-lg'>${product.price}</p>
          {(Array.isArray(product.reviews) && product.reviews.length > 0) && (
            <div className='w-full'>
              <p className='text-xl font-semibold'>Reviews</p>
              <div className='flex flex-col gap-3'>
                {product.reviews.map((item, index) => (
                  <div key={index} className={'border border-gray-200 rounded-xl p-3'}>
                    <div className='flex items-center justify-between'>
                      <span className='font-bold'>{item.reviewerName}</span>
                      <span>
                        {formatStars(item.rating)} ({item.rating})
                      </span>
                    </div>
                    <p>{item.comment}</p>
                    <p className='iext-xs'>
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button
            className='w-[30%] !bg-[#FF383F] self-center'
            onClick={() => router.push('/')}
          >
            กินเข่าละบ่ ถ้าบ่ก็ไปหากินพรันพรือ
          </Button>
      </div>
    </div>

  );
}
