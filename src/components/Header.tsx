import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="header-inner">
        <Logo showSlogan={false} size="sm" />

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''}>🏠 Início</Link>
          <Link to="/reservas" className={isActive('/reservas') ? 'active' : ''}>✈️ Reservas</Link>
          <Link to="/#recursos" className={isActive('/recursos') ? 'active' : ''}>Recursos</Link>
          <Link to="/#planos" className={isActive('/planos') ? 'active' : ''}>Planos</Link>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="btn btn-outline btn-sm">Entrar</Link>
          <Link to="/cadastro" className="btn btn-primary btn-sm btn-primary-mobile">Cadastrar</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
