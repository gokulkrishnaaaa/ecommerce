"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addProduct } from "@/services/product";
import Layout from "../Layout";

const productSchema = yup.object({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .positive("Price must be a valid number")
    .required("Price is required"),
  imageUrl: yup.mixed<File>().nullable().optional(),
});

interface ProductData {
  name: string;
  description: string;
  price: number;
  imageUrl?: File | null;
}

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data: ProductData) => {
    try {
      const res = await addProduct(data);
      console.log("Product added", res);
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-xl shadow-lg space-y-5"
        >
          
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Name
            </label>
            <input
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Price
            </label>
            <input
              {...register("price")}
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Image (optional)
            </label>
            <input
              type="file"
              {...register("imageUrl")}
              className="w-full text-gray-600 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;
