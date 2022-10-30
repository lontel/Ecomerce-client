import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes.js'

import 'resources/styles/styles.css'

import { Provider } from 'react-redux'
import ReduxStore from 'store/index'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
  </React.StrictMode>
)