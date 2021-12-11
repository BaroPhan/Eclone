const Order = require('../models/Order')
const CryptoJS = require('crypto-js')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router()

//CREATE ORDER
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const result = await newOrder.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE ORDER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})
//DELETE ORDER
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
//GET INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const data = await Order.aggregate([
            {
                $match:
                {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } }
                    })
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$amount" }
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})



module.exports = router