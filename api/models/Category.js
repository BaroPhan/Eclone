const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        img: { type: String }
    }
)

module.exports = mongoose.model("Category", CategorySchema)