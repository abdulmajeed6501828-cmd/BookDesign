import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApiProvider } from './context/ApiContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
