const Category = require('../models/Category')
const CryptoJS = require('crypto-js')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router()

//GET ALL CATEGORIES
router.get('/', async (req, res) => {
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (error) {
        res.status(500).json(error)
    }
})
//ADD A CATEGORY
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newCat = new Category(req.body)
    try {
        const result = await newCat.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
//UPDATE A CATEGORY
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCat = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCat)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

// router.get('/categories', async (req, res) => {
//     try {
//         let categories = []
//         const products = await Product.find()
//         products.map(item => {
//             item.categories.map(cat => {categories = [...categories, cat]})
//         })
//         const uniqCats = [...new Set(categories)];
//         res.status(200).json(uniqCats)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
// })
