import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { clearCurrentProduct } from "store/actions"
import { productsById } from "store/actions/product.actions"
import Loader from "utils/loader"
import { renderCardImage } from "utils/tools"
import ProdNfo from "./prodNfo"


const ProductDetails = (props) => {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(productsById(id))
    }, [dispatch, id])

    useEffect(() => {
        return () => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])

    return (
        <div className="page_container ">
            <div className="page_top">
                <div className="container ">
                    Product details
                </div>
            </div>
            <div className="container">
                {
                    products && products.byId ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div>
                                    <img
                                        alt="product_img"
                                        src={renderCardImage(products.byId.images)}
                                        onClick={() => alert('show carrousel')}
                                    >
                                    </img>
                                </div>
                            </div>
                            <div className="right">
                                <ProdNfo

                                    details={products.byId} />
                            </div>
                        </div>

                        : <Loader />
                }
            </div>
        </div>
    )
}

export default ProductDetails