import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo-footer" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#4A90D9" />
                <path d="M32 15L26 30L20 28L18 32L26 34L26 38L30 36L32 45L34 36L38 38L38 34L46 32L44 28L38 30Z" fill="white" opacity="0.95" />
                <circle cx="32" cy="20" r="3" fill="#F5A623" />
              </svg>
              <span className="footer-logo-text">
                Voe<span className="footer-logo-accent">Mais</span>
              </span>
            </div>
            <p>
              Sua jornada começa aqui. Conectamos você ao céu com a melhor experiência
              em aviação. Do cadastro à decolagem, estamos com você em cada etapa.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">F</a>
              <a href="#" aria-label="Instagram">I</a>
              <a href="#" aria-label="LinkedIn">L</a>
              <a href="#" aria-label="YouTube">Y</a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Navegação</h4>
            <Link to="/">Início</Link>
            <Link to="/#recursos">Recursos</Link>
            <Link to="/#planos">Planos</Link>
            <Link to="/#contato">Contato</Link>
          </div>

          <div className="footer-column">
            <h4>Conta</h4>
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastrar</Link>
            <Link to="/dashboard">Painel</Link>
            <Link to="/#suporte">Suporte</Link>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/#privacidade">Privacidade</Link>
            <Link to="/#termos">Termos de Uso</Link>
            <Link to="/#cookies">Cookies</Link>
            <Link to="/#lgpd">LGPD</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Voe Mais. Todos os direitos reservados.</p>
          <p>Feito com ❤️ para quem ama voar</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
