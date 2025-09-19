import Product from "../model/product.js";
import { isAdmin, isUserNull } from "./userController.js";

export async function addProducts(req, res) {
    try {

        if (isUserNull(req)) {
            res.status(401).json({
                message: "Please login to perform this task"
            });
            return
        }

        if (!isAdmin(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            });
            return
        }

        if (isAdmin(req)) {
            const productData = req.body;
            const product = new Product(productData);
            await product.save();
            res.json({
                message: "Product add success"
            });
            return;
        }
    } catch (e) {
        res.status(500).json({
            message: "Product couldn't add"
        });
    }
}


export async function getProducts(req, res) {
    try {
        if (isUserNull(req) || !isAdmin(req)) {
            const products = await Product.find({
                availability: true
            });
            res.json(products);
            return;
        }


        if (isAdmin(req)) {
            const products = await Product.find();
            res.json(products);
            return;
        }


    } catch (e) {
        res.status(500).json({
            message: "Product couldn't fetch" + e.message
        });
    }
}


export async function deleteProduct(req, res) {
    try {
        if (isUserNull(req) || !isAdmin(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            })

            return;
        }

        if (isAdmin(req)) {
            const deleteId = req.params.productKey;
            await Product.deleteOne({
                productKey: deleteId
            });
            res.json({
                message: "Product delete success"
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Product delete failed"
        });
    }

}


export async function updateProduct(req, res) {
    try {
        if (isUserNull(req) || !isAdmin(req)) {
            res.status(401).json({
                message: "You are not authorized to perform this task"
            });
            return
        }

        if (isAdmin(req)) {
            const updateData = req.body;
            const updateId = req.params.productKey;
            await Product.updateOne({
                productKey: updateId
            },
                updateData
            );
            res.json({
                message: "Product update success"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Product update failed"
        })
    }
}
