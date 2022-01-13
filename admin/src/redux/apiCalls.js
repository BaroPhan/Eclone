import { resetState, addUserFailure, addUserStart, addUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, loginFailure, loginStart, loginSuccess, updateUserStart, updateUserSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { getProductsFailure, getProductsStart, getProductsSuccess, deleteProductStart, deleteProductSuccess, deleteProductFailure, addProductStart, addProductSuccess, addProductFailure, updateProductStart, updateProductSuccess, updateProductFailure } from "./productRedux";
import { addCatFailure, addCatStart, addCatSuccess, getAllCategoriesFailure, getAllCategoriesStart, getAllCategoriesSuccess, updateCatFailure, updateCatStart, updateCatSuccess } from "./categoryRedux";

export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        if (res.data.isAdmin) {
            dispatch(loginSuccess(res.data))
            const TOKEN = res.data.accessToken
            userRequest.defaults.headers.token = `Bearer ${TOKEN}`
            navigate('/', { replace: true })
        } else dispatch(loginFailure())
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const logOutUser = async (dispatch) => {
    dispatch(resetState())
};

//PRODUCT
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get("/products/");
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        // const res = await publicRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post('/products/', product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};
export const updateProduct = async (id, data, dispatch) => {
    dispatch(updateProductStart());
    try {
        await userRequest.put(`/products/${id}`, data);
        dispatch(updateProductSuccess(id, data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

//USERS
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await userRequest.get("/users/");
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        // const res = await publicRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};
export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post('/auth/register', user);
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
};
export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess(id, user));
    } catch (err) {
        dispatch(addUserFailure());
    }
};

//CATEGORIES
export const getCategories = async (dispatch) => {
    dispatch(getAllCategoriesStart());
    try {
        const res = await userRequest.get("/categories/");
        dispatch(getAllCategoriesSuccess(res.data));
    } catch (err) {
        dispatch(getAllCategoriesFailure());
    }
}
export const updateCat = async (id, category, dispatch) => {
    dispatch(updateCatStart());
    try {
        await userRequest.put(`/categories/${id}`, category);
        dispatch(updateCatSuccess(id, category));
    } catch (err) {
        dispatch(updateCatFailure());
    }
};
export const addCat = async (category, dispatch) => {
    dispatch(addCatStart());
    try {
        const res = await userRequest.post('/categories/', category);
        dispatch(addCatSuccess(res.data));
    } catch (err) {
        dispatch(addCatFailure());
    }
};