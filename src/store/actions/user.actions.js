import * as actions from './index'
import axios from "axios"

import { getAuthHeader, getToken, removeToken } from 'utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'


export const userRegister = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/auth/register`, {
                email: values.email,
                password: values.password
            })
            dispatch(actions.userAuthenticate({ data: user.data.user, auth: true }))
            dispatch(actions.successGlobal(`Welcome ${values.email}!! check your email to verify account.`))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userLogIn = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/auth/signin`, {
                email: values.email,
                password: values.password
            })
            dispatch(actions.userAuthenticate({ data: user.data.user, auth: true }))
            dispatch(actions.successGlobal(`Welcome ${values.email}!!`))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))

        }
    }
}

export const userIsAuth = () => {
    return async (dispatch) => {
        try {
            if (!getToken()) {
                throw new Error()
            }

            const user = await axios.get(`/api/auth/isauth`, getAuthHeader())
            dispatch(actions.userAuthenticate({ data: user.data, auth: true }))
        } catch (error) {
            dispatch(actions.userAuthenticate({ data: {}, auth: false }))
            dispatch(actions.errorGlobal('You have to login first!'))
        }
    }
}

export const userSignOut = () => {
    return async (dispatch) => {
        removeToken()
        dispatch(actions.userSignOut())
        dispatch(actions.successGlobal('Good bye!!'))
    }
}

export const updateUserProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            const profile = await axios.patch('/api/users/profile', {
                data: data
            }, getAuthHeader())
            const userData = {
                ...getState().users.data,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname
            }
            dispatch(actions.updateUserProfile(userData))
            dispatch(actions.successGlobal('Profile updated succesfully!'))


        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const updateUserEmail = (data) => {
    return async (dispatch) => {
        try {
            await axios.patch(`/api/users/email`, {
                email: data.email,
                newemail: data.newemail
            }, getAuthHeader());

            dispatch(actions.updateUserEmail(data.newemail))
            dispatch(actions.successGlobal('Email updated succesfully!'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userAddToCart = (item) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.cart
            dispatch(actions.userAddToCart([
                ...cart, item
            ]))
            dispatch(actions.successGlobal(`${item.model} added to cart 😀`))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeFromCart = (index) => {
    return async (dispatch, getState) => {
        try {
            const cart = getState().users.cart
            cart.splice(index, 1)
            dispatch(actions.userAddToCart(cart))
            dispatch(actions.successGlobal(` Item removed`))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const userPurchaseSuccess = (orderID) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/transaction`, { orderID }, getAuthHeader())
            dispatch(actions.successGlobal('Thank you !!'))
            dispatch(actions.userPurchaseSuccess(user.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}