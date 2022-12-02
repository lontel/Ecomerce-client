import React, { useState } from "react"
import { EcomerceButton } from "utils/tools"
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import DoneOutlineIcon from "@material-ui/icons/DoneOutline"
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied"
import { useDispatch, useSelector } from "react-redux"



const ProdNfo = ({ details }) => {

    const showProdTags = () => (
        <div className="product_tags ">
            <div className="tag">
                <div><LocalShippingIcon /></div>
                <div className="tag_text">
                    {
                        details.shipping ?
                            <div>Free shipping</div>
                            :
                            <div>No free shipping</div>
                    }
                </div>
            </div>
            {
                details.available > 0 ?
                    <div className="tag">
                        <div><DoneOutlineIcon /></div>
                        <div className="tag_text">
                            <div><strong>{details.available}</strong> Product/s in store available</div>
                        </div>
                    </div>
                    :
                    <div className="tag">
                        <div><DoneOutlineIcon /></div>
                        <div className="tag_text">
                            <div>Sorry, product not available at the moment</div>
                        </div>

                    </div>
            }

        </div>
    )

    const showProdActions = (details) => (
        <div className="product_actions">
            <div className="price">{details.price} €</div>
            <div className="cart">
                <EcomerceButton
                    type='add_to_cart_link'
                    runAction={() => alert('added  to cart')}
                />
            </div>

        </div>
    )

    const showProdSpecs = (details) => (
        <div className="product_specifications">
            <h2>Category:</h2>
            <div>
                <div className="item">
                    < strong>{details.category}</strong>
                </div>
            </div>
        </div>
    )


    return (
        <div>
            <h1>{details.brand.name} {details.model}</h1>
            <p>{details.description}</p>
            {showProdTags(details)}
            {showProdActions(details)}
            {showProdSpecs(details)}
        </div>
    )
}

export default ProdNfo