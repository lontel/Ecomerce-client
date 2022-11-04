import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const PreventSignInRoute = (props) => {

    const users = useSelector(state => state.users)
    const navigation = useNavigate()

    useEffect(() => {
        users.auth && navigation('/dashboard')
    }, [users.auth, navigation])

    return (props.children)
}

export default PreventSignInRoute
