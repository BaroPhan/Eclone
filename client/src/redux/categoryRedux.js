import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL CATEGORIES
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
        //UPDATE CAT
        updateCatStart: (state) => {
            state.isFetching = true; state.error = false
        },
        updateCatSuccess: (state, action) => {
            state.isFetching = false; state.error = false;
            state.categories[state.categories.findIndex(item => item._id === action.payload.id)] = action.payload.category
        },
        updateCatFailure: (state) => {
            state.isFetching = false; state.error = true;
        },
        //ADD CAT
        addCatStart: (state) => {
            state.isFetching = true; state.error = false
        },
        addCatSuccess: (state, action) => {
            state.isFetching = false; state.error = false;
            state.categories.push(action.payload)
        },
        addCatFailure: (state) => {
            state.isFetching = false; state.error = true;
        },
    }
})

export const {
    getAllCategoriesStart,
    getAllCategoriesSuccess,
    getAllCategoriesFailure,
    updateCatStart,
    updateCatSuccess,
    updateCatFailure,
    addCatStart,
    addCatSuccess,
    addCatFailure
} = categorySlice.actions
export default categorySlice.reducer