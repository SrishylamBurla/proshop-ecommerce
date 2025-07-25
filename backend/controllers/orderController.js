import expressAsyncHandler from "express-async-handler";
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";


// @desc & Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body

    if(!orderItems || orderItems.length === 0){
        res.status(400)
        throw new Error('No order Items!')
    }else{
        const order = new Order({
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc & GET logged In user orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = expressAsyncHandler(async (req, res) => {
    // const { _id } = req.user
    const userId = req.user._id
    const orders = await Order.find({user: userId})
    if(!orders || orders.length === 0){
        res.status(404)
        throw new Error('No orders found')
    }
    res.status(200).json(orders)
})

// @desc & GET login user orders
// @route GET /api/orders/:id
// @access Private
export const getOrderById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id).populate('user', 'name email')
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    res.status(200).json(order)
})

// @desc & update order to paid
// @route PUT /api/orders/:id/pay
// @access Private/Admin    
export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid= true;
        order.paidAt= Date.now();
        if (!req.body?.id || !req.body?.payer?.email_address) {
  res.status(400);
  throw new Error("Missing payment details");
}

        order.paymentResult= {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
    }else{
        res.status(404)
        res.json('Order not found')
    }
    
})

// @desc & update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.status(201).json(updatedOrder)
    }else{
        res.status(404)
        res.json('Order not found')
    }
})

// @desc & GET all orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', '_id name')
    res.json(orders)
})
