import { Button, Divider, FormControl, FormHelperText, MenuItem, Select, TextField } from "@material-ui/core"
import { useFormik } from "formik"
import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrands } from "store/actions/brands.actions"
import Loader from "utils/loader"
import { errorHelper } from "utils/tools"
import { validation } from "./formValues"

const AddProduct = () => {

    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    const brands = useSelector(state => state.brands)
    const formik = useFormik({
        initialValues: {
            model: '',
            brand: '',
            category: '',
            description: '',
            price: '',
            available: '',
            shipping: false
        },
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])
    return (
        <DashboardLayout title='Add product'>
            {
                loading ?
                    <Loader />
                    :
                    <>
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
                                Add product
                            </Button>
                        </form>
                    </>
            }

        </DashboardLayout>
    )
}

export default AddProduct

