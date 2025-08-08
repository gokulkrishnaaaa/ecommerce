import api from "../lib/axios";

interface RegisterData {
    name: string,
    email: string,
    password: string,
}

interface LoginData {
    email: string,
    password: string
}

export const registerUser = async (data : RegisterData) =>{
    const response = await api.post("/user/register", data);
    return response.data;
}

export const loginUser = async (data: LoginData) =>{
    const response = await api.post("/user/login", data);
    return response.data;
}