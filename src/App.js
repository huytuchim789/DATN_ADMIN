import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Login from './pages/Login'
import './sass/app.scss'
import { Layout, Menu } from 'antd'
import Home from './pages/Home'
import PrivateRouter from './components/PrivateRouter'
import Cities from './pages/Cities'
import CityCreate from './pages/Cities/create'
import EditCity from './pages/Cities/edit'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home">
          <Route
            path=""
            element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            }
          />
          <Route path="cities">
            <Route
              path=""
              element={
                <PrivateRouter>
                  <Cities />
                </PrivateRouter>
              }
            ></Route>
            <Route
              path="create"
              element={
                <PrivateRouter>
                  <CityCreate />
                </PrivateRouter>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PrivateRouter>
                  <EditCity />
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
