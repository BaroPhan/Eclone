const Wishlist = require('../models/Wishlist')
const CryptoJS = require('crypto-js')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router()

//CREATE WISHLIST
router.post('/', async (req, res) => {
    const newWishlist = new Wishlist(req.body)
    try {
        const result = await newWishlist.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE WISHLIST
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const exist = await Wishlist.findOne(
            {
                _id: req.params.id,
                products: { $elemMatch: { _id: req.body.data._id, color: req.body.data.color, size: req.body.data.size } }
            }
        )
        if (exist) {
            if (req.body.remove) {
                console.log("remove")
                const updatedList = await Wishlist.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { total: -req.body.total }, $pull: { products: req.body.data } },
                    { new: true },
                )
                res.status(200).json(updatedList)
            }
            else {
                const updatedList = await Wishlist.findOneAndUpdate(
                    {
                        _id: req.params.id,
                        products: { $elemMatch: { _id: req.body.data._id, color: req.body.data.color, size: req.body.data.size } }
                    },
                    { $inc: { "products.$.quantity": req.body.data.quantity, total: req.body.total } },
                    { new: true }
                )
                res.status(200).json(updatedList)
            }
        } else {
            console.log("new")
            const updatedList = await Wishlist.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { total: req.body.total }, $push: { products: req.body.data } },
                { new: true },
            )
            res.status(200).json(updatedList)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET WISHLIST
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const list = await Wishlist.findOne({ userId: req.params.userId })
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json(error)
    }
})
//GET ALL WISHLISTS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const lists = await Wishlist.find()
        res.status(200).json(lists)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router