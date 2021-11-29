const Cart = require('../models/Cart')
const CryptoJS = require('crypto-js')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router()

//CREATE CART
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
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
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})
//EMPTY CART
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const result = await Product.findbyIdAndRemove(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const product = await Product.findOne({ userId: req.params.userId })
        res.status(200).json(product)
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

module.exports = router