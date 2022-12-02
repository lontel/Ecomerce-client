import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "store/actions/user.actions"
import Loader from "utils/loader"
import CartDetails from "./cartDetails"



const UserCart = () => {

    const [isLoading, setIsLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    const removeItem = (index) => {
        dispatch(removeFromCart(index))
    }

    const calculateTotal = () => {
        let total = 0
        users.cart.forEach(item => {
            total += item.price
        })
        return total
    }

    return (
        <DashboardLayout title='Your cart'>
            {
                users.cart && users.cart.length > 0 ?
                    <>
                        <CartDetails
                            products={users.cart}
                            removeItem={(index) => removeItem(index)}
                        />
                        <div className="user_cart_sum">
                            <div>
                                Total amount: ${calculateTotal()}
                            </div>
                        </div>
                    </>
                    : <div>Your cart is empthy</div>
            }
        </DashboardLayout>
    )
}

export default UserCart