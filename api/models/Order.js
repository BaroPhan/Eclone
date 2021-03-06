const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                _id: { type: String, required: true },
                quantity: { type: Number, default: 1 },
                size: { type: String },
                color: { type: String },
                img: { type: String },
                price: { type: Number, default: 0 }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" }

    }, { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)