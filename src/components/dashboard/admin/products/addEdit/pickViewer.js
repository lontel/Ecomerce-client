import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const PicViewer = ({ formik, deletePic }) => {

    const [idToDelete, setIdToDelete] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => (setShowModal(false))
    const handleShow = (index) => {
        setShowModal(true)
        setIdToDelete(index)
    }
    const handleDeletePic = () => {
        deletePic(idToDelete)
        handleClose()
        setIdToDelete(null)
    }

    return (
        <>
            {
                formik.values && formik.values.images ?
                    formik.values.images.map((item, i) => (
                        <div key={item}
                            className="pic_block"
                            onClick={() => handleShow(i)}
                            style={{
                                background: `url(${item})`
                            }}
                        ></div>
                    ))
                    : null
            }

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='error' onClick={handleDeletePic}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default PicViewer