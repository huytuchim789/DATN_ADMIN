import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import axios from 'axios'
import AuthProvider from './context/AuthContext'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/admin'
if (JSON.parse(localStorage.getItem('auth'))) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${
      JSON.parse(localStorage.getItem('auth')).access_token
    }`,
  }
}
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
