import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import './sass/app.scss';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import PrivateRouter from './components/PrivateRouter';

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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
