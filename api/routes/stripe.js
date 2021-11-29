const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY)

router.post('/payment', (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (sErr, sRes) => {
        if (sErr) res.status(500).json(sErr)
        else res.status(200).json(sRes)
    })
})

module.exports = router