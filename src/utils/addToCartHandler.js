import React from "react"
import { Button, Modal } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"


const AddToCartHandler = ({ modal, handleClose, errorType }) => {
    return (
        <>
            <Modal show={modal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sorry  ☹️</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        errorType === 'auth' ?
                            <div>Sorry, you have to sign in first</div>
                            :
                            <div>Sorry, you have to verify your account first</div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        errorType === 'auth' ?
                            <LinkContainer to='/sign_in'>
                                <Button variant="primary">Go to register / sign in</Button>
                            </LinkContainer>
                            :
                            <Button variant="primary" onClick={() => alert('trigger')}>
                                Send verification email again
                            </Button>
                    }
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default AddToCartHandler