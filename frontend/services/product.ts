import api from "@/lib/axios";

interface ProductData {
    name : string;
    description : string;
    price : number;
    imageUrl? : File | null;
}

export const addProduct = async (data: ProductData) =>{
    const response = await api.post("/product", data);
    return response.data;
}

export const getProducts = async () =>{
    const response = await api.get("/product");
    return response.data;
}

export const getProductById = async (id: number) =>{
    const response = await api.get(`/product/${id}`);
    return response.data;
}

export const updateProduct = async (id: number, data: ProductData) => {
    const response = await api.put(`/product/${id}`, data);
    return response.data;
}

export const deleteProduct = async (id : number) =>{
    const response = await api.delete(`/product/${id}`);
    return response.data;
}