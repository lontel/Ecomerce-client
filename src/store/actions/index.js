import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    UPDATE_USER_EMAIL,
    GET_PROD_PAGINATE,
    REMOVE_PRODUCT
} from '../types'



///  USER

export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const userSignOut = () => ({
    type: SIGN_OUT
})

export const updateUserProfile = (userData) => ({
    type: UPDATE_USER_PROFILE,
    payload: userData
})

export const updateUserEmail = (data) => ({
    type: UPDATE_USER_EMAIL,
    payload: data
})

////   PRODUCTS

export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload: data
})

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
})

export const productsByPaginate = (products) => ({
    type: GET_PROD_PAGINATE,
    payload: products
})

export const removeProduct = () => ({
    type: REMOVE_PRODUCT
})


/// NOTIFICATIONS

export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
} 
