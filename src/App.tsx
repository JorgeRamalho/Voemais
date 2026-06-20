import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'

function App() {
  return (
    <div className="page-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/reservas"
          element={
            <>
              <Header />
              <Booking />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
