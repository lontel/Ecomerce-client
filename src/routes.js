import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import MainLayout from 'hoc/mainLayout'

import Header from './components/navigation/header'
import Footer from './components/navigation/footer'
import Home from './components/home'
import RegisterLogin from 'components/auth'

import { useDispatch, useSelector } from 'react-redux'
import { userIsAuth, userSignOut } from 'store/actions/user.actions'

const App = (props) => {
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
          <Route path="/sign_in" element={<RegisterLogin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  )
}

export default App