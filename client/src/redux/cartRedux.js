import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        },
        updateCart: (state, action) => {
            const findProduct = state.products.find(item => item.uuid === action.payload.uuid)
            if (findProduct) {
                findProduct.quantity = action.payload.quantity
                state.total += action.payload.updatedPrice
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(item => item.uuid !== action.payload.uuid)
            state.quantity -= 1
            state.total -= action.payload.price
        },
        resetCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    },
})

export const { addProduct, updateCart, removeProduct, resetCart } = cartSlice.actions
export default cartSlice.reducer