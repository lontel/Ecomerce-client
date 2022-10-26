import * as actions from './index'
import axios from 'axios'

export const productsBySort = ({ limit, sortBy, order, where }) => {
    return async (dispatch) => {
        try {
            const products = await axios.get('/api/products/allProducts', {
                limit, sortBy, order
            })

            switch (where) {
                case 'bySold':
                    dispatch(actions.prodBySold(products.data))
                    break
                case 'byDate':
                    dispatch(actions.prodByDate(products.data))
                    break
                default:
                    return false
            }

        } catch (error) {
            console.log(error)
        }
    }
}