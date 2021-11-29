const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

//REGISTER A USER
router.post('/register', async (req, res) => {
    const newUser = new User({ ...req.body, password: CryptoJS.AES.encrypt(req.body.password, process.env.PWRD_SEC_KEY).toString() })
    try {
        await newUser.save()
        res.status(200).json("User registered!")
    } catch (error) {
        console.log(error)
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json("there is no username like that!")

        const decryptedPWRD = CryptoJS.AES.decrypt(user.password, process.env.PWRD_SEC_KEY).toString(CryptoJS.enc.Utf8)
        decryptedPWRD !== req.body.password && res.status(401).json("incorrect password")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC_KEY, { expiresIn: "3d" })

        const { password, ...others } = user._doc
        res.status(200).json({ ...others, accessToken })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router