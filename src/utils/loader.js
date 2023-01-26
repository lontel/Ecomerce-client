import CircularProgress from '@mui/material/CircularProgress'
import React from "react"

const Loader = ({ full }) => {
    return (
        <div className={`root_loader ${full ? 'full' : ''}`}>
            <CircularProgress />
        </div>
    )
}

export default Loader