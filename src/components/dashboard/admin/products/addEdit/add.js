import { Button, Divider, FormControl, FormHelperText, MenuItem, Select, TextField } from "@material-ui/core"
import { useFormik } from "formik"
import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "utils/loader"
import { errorHelper } from "utils/tools"
import { validation } from "./formValues"


const AddProduct = () => {

    const [loading, setLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
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

    return (
        <DashboardLayout title='Add product'>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        <form className="mt-3 article_form">
                            formulario
                        </form>
                    </>
            }

        </DashboardLayout>
    )
}

export default AddProduct