const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')
const cartRouter = require('./routes/cart')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to DB")).catch(err => console.log(err))

app.use(express.json())
app.use(morgan("common"))
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on PORT 5000")
})