import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET PRODUCTS
        getProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        getProductsFailure: (state) => {
            state.error = true; state.isFetching = false;
        }
    },
})

export const { getProductsStart, getProductsSuccess, getProductsFailure } = productSlice.actions
export default productSlice.reducer