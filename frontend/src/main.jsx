import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextProvider } from './contexts/AuthContext.jsx'
import { Web3Provider } from './Web3Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Web3Provider >
          <App />
      </Web3Provider  >
  </React.StrictMode>,
)
