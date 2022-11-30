import React, { useEffect, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import GridOffIcon from '@material-ui/icons/GridOff'
import GridOnIcon from '@material-ui/icons/GridOn'

import { productsByPaginate } from "store/actions/product.actions"
import { getAllBrands } from "store/actions/brands.actions"
import CardBlock from "utils/products/card.blocks"
import PaginateNav from "utils/paginateNav"
import SearchBar from "./searchBar"


const defaultValues = {
    keywords: '',
    brand: [],
    min: 0,
    max: 20000,
    page: 1
}

const Shop = () => {

    const [grid, setGrid] = useState(false)
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    )

    const brands = useSelector(state => state.brands)
    const { byPaginate } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const handleGrid = () => setGrid(!grid)

    const goToPage = (page) => {
        setSearchValues({ page: page })
    }

    const handleResetSearch = () => {
        setSearchValues({ keywords: '', page: 1 })
    }

    const handleKeyords = (values) => {
        setSearchValues({ keywords: values, page: 1 })
    }

    useEffect(() => {
        dispatch(getAllBrands())
    }, [dispatch])

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])

    return (
        <>
            <div className="page_container">
                <div className="page_top">
                    <div className="container">
                        <SearchBar
                            handleKeywords={(values) => handleKeyords(values)}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="shop_wrapper ">
                        <div className="left">
                            collapse brands
                            range select
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div className={`grid_btn ${grid ? '' : 'active'}`}
                                        onClick={() => handleGrid()}
                                    >
                                        <GridOnIcon />
                                    </div>
                                    <div className={`grid_btn ${!grid ? '' : 'active'}`}
                                        onClick={() => handleGrid()}
                                    >
                                        <GridOffIcon />
                                    </div>
                                </div>
                                <div>
                                    {
                                        byPaginate && byPaginate.docs ?
                                            <>
                                                <CardBlock
                                                    grid={grid}
                                                    items={byPaginate.docs}
                                                    shop={true}
                                                />
                                                <PaginateNav
                                                    prods={byPaginate}
                                                    prev={(page) => goToPage(page)}
                                                    next={(page) => goToPage(page)}
                                                    resetSearch={() => handleResetSearch()}
                                                />
                                            </>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop