import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { productsByPaginate, removeProduct } from "store/actions/product.actions"
import ProductTable from "./productsTable"

const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 2000,
    page: 1
}
const AdminProducts = () => {

    const products = useSelector(state => state.products)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )

    const [removeModal, setRemoveModal] = useState(false)
    const [toRemove, setToRemove] = useState(null)




    const goToPage = (page) => {
        setSearchValues({ page: page })
    }

    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`)
    }

    const closeModal = () => {
        setRemoveModal(false)
    }

    const handleModal = (id) => {
        setToRemove(id)
        setRemoveModal(true)
    }

    const handleRemove = () => {
        dispatch(removeProduct(toRemove))
    }

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])

    useEffect(() => {
        closeModal()
        setRemoveModal(null)
        if (notifications && notifications.removeProduct) {
            dispatch(productsByPaginate(searchValues))
        }
    }, [dispatch, notifications, searchValues])


    return (
        <DashboardLayout title='Products' >
            <div className="products_table">
                <div>search</div>
                <hr />
                <ProductTable
                    closeModal={closeModal}
                    removeModal={removeModal}
                    prods={products.byPaginate}
                    prev={(page) => goToPage(page)}
                    next={(page) => goToPage(page)}
                    goToEdit={(id) => goToEdit(id)}
                    handleModal={(id) => handleModal(id)}
                    handleRemove={() => handleRemove()}
                />
            </div>
        </DashboardLayout>
    )
}

export default AdminProducts