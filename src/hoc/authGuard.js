import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "utils/loader"


function AuthGuard({ isLoading }) {

    const users = useSelector(state => state.users)

    if (isLoading) {
        return <Loader />
    }

    if (!users.auth) {
        return <Navigate to="/sign_in" />
    }
    return <Outlet />
}

export default AuthGuard



















// import React, { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import Loader from "utils/loader"


// export default function authGuard(ComposedComponent) {
//     const AutenthicationCheck = (props) => {
//         const [isAuth, setIsAuth] = useState(false)
//         const users = useSelector(state => state.users)

//         useEffect(() => {
//             if (!users.auth) {
//                 props.history.push('/')
//             } else {
//                 setIsAuth(true)
//             }
//         }, [props, users])

//         if (!isAuth) {
//             return (
//                 <Loader full={true} />
//             )
//         } else {
//             return (
//                 <ComposedComponent users={users} {...props} />
//             )
//         }

//     }

//     return AutenthicationCheck
// }

