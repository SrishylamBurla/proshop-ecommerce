import express from 'express';
import {getProducts,
        getProductById, 
        createProduct, 
        deleteProduct, 
        updateProduct, 
        createdProductReview,
        getTopProducts} from '../controllers/productController.js'
import {protect} from '../middleware/auth.js'
import { Admin } from '../middleware/auth.js';

const router = express.Router();

router.post("/", protect, Admin, createProduct)
router.get("/", getProducts)
router.get("/top", getTopProducts)
router.get("/:id", getProductById)
router.put("/:id", protect, Admin, updateProduct)
router.delete('/:id', protect, Admin, deleteProduct)
router.post("/:id/reviews",protect, createdProductReview)



export default router;
