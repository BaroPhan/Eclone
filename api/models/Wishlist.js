const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        products: [
            {
                _id: { type: String, required: true },
                quantity: { type: Number, default: 1, writable: true },
                size: { type: String },
                color: { type: String },
                img: { type: String },
                price: { type: Number, default: 0 }
            }
        ],
        total: { type: Number, default: 0 }
    }, { timestamps: true }
)

module.exports = mongoose.model("Wishlist", WishlistSchema)