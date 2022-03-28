import * as React from 'react'
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom'

const Home = () => <h1>Home (Public)</h1>
const Pricing = () => <h1>Pricing (Public)</h1>

const Dashboard = () => <h1>Dashboard (Private)</h1>
const Settings = () => <h1>Settings (Private)</h1>

const Login = () => <h1>TODO</h1>

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
