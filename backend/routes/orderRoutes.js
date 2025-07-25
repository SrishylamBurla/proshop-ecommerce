import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js'
import { Admin, protect } from '../middleware/auth.js'

const router = express.Router()

router.post("/", protect, addOrderItems)
router.get("/myorders", protect, getMyOrders)
router.put("/:id/pay",protect, updateOrderToPaid)
router.put("/:id/deliver", protect, Admin, updateOrderToDelivered)
router.get("/:id", protect, getOrderById)
router.get("/", protect, Admin, getOrders)

export default router