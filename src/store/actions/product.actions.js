import * as actions from './index'
import axios from "axios"

import { getAuthHeader, getToken, removeToken } from 'utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const productsBySort = ({ limit, sortBy, order, where }) => {
    return async (dispatch) => {
        try {
            const products = await axios.get(`/api/products/allProducts`, {
                params: {
                    limit,
                    sortBy,
                    order
                }
            })

            switch (where) {
                case 'bySold':
                    dispatch(actions.productsBySold(products.data))
                    break
                case 'byDate':
                    dispatch(actions.productsByDate(products.data))
                    break
                default:
                    return false
            }
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsByPaginate = (args) => {
    return async (dispatch) => {
        try {
            const products = await axios.post('/api/products/paginate/all', args)
            dispatch(actions.productsByPaginate(products.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const removeProduct = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/products/product/${id}`, getAuthHeader())
            dispatch(actions.removeProduct())
            dispatch(actions.successGlobal('Product deleted succesfully!'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}