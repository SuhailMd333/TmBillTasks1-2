import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/index.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  {/* <StrictMode> */}
    <Router>
    <App />
    </Router>
  {/* </StrictMode>, */}
  </Provider>
)
