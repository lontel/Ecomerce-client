import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { getToken } from 'utils/tools'
import Loader from 'utils/loader'


const PicUpload = ({ picValue }) => {
    const [isLoading, setIsLoading] = useState(false)

    const formikImg = useFormik({
        initialValues: { pic: '' },
        validationSchema: Yup.object({
            pic: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            let formData = new FormData()
            formData.append("file", values.pic)
            axios.post(`/api/products/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            }).then(response => {
                picValue(response.data)
            }).catch(error => {
                alert(error)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    })

    return (
        <>
            {isLoading ?
                <Loader />
                :
                <Form onSubmit={formikImg.handleSubmit}>
                    <Form.Group >
                        <Form.Control
                            type='file'
                            id="file"
                            name="file"
                            onChange={(event) => {
                                formikImg.setFieldValue("pic", event.target.files[0])
                            }}
                        />
                        {formikImg.errors.pic && formikImg.touched.pic ?
                            <div>Error</div>
                            : null
                        }
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Add image
                    </Button>
                </Form>
            }
        </>
    )

}

export default PicUpload