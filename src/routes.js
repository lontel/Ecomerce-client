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
          <Route path="/dashboard" element={<AuthGuard value={{ isLoading }} />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/sign_in" element={<RegisterLogin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  )
}

export default App