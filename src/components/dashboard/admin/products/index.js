import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { productsByPaginate } from "store/actions/product.actions"
import ProductTable from "./productsTable"

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 2000,
    page: 2
}
const AdminProducts = (props) => {

    const products = useSelector(state => state.products)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
        console.log()
    }, [dispatch, searchValues])

    return (
        <DashboardLayout title='Products' >
            <div className="products_table">
                <div>search</div>
                <hr />
                <ProductTable
                    prods={products.byPaginate}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminProducts