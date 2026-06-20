import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Logo size="lg" />
          <h1>✈️ Bem-vindo de volta</h1>
          <p>Entre na sua conta para continuar sua jornada</p>
        </div>
        <div className="auth-form-card">
          <LoginForm />
        </div>
        <div className="auth-footer-text">
          Ao entrar, você concorda com nossos{' '}
          <a href="#termos">Termos de Uso</a> e{' '}
          <a href="#privacidade">Política de Privacidade</a>
        </div>
      </div>
    </div>
  )
}

export default Login
