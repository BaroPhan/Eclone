import { loginFailure, loginStart, loginSuccess, resetState } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { resetCart } from "./cartRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const logOutUser = async (dispatch) => {
    dispatch(resetState())
};


//PRODUCTS
export const resetCarts = async (dispatch) => {
    dispatch(resetCart())
};