import express from "express";
import { upload } from "../middleware/upload";
 import {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
 } from "../controllers/product";

 const router = express.Router();

 router.post("/",upload.single("image"), addProduct);
 router.get("/", getProducts);
 router.get("/:id", getProductById);
 router.delete("/:id", deleteProduct);
 router.put("/:id", upload.single("image"), updateProduct);

 export default router;