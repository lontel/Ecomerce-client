import React from "react"
import { Button, Modal, Pagination, Table } from "react-bootstrap"
import Moment from "react-moment"
import { LinkContainer } from "react-router-bootstrap"
import Loader from "utils/loader"

const ProductTable = ({ prods }) => {
    return (
        <>
            {
                prods && prods.docs ?
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Created</th>
                                    <th>Model</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prods.docs.map((item) => (
                                        <tr key={item._id}>
                                            <td><Moment to={item.date}></Moment></td>
                                            <td>{item.model}</td>
                                            <td>{item.available}</td>
                                            <td className="action_btn remove_btn" onClick={() => alert('remove')}>
                                                Remove
                                            </td>
                                            <td className="action_btn edit_btn" onClick={() => alert('edit')}>
                                                Edit
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <Pagination>
                            {
                                prods.hasPrevPage ?
                                    <>
                                        <Pagination.Prev onClick={() => alert('previous')} />
                                        <Pagination.Item onClick={() => alert('go to prev')}>
                                            {prods.prevPage}
                                        </Pagination.Item>

                                    </>
                                    : null
                            }
                            <Pagination.Item active>{prods.page}</Pagination.Item>
                            {
                                prods.hasNextPage ?
                                    <>
                                        <Pagination.Item onClick={() => alert('go to next ')}>
                                            {prods.nextPage}
                                        </Pagination.Item>
                                        <Pagination.Next onClick={() => alert('next')} />

                                    </>
                                    : null
                            }
                        </Pagination>

                    </>
                    : <Loader />
            }
        </>
    )
}

export default ProductTable