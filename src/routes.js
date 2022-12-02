import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import MainLayout from 'hoc/mainLayout'

import { useDispatch, useSelector } from 'react-redux'
import { userIsAuth, userSignOut } from 'store/actions/user.actions'

import Header from './components/navigation/header'
import Footer from './components/navigation/footer'
import Home from './components/home'
import RegisterLogin from 'components/auth'
import Dashboard from './components/dashboard'
import AuthGuard from 'hoc/authGuard'
import UserInfo from 'components/dashboard/user/info'
import AdminProducts from 'components/dashboard/admin/products'
import AddProduct from 'components/dashboard/admin/products/addEdit/add'
import EditProduct from 'components/dashboard/admin/products/addEdit/edit'
import Shop from 'components/shop'
import ProductDetails from 'components/product'
import UserCart from 'components/dashboard/user/cart'


const App = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header
        users={users}
        signOutUser={signOutUser}
      />
      <MainLayout>
        <Routes>
          <Route path="/dashboard/user/user_cart" element={<AuthGuard />}>
            <Route path="" element={<UserCart />} />
          </Route>
          <Route path="/dashboard/admin/edit_product/:id" element={<AuthGuard />}>
            <Route path="" element={<EditProduct />} />
          </Route>
          <Route path="/dashboard/admin/add_products" element={<AuthGuard />}>
            <Route path="" element={<AddProduct />} />
          </Route>
          <Route path="/dashboard/admin/admin_products" element={<AuthGuard />}>
            <Route path="" element={<AdminProducts />} />
          </Route>
          <Route path="/dashboard/user/user_info" element={<AuthGuard />}>
            <Route path="" element={<UserInfo />} />
          </Route>
          <Route path="/dashboard" element={<AuthGuard value={{ isLoading }} />}>
            <Route path="" element={<Dashboard />} />
          </Route>

          <Route path="/product_details/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sign_in" element={<RegisterLogin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  )
}

export default App