"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/product";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 flex gap-8">
      <div className="flex-shrink-0">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-64 h-64 object-cover rounded"
          />
        ) : (
          <div className="w-64 h-64 bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600 mb-6">
          ₹{product.price}
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
