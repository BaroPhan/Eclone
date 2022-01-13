import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        currentCart: null,
        carts: [],
        isFetching: false,
        error: false
    },
    reducers: {
        setCurrentCart: (state, action) => { state.currentCart = action.payload },
        updateCartStart: (state, action) => {
            state.isFetching = true; state.error = false
        },
        updateCartSuccess: (state, action) => {
            console.log(action.payload)
            state.isFetching = false; state.error = false
            state.currentCart = action.payload
        },
        updateCartFailure: (state, action) => {
            state.error = true; state.isFetching = false;
        },
        resetCart: (state) => {
            state.currentCart = null;
        },
        emptyCart: (state) => {
            state.currentCart.products = [];
        }
    },
})

export const { setCurrentCart, updateCartStart, updateCartSuccess, updateCartFailure, updateCart, removeProduct, resetCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer