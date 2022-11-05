import React from "react"
import DashboardLayout from "hoc/dashboardLayout"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const users = useSelector(state => state.users)
    return (
        <>
            <DashboardLayout title='Overview'>
                <div className="user_nfo_panel">
                    <div>
                        <span>{users.data.firstname}</span>
                        <span>{users.data.lastname}</span>
                        <span>{users.data.email}</span>
                    </div>
                    {
                        users.data.history ?
                            <div className="user_nfo_panel">
                                <h1>History of purchases</h1>
                                <div className="user_product_block_wrapper">
                                    usbdvlblksdvbjdksb
                                </div>

                            </div>
                            : null
                    }
                </div>
            </DashboardLayout>
        </>
    )
}

export default Dashboard