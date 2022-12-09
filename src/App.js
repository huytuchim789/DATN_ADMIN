import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Login from './pages/Login'
import './sass/app.scss'
import { Layout, Menu } from 'antd'
import Home from './pages/Home'
import PrivateRouter from './components/PrivateRouter'
import Products from './pages/Products'

import Users from './pages/Users'
import EditUser from './pages/Users/edit'
import ProductEdit from './pages/Products/edit'
import ProductCreate from './pages/Products/create'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home">
          {/* <Route
            index
            element={
              <PrivateRouter>
                <Cities />
              </PrivateRouter>
            }
          /> */}
          <Route path="products">
            <Route
              path=""
              element={
                <PrivateRouter>
                  <Products />
                </PrivateRouter>
              }
            ></Route>
            <Route
              path="create"
              element={
                <PrivateRouter>
                  <ProductCreate />
                </PrivateRouter>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivateRouter>
                  <ProductEdit />
                </PrivateRouter>
              }
            />
          </Route>
          <Route path="users">
            <Route
              path=""
              element={
                <PrivateRouter>
                  <Users />
                </PrivateRouter>
              }
            ></Route>
            <Route
              path="edit/:id"
              element={
                <PrivateRouter>
                  <EditUser />
                </PrivateRouter>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
