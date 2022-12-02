import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { clearCurrentProduct } from "store/actions"
import { productsById } from "store/actions/product.actions"
import Loader from "utils/loader"
import { renderCardImage } from "utils/tools"
import ProdNfo from "./prodNfo"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ProductDetails = (props) => {

    const [modal, setModal] = useState(false)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    const { id } = useParams()

    const sliderSetting = {
        dot: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slideToScroll: 1,
    }
    const handleClose = () => setModal(false)

    const handleCarrousel = () => {
        if (products.byId.images.length > 0) {
            setModal(true)
        }
    }

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
                                        onClick={() => handleCarrousel()}
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
            <Modal show={modal} onHide={handleClose} dialogClassName='modal-90w'>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Slider {...sliderSetting}>
                        {
                            products.byId && products.byId.images ?
                                products.byId.images.map((item) => (
                                    <div key={item} style={{ margin: "0 auto" }}>
                                        <div className="img-block"
                                            style={{
                                                background: `url(${item}) no-repeat`
                                            }}
                                        >
                                        </div>

                                    </div>
                                ))
                                : null
                        }
                    </Slider>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProductDetails