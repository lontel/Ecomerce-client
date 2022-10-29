import CircularProgress from "@material-ui/core/CircularProgress"
import React from "react"

const Loader = ({ full }) => {
    return (
        <div className={`root_loader ${full ? 'full' : ''}`}>
            <CircularProgress />
        </div>
    )
}

export default Loader