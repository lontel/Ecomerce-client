import React, { useEffect, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import GridOffIcon from '@mui/icons-material/GridOff'
import GridOnIcon from '@mui/icons-material/GridOn'

import { productsByPaginate } from "store/actions/product.actions"
import { getAllBrands } from "store/actions/brands.actions"
import CardBlock from "utils/products/card.blocks"
import PaginateNav from "utils/paginateNav"
import SearchBar from "./searchBar"
import CollapseCheckbox from "./collapseCheckbox"
import RangeSelect from "./rangeSelect"

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

    const handleFilters = (filters) => {
        setSearchValues({ brand: filters, page: 1 })
    }

    const handleRange = (values) => {
        setSearchValues({ min: values[0], max: values[1], page: 1 })
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
                            <CollapseCheckbox
                                initState={true}
                                title='Brands'
                                list={brands.all}
                                handleFilters={(filters) => handleFilters(filters)}
                            />
                            <RangeSelect
                                title='Price range'
                                handleRange={(values) => handleRange(values)}
                            />
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