import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getAllCategoriesStart: (state) => {
            state.isFetching = true; state.error = false
        },
        getAllCategoriesSuccess: (state, action) => {
            state.isFetching = false; state.error = false;
            state.categories = action.payload
        },
        getAllCategoriesFailure: (state) => {
            state.isFetching = false; state.error = true;
        },
    }
})

export const { getAllCategoriesStart, getAllCategoriesSuccess, getAllCategoriesFailure } = categorySlice.actions
export default categorySlice.reducer