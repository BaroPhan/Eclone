import { addUserFailure, addUserStart, addUserSuccess, loginFailure, loginStart, loginSuccess, resetState, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { updateCartFailure, updateCartStart, updateCartSuccess, resetCart, setCurrentCart, emptyCart } from "./cartRedux";
import { getAllCategoriesFailure, getAllCategoriesStart, getAllCategoriesSuccess } from "./categoryRedux";
import { getProductsFailure, getProductsStart, getProductsSuccess } from "./productRedux";
import { resetWishlist, setCurrentWishlist, updateWishlistFailure, updateWishlistStart, updateWishlistSuccess } from "./wishlistRedux";

//USERS
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        const TOKEN = res.data.accessToken
        userRequest.defaults.headers.token = `Bearer ${TOKEN}`

        const cart = await userRequest.get(`/carts/find/${res.data._id}`)
        const wishlist = await userRequest.get(`/wishlists/find/${res.data._id}`)
        dispatch(setCurrentCart(cart.data))
        dispatch(setCurrentWishlist(wishlist.data))

        dispatch(loginSuccess(res.data));

    } catch (err) {
        dispatch(loginFailure());
    }
};
export const logOutUser = async (dispatch) => {
    dispatch(resetState())
};
export const registerUser = async (dispatch, navigate, data) => {
    dispatch(addUserStart());
    try {
        const res = await publicRequest.post("/auth/register", data);

        await userRequest.post('/carts/', { userId: res.data._id })
        await userRequest.post('/wishlists/', { userId: res.data._id })

        dispatch(addUserSuccess(res.data))
        navigate('/login')
    } catch (err) {
        dispatch(addUserFailure());
    }
};
export const updateUser = async (id, data, dispatch) => {
    dispatch(updateUserStart());
    try {
        await userRequest.put(`/users/${id}`, data);
        dispatch(updateUserSuccess(data));
    } catch (err) {
        console.log(err)
        dispatch(updateUserFailure());
    }
};


//PRODUCTS
export const resetCarts = async (dispatch) => {
    dispatch(resetCart())
};
export const emptyCarts = async (dispatch, id) => {
    dispatch(updateCartStart());
    try {
        const res = await userRequest.put(`/carts/empty/${id}`)
        console.log(res.data)
        dispatch(updateCartSuccess(res.data));
    } catch (err) {
        console.log(err)
        dispatch(updateCartFailure());
    }
};
export const resetWishlists = async (dispatch) => {
    dispatch(resetWishlist())
};
export const getProducts = async (dispatch, cat) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get(cat ? `/products/?category=${cat}` : '/products/')
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};
export const updateCart = async (dispatch, data, cart, remove) => {
    dispatch(updateCartStart());
    try {
        const res = await userRequest.put(`/carts/${cart._id}`, { data: data, total: data.price * data.quantity, remove: remove })
        dispatch(updateCartSuccess(res.data));
    } catch (err) {
        console.log(err)
        dispatch(updateCartFailure());
    }
};
export const updateWishlist = async (dispatch, data, wishlist, remove) => {
    dispatch(updateWishlistStart());
    try {
        const res = await userRequest.put(`/wishlists/${wishlist._id}`, { data: data, total: data.price * data.quantity, remove: remove })
        dispatch(updateWishlistSuccess(res.data));
    } catch (err) {
        console.log(err)
        dispatch(updateWishlistFailure());
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