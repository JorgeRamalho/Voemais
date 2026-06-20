import Logo from '../components/Logo'
import RegisterForm from '../components/RegisterForm'

function Register() {
  return (
    <div className="auth-page" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="auth-container" style={{ maxWidth: '560px' }}>
        <div className="auth-header">
          <Logo size="lg" />
          <h1>🚀 Criar sua Conta</h1>
          <p>Preencha os dados para iniciar sua jornada de voo</p>
        </div>
        <div className="auth-form-card">
          <RegisterForm />
        </div>
        <div className="auth-footer-text" style={{ marginTop: '1.5rem' }}>
          Ao se cadastrar, você concorda com nossos{' '}
          <a href="#termos">Termos de Uso</a> e{' '}
          <a href="#privacidade">Política de Privacidade</a>
        </div>
      </div>
    </div>
  )
}

export default Register
