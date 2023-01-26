import { useFormik } from "formik"
import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { productsByPaginate, removeProduct } from "store/actions/product.actions"
import ProductTable from "./productsTable"
import { errorHelper } from "utils/tools"
import * as Yup from 'yup'
import { TextField } from '@mui/material'
import { Button } from "react-bootstrap"


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

    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(3, 'You need more than 3 ')
                .max(30, 'Your search is too long ')
        }),
        onSubmit: (values, { resetForm }) => {
            setSearchValues({ keywords: values.keywords, page: 1 })
            resetForm()
        }
    })

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

    const resetSearch = () => {
        setSearchValues(defaultValues)
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
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ width: '100%' }}
                            name='keywords'
                            label='Search '
                            variant="outlined"
                            {...formik.getFieldProps('keywords')}
                            {...errorHelper(formik, 'keywords')}
                        />
                    </form>
                    <Button onClick={() => resetSearch()}>
                        Reset search
                    </Button>
                </div>
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