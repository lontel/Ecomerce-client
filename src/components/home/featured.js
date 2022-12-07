import React from "react"
import Carrousel from "utils/carrousel"

const Featured = () => {

    const carrouselItems = [
        {
            img: './images/featured/several.jpg',
            lineOne: 'Apple',
            lineTwo: 'custom shop',
            linkTitle: 'Show Now',
            linkTo: '/shop'
        },
        {
            img: './images/featured/headphones.jpg',
            lineOne: 'B-stock',
            lineTwo: 'awsome discount',
            linkTitle: 'View offers',
            linkTo: '/shop'
        },
        {
            img: './images/featured/laptop.jpg',
            lineOne: 'B-stock',
            lineTwo: 'awsome discount',
            linkTitle: 'View offers',
            linkTo: '/shop'
        }
    ]


    return (
        <div className="featured_container">
            <Carrousel items={carrouselItems} />
        </div>
    )
}

export default Featured