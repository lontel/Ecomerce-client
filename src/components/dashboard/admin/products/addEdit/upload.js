import axios from "axios"
import { useFormik } from "formik"
import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import Loader from "utils/loader"
import { getToken } from "utils/tools"
import * as Yup from 'yup'


const PicUpload = () => {

    const [isLoading, setIsLoadind] = useState(false)

    const uploadForm = useFormik({
        initialValues: { pic: '' },
        validationSchema: Yup.object({
            pic: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            setIsLoadind(true)
            let formData = new FormData()
            formData.append('file', values.pic)

            axios.post(`/api/products/upload`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`
                }
                    .then(response => {
                        //response data
                    }).catch(error => {
                        alert('error')
                    }).finally(() => {
                        setIsLoadind(false)
                    })
            })
        }
    })

    return (
        <>
            {
                isLoading ?
                    <Loader />
                    :
                    <Form onSubmit={uploadForm.handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                type="file"
                                id='file'
                                name='file'
                                onChange={(event) => {
                                    uploadForm.setFieldValue('pic', event.target.files[0])
                                }}
                            />
                            {
                                uploadForm.errors.pic && uploadForm.touched.pic ?
                                    <div>Error</div>
                                    : null
                            }
                        </Form.Group>
                        <Button type="submit" variant="secondary">Add image</Button>
                    </Form>
            }
        </>
    )
}

export default PicUpload