import { Button, Divider, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from "formik"
import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editProduct, productsById } from "store/actions/product.actions"
import { getAllBrands } from "store/actions/brands.actions"
import Loader from "utils/loader"
import { errorHelper } from "utils/tools"
import { validation, formValues, getValuesToEdit } from "./formValues"
import { useNavigate, useParams } from "react-router-dom"
import PicUpload from "./upload"
import { clearCurrentProduct } from 'store/actions/index'
import PicViewer from "./pickViewer"

const EditProduct = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState(formValues)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const notifications = useSelector(state => state.notifications)
    const brands = useSelector(state => state.brands)
    const products = useSelector(state => state.products)
    const productsCategory = ['Smart Watches', 'Laptops & Computers', 'TVs & Projectors', 'Video Games', 'Tablets', 'Smart Phones', 'Cameras & Camcorders', 'Other']


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: validation,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(editProduct(values, id))
    }

    const handlePicValue = (pic) => {
        const picArray = formik.values.images
        picArray.push(pic.url)
        formik.setFieldValue('images', picArray)
    }

    const deletePic = (index) => {
        const picArray = formik.values.images
        picArray.splice(index, 1)
        formik.setFieldValue('images', picArray)
    }


    useEffect(() => {
        if (notifications && notifications.success) {
            navigate('/dashboard/admin/admin_products')
        }
        if (notifications && notifications.error) {
            setIsLoading(false)
        }
    }, [notifications, navigate])

    useEffect(() => {
        dispatch(getAllBrands())
        if (id) {
            dispatch(productsById(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (products && products.byId) {
            setValues(getValuesToEdit(products.byId))
        }
    }, [products])

    useEffect(() => {
        if (!products) {
            setIsLoading(true)
        }
    }, [products])

    useEffect(() => {
        return () => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])


    return (
        <DashboardLayout title='Edit product'>
            {
                isLoading ?
                    <Loader />
                    :
                    <>
                        <PicViewer formik={formik}
                            deletePic={(index) => deletePic(index)}
                        />
                        <br />
                        <PicUpload
                            picValue={(pic) => handlePicValue(pic)}
                        />
                        <br />
                        <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>

                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%' }}
                                    name='model'
                                    label='Enter a model'
                                    variant="outlined"
                                    {...formik.getFieldProps('model')}
                                    {...errorHelper(formik, 'model')}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <FormControl variant="outlined">
                                    <h5>Select a brand</h5>
                                    <Select
                                        name="brand"
                                        {...formik.getFieldProps('brand')}
                                        error={formik.errors.brand && formik.touched.brand ? true : false}
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            brands && brands.all ?
                                                brands.all.map((item) => (
                                                    <MenuItem key={item._id} value={item._id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))
                                                : null
                                        }
                                    </Select>
                                    {
                                        formik.errors.brand && formik.touched.brand ?
                                            <FormHelperText error={true}>
                                                {formik.errors.brand}
                                            </FormHelperText>
                                            : null
                                    }
                                </FormControl>

                            </div>
                            <br />
                            <div className="form-group">
                                <FormControl variant="outlined">
                                    <h5>Select a category</h5>
                                    <Select
                                        name="category"
                                        {...formik.getFieldProps('category')}
                                        error={formik.errors.category && formik.touched.category ? true : false}
                                    >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        {

                                            productsCategory.map((item, i) => (
                                                <MenuItem key={i} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))

                                        }
                                    </Select>
                                    {
                                        formik.errors.category && formik.touched.category ?
                                            <FormHelperText error={true}>
                                                {formik.errors.category}
                                            </FormHelperText>
                                            : null
                                    }
                                </FormControl>
                            </div>

                            <br />
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%' }}
                                    name='description'
                                    label='Enter the description'
                                    variant="outlined"
                                    {...formik.getFieldProps('description')}
                                    {...errorHelper(formik, 'description ')}
                                    multiline
                                    minRows={4}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%' }}
                                    name='price'
                                    label='Enter a price'
                                    variant="outlined"
                                    type='number'
                                    {...formik.getFieldProps('price')}
                                    {...errorHelper(formik, 'price ')}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <TextField
                                    style={{ width: '100%' }}
                                    name='available'
                                    label='How many units do we have in storage?'
                                    variant="outlined"
                                    type='number'
                                    {...formik.getFieldProps('available')}
                                    {...errorHelper(formik, 'available ')}
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <FormControl variant="outlined">
                                    <h5>Do we offer free shipping?</h5>
                                    <Select
                                        name="shipping"
                                        {...formik.getFieldProps('shipping')}
                                        error={formik.errors.shipping && formik.touched.shipping ? true : false}
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                    {
                                        formik.errors.shipping && formik.touched.shipping ?
                                            <FormHelperText error={true}>
                                                {formik.errors.shipping}
                                            </FormHelperText>
                                            : null
                                    }
                                </FormControl>
                            </div>

                            <Divider className="mt-3 mb-3" />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Edit product
                            </Button>
                        </form>
                    </>
            }

        </DashboardLayout>
    )
}

export default EditProduct



