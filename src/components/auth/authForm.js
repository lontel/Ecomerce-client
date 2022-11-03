import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Loader from 'utils/loader'
import { errorHelper } from 'utils/tools'

import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { userRegister, userLogIn } from 'store/actions/user.actions'


const AuthForm = (props) => {
    const notifications = useSelector(state => state.notifications)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is an invalid email'),
            password: Yup.string()
                .required('Sorry the password is required')
        }),
        onSubmit: (values) => {
            setLoading(true);
            handleSubmit(values)
        }
    })


    const handleSubmit = (values) => {

        if (props.formType) {
            dispatch(userRegister(values))
        } else {
            dispatch(userLogIn(values))
        }

    }


    useEffect(() => {
        if (notifications && notifications.success) {
            navigate('/dashboard')
        } else {
            setLoading(false)
        }
    }, [notifications, navigate])


    return (
        <>
            <div className="auth_container">

                {loading ?
                    <Loader />
                    :
                    <form className="mt-3" onSubmit={formik.handleSubmit}>

                        <div className="form-group">
                            <TextField
                                style={{
                                    width: '100%',
                                    margin: '10px 0px 20px 0px '
                                }}
                                name="email"
                                label="Enter your email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                style={{ width: '100%' }}
                                name="password"
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                            style={{ margin: '10px 0px 20px 0px ' }}
                        >
                            {props.formType ? 'Register' : 'Login'}
                        </Button>

                    </form>
                }


            </div>
        </>
    )
}

export default AuthForm