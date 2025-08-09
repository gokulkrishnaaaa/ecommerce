import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addProduct = async (req: Request, res: Response)=>{
    try {
        const { name, description, price,} = req.body;

        if(!name || !description || !price){
            return res.status(400).json({message:"All fields are required"})
        }
        
        const product = await prisma.product.create({
            data : {
                name,
                description,
                price : parseFloat(price),
                 ...(req.file && { imageUrl: `/uploads/${req.file.filename}` })
            },
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getProducts = async(req: Request, res: Response) =>{
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt : "desc"
            },
        });
        res.json(products)
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getProductById = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where :{
                id : parseInt(id)
            },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
    
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteProduct = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where : {
                id : parseInt(id)
            },
        });

        if(!product){
            return res.status(404).json({message:"Product not found"})
        };

        await prisma.product.delete({
            where : {
                id : parseInt(id)
            },
        });
        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
}

export const updateProduct = async (req:Request, res: Response) =>{
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const product = await prisma.product.findUnique({
            where : {
                id : parseInt(id)
            }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let imageUrl = product.imageUrl;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const updateProduct = await prisma.product.update({
            where : {
                id : parseInt(id)
            },
            data:{
                name,
                description,
                price :parseFloat(price),
                imageUrl
            }
        });
        res.status(200).json(updateProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });   
    }
}