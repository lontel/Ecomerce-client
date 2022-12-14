import React, { useEffect } from "react"
import Featured from "./featured"
import SlimPromotion from "utils/promotions/slim.block"
import Loader from "utils/loader"

import { useDispatch, useSelector } from 'react-redux'

import { productsBySort } from '../../store/actions/product.actions'

import CardBlock from "utils/products/card.blocks"

const slimPromotion = {
    img: './images/featured/devices.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'in a selection of products',
    linkTitle: 'Show Now',
    linkTo: '/shop'
}

const Home = () => {
    const { bySold, byDate } = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productsBySort({
            limit: 4, sortBy: 'itemSold', order: 'desc', where: 'bySold'
        }))

        dispatch(productsBySort({
            limit: 4, sortBy: 'date', order: 'desc', where: 'byDate'
        }))
    }, [dispatch])

    return (
        <>
            <Featured />

            {
                bySold ?
                    <CardBlock items={bySold} title='Best selling products' />
                    :
                    <Loader />
            }
            <SlimPromotion items={slimPromotion} />

            {
                byDate ?
                    <CardBlock items={byDate} title='Latests products on the shop' />
                    :
                    <Loader />
            }
        </>
    )
}

export default Home