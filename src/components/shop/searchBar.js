import { TextField } from "@mui/material"
import { useFormik } from "formik"
import React from "react"
import { errorHelper } from "utils/tools"
import * as Yup from 'yup'


const SearchBar = (props) => {

    const formik = useFormik({
        initialValues: { keywords: '' },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(3, 'You need to search for more than 3')
                .max(30, 'You need to search for les than 30')
        }),
        onSubmit: (values, { resetForm }) => {
            props.handleKeywords(values.keywords)
            resetForm()
        }
    })

    return (
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <TextField
                    style={{
                        width: '100%'
                    }}
                    placeholder='Search for something'
                    name="keywords"
                    variant="outlined"
                    {...formik.getFieldProps('keywords')}
                    {...errorHelper(formik, 'keywords')}
                />
            </form>
        </div>
    )
}

export default SearchBar