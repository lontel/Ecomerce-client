import DashboardLayout from "hoc/dashboardLayout"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, userPurchaseSuccess } from "store/actions/user.actions"
import Loader from "utils/loader"
import CartDetails from "./cartDetails"
import { PayPalButton } from 'react-paypal-button-v2'
import { useNavigate } from "react-router-dom"


const UserCart = () => {

    const [isLoading, setIsLoading] = useState(false)
    const notifications = useSelector(state => state.notifications)
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const generateUnits = () => (
        [{
            description: 'Smart devices and accessories',
            amount: {
                currency_code: 'EUR',
                value: calculateTotal(),
                breakdown: {
                    item_total: {
                        currency_code: 'EUR',
                        value: calculateTotal()
                    }
                }
            },
            items: generateItems()
        }]
    )

    const generateItems = () => {
        let items = users.cart.map(item => (
            {
                unit_amount: {
                    currency_code: 'EUR',
                    value: item.price
                },
                quantity: 1,
                name: item.model
            }
        ))
        return items
    }

    useEffect(() => {
        if (notifications && notifications.success) {
            navigate('/dashboard')
        }
        if (notifications && notifications.error) {
            setIsLoading(false)
        }
    }, [notifications, navigate])

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
                        {
                            isLoading ?
                                <Loader />
                                :
                                <div className="pp_button">
                                    <PayPalButton
                                        options={{
                                            clientId: 'AfnCym4vnsTYWR-gNylEzOOVP3MnpG7g16kRxoSC48nop9y_IY0H6S_so9SE2hPJQmCsHET8iQ8aNcMX',
                                            currency: 'EUR',
                                            disableFunding: 'credit,card,sofort'
                                        }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: generateUnits()
                                            })
                                        }}
                                        onSuccess={(details, data) => {
                                            dispatch(userPurchaseSuccess(details.id))
                                            setIsLoading(true)
                                        }}
                                        onCancel={(data) => {
                                            setIsLoading(false)
                                        }}
                                    />
                                </div>
                        }
                    </>
                    : <div>Your cart is empthy</div>
            }
        </DashboardLayout>
    )
}

export default UserCart