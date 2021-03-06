const Cart = require('../models/Cart')
const CryptoJS = require('crypto-js')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router()

//CREATE CART
router.post('/', async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const result = await newCart.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE CART
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const exist = await Cart.findOne(
            {
                _id: req.params.id,
                products: { $elemMatch: { _id: req.body.data._id, color: req.body.data.color, size: req.body.data.size } }
            }
        )
        if (exist) {
            console.log("existed")
            if (req.body.remove) {
                console.log("remove")
                const updatedCart = await Cart.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { total: -req.body.total }, $pull: { products: req.body.data } },
                    { new: true },
                )
                res.status(200).json(updatedCart)
            }
            else {
                const updatedCart = await Cart.findOneAndUpdate(
                    {
                        _id: req.params.id,
                        products: { $elemMatch: { _id: req.body.data._id, color: req.body.data.color, size: req.body.data.size } }
                    },
                    { $inc: { "products.$.quantity": req.body.data.quantity, total: req.body.total } },
                    { new: true }
                )
                res.status(200).json(updatedCart)
            }
        } else {
            console.log("new")
            const updatedCart = await Cart.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { total: req.body.total }, $push: { products: req.body.data } },
                { new: true },
            )
            res.status(200).json(updatedCart)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET ALL CARTS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
//EMPTY CART
router.put('/empty/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const emptyCart = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { products: [], total: 0 } },
            { new: true },
        )
        res.status(200).json(emptyCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router