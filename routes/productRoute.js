import express from 'express';
import { addProducts, deleteProduct, getProducts, updateProduct } from '../controller/productController.js';


const productRouter = express.Router();

productRouter.post("/add",addProducts);
productRouter.get("/get",getProducts);
productRouter.delete("/delete/:productKey",deleteProduct);
productRouter.put("/update/:productKey",updateProduct);


export default productRouter;