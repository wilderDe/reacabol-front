import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecabolApp } from './RecabolApp.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store } >
    <HashRouter>
      <RecabolApp />
    </HashRouter>
  </Provider>,
)
