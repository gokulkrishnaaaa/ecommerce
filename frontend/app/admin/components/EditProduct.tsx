"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProductById, updateProduct } from "@/services/product";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import Layout from "../Layout";

const schema = yup.object({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  imageUrl: yup.mixed<File>().nullable().optional(),
});

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(Number(id));
        reset(product);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    try {
      await updateProduct(Number(id), data);
      alert("Product updated successfully!");
      router.push("/admin/manageproduct");
    } catch (error) {
      console.error("Error updating product", error);
      alert("Failed to update product");
    }
  };
  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              {...register("price")}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Image</label>
            <input
              type="file"
              {...register("imageUrl")}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Product
            </button>
            {/* <button
              type="button"
              onClick={() => router.push("/manage-product")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProduct;
