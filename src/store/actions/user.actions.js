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