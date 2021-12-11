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
        },
        //DELETE PRODUCT
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload), 1
            )
            state.error = false;
        },
        deleteProductFailure: (state) => {
            state.error = true; state.isFetching = false;
        },
         //UPDATE PRODUCT
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex(item => item._id === action.payload.id)] = action.payload.product;
            state.error = false;
        },
        updateProductFailure: (state) => {
            state.error = true; state.isFetching = false;
        },
        //ADD PRODUCT
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload)
            state.error = false;
        },
        addProductFailure: (state) => {
            state.error = true; state.isFetching = false;
        },
    },
})

export const { getProductsStart, getProductsSuccess, getProductsFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure, updateProductFailure, updateProductSuccess, updateProductStart, addProductFailure, addProductSuccess, addProductStart } = productSlice.actions
export default productSlice.reducer