"use client";
import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "@/services/product";
import Link from "next/link";
import Layout from "../Layout";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const ManageProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetch = async () => {
    try {
      const res = await getProducts();
      setProducts(res);
      console.log("Products", res);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    fetch();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-3">
          Manage Products
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No products found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-700 font-semibold">
                      ₹{product.price}
                    </td>
                    <td className="p-4 flex gap-3">
                      <Link
                        href={`/admin/editproduct/${product.id}`}
                        className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageProduct;
