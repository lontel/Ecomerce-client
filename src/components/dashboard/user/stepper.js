import { Button, Step, StepLabel, Stepper, TextField } from "@material-ui/core"
import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import { useDispatch, useSelector } from "react-redux"
import Loader from "utils/loader"
import { errorHelper } from "utils/tools"
import * as Yup from 'yup'



const EmailStepper = ({ users }) => {

    const [loading, setLoading] = useState(false)
    const [emailModal, setEmailModal] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { email: '', newEmail: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('This is required')
                .email('This is not a valid email ')
                .test('match', 'Please check your email', (email) => {
                    return email === users.data.email
                }),
            newEmail: Yup.string()
                .required('This is required')
                .email('This is not a valid email ')
                .test('match', 'Please check your email', (newEmail) => {
                    return newEmail !== users.data.email
                })
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const openModal = () => setEmailModal(true)
    const closeModal = () => setEmailModal(false)

    return (
        <>
            <form className="mt-3 article_form" style={{ maxWidth: '250px' }}>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name='emailStatic'
                        variant="outlined"
                        value={users.data.email}
                        disabled
                    />
                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                >
                    Edit email</Button>

            </form>
            <Modal size="lg" centered show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    stepper
                </Modal.Body>
            </Modal>
        </>
    )

}

export default EmailStepper