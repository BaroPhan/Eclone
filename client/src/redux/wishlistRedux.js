import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        currentList: null,
        lists: [],
        isFetching: false,
        error: false
    },
    reducers: {
        setCurrentWishlist: (state, action) => { state.currentList = action.payload },
        updateWishlistStart: (state, action) => {
            state.isFetching = true; state.error = false
        },
        updateWishlistSuccess: (state, action) => {
            state.isFetching = false; state.error = false
            state.currentList = action.payload
        },
        updateWishlistFailure: (state, action) => {
            state.error = true; state.isFetching = false;
        },
        resetWishlist: (state) => {
            state.currentList = null;
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    },
})

export const { setCurrentWishlist, updateWishlistStart, updateWishlistSuccess, updateWishlistFailure, resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer