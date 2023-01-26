import React from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { errorHelper } from "utils/tools"
import { useDispatch, useSelector } from "react-redux"
import { Button, TextField } from '@mui/material'
import { updateSiteVars } from "store/actions/site.actions"



const SiteVars = () => {

    const site = useSelector(state => state.site)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            address: site.vars.address,
            phone: site.vars.phone,
            hours: site.vars.hours,
            email: site.vars.email
        },
        validationSchema: Yup.object({
            address: Yup.string()
                .min(10, 'You need to add more information')
                .required('This is required'),
            phone: Yup.string()
                .min(9, 'You need to add a valid phone number')
                .required('This is required'),
            hours: Yup.string()
                .min(10, 'You need to add more information')
                .required('This is required'),
            email: Yup.string()
                .email('You need to add a valid email')
                .required('This is required')
        }),
        onSubmit: (values) => {
            dispatch(updateSiteVars({
                _id: site.vars._id, ...values
            }))
        }
    })
    return (
        <>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{ width: '100% ' }}
                        name='address'
                        label='Enter the store address'
                        variant="outlined"
                        {...formik.getFieldProps('address')}
                        {...errorHelper(formik, 'address')}
                    />
                </div>
                <br />
                <div className="form-group">
                    <TextField
                        style={{ width: '100% ' }}
                        name='phone'
                        label='Enter the phone number'
                        variant="outlined"
                        {...formik.getFieldProps('phone')}
                        {...errorHelper(formik, 'phone')}
                    />
                </div>
                <br />
                <div className="form-group">
                    <TextField
                        style={{ width: '100% ' }}
                        name='hours'
                        label='Enter opening hours'
                        variant="outlined"
                        {...formik.getFieldProps('hours')}
                        {...errorHelper(formik, 'hours')}
                    />
                </div>
                <br />
                <div className="form-group">
                    <TextField
                        style={{ width: '100% ' }}
                        name='email'
                        label='Enter the email address'
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik, 'email')}
                    />
                </div>
                <br />
                <Button variant='contained' color='primary' type='submit'>Edit store information</Button>
            </form>
        </>
    )
}

export default SiteVars
