import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { LoginData, FormErrors } from '../types'

function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    senha: '',
    remember: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          autoFocus
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          className={`form-input ${errors.senha ? 'error' : ''}`}
          placeholder="Sua senha"
          value={formData.senha}
          onChange={handleChange}
        />
        {errors.senha && <span className="form-error">{errors.senha}</span>}
      </div>

      <div className="form-group flex items-center justify-between">
        <label className="form-checkbox">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
          />
          Lembrar-me
        </label>
        <a href="#recuperar" className="text-sm" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>
          Esqueceu a senha?
        </a>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-full btn-lg"
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : 'Entrar'}
      </button>

      <div className="form-footer">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </div>
    </form>
  )
}

export default LoginForm
