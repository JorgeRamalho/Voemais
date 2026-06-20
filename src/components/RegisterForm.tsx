import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { RegisterData, FormErrors } from '../types'

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const planos = [
  { id: 'basico', nome: 'Básico', descricao: 'Voos nacionais econômicos' },
  { id: 'plus', nome: 'Plus', descricao: 'Voos nacionais + bagagem' },
  { id: 'premium', nome: 'Premium', descricao: 'Voos internacionais + prioridade' },
]

const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const generos = ['Masculino', 'Feminino', 'Não binário', 'Prefiro não informar']

function RegisterForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<RegisterData>({
    nome: '', sobrenome: '', email: '', telefone: '',
    cpf: '', dataNascimento: '', genero: '', senha: '',
    confirmarSenha: '', cep: '', logradouro: '', numero: '',
    complemento: '', bairro: '', cidade: '', estado: '',
    tipoSanguineo: '', emergenciaContato: '', emergenciaTelefone: '',
    plano: 'basico', termos: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const maskCPF = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  const maskTelefone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
    }
    return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
  }

  const maskCEP = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    return digits.replace(/(\d{5})(\d)/, '$1-$2')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    let formattedValue: string = value
    if (name === 'cpf') formattedValue = maskCPF(value)
    else if (name === 'telefone' || name === 'emergenciaTelefone') formattedValue = maskTelefone(value)
    else if (name === 'cep') formattedValue = maskCEP(value)

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue,
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório'
    if (!formData.sobrenome) newErrors.sobrenome = 'Sobrenome é obrigatório'
    if (!formData.email) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório'
    else if (formData.telefone.replace(/\D/g, '').length < 10) newErrors.telefone = 'Telefone inválido'
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório'
    else if (formData.cpf.replace(/\D/g, '').length !== 11) newErrors.cpf = 'CPF inválido'
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória'
    if (!formData.genero) newErrors.genero = 'Selecione uma opção'
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória'
    else if (formData.senha.length < 6) newErrors.senha = 'Mínimo 6 caracteres'
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não conferem'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.cep) newErrors.cep = 'CEP é obrigatório'
    if (!formData.logradouro) newErrors.logradouro = 'Logradouro é obrigatório'
    if (!formData.numero) newErrors.numero = 'Número é obrigatório'
    if (!formData.bairro) newErrors.bairro = 'Bairro é obrigatório'
    if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória'
    if (!formData.estado) newErrors.estado = 'Estado é obrigatório'
    if (!formData.tipoSanguineo) newErrors.tipoSanguineo = 'Campo obrigatório'
    if (!formData.emergenciaContato) newErrors.emergenciaContato = 'Nome do contato é obrigatório'
    if (!formData.emergenciaTelefone) newErrors.emergenciaTelefone = 'Telefone de emergência é obrigatório'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleBack = () => setStep(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { handleNext(); return }
    if (!validateStep2()) return
    if (!formData.termos) { setErrors((prev) => ({ ...prev, termos: 'Aceite os termos para continuar' })); return }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    navigate('/dashboard')
  }

  const getPasswordStrength = (senha: string) => {
    if (!senha) return { label: '', class: '', width: '0%' }
    let score = 0
    if (senha.length >= 6) score++
    if (senha.length >= 10) score++
    if (/[A-Z]/.test(senha)) score++
    if (/[0-9]/.test(senha)) score++
    if (/[^A-Za-z0-9]/.test(senha)) score++
    const levels = [
      { label: 'Fraca', class: 'weak', width: '25%' },
      { label: 'Média', class: 'medium', width: '50%' },
      { label: 'Forte', class: 'strong', width: '75%' },
      { label: 'Muito forte', class: 'very-strong', width: '100%' },
    ]
    return levels[Math.min(score - 1, 3)] || { label: '', class: '', width: '0%' }
  }

  const pwStrength = getPasswordStrength(formData.senha)

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-6" style={{ justifyContent: 'center' }}>
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              style={{
                width: 32, height: 32, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.875rem',
                background: step >= s ? 'var(--color-secondary)' : 'var(--color-border)',
                color: step >= s ? 'white' : 'var(--color-text-muted)',
                transition: 'all 0.3s ease',
              }}
            >
              {s}
            </div>
            <span style={{
              fontSize: '0.8rem', fontWeight: 500,
              color: step >= s ? 'var(--color-text)' : 'var(--color-text-muted)',
            }}>
              {s === 1 ? 'Dados Pessoais' : 'Endereço & Plano'}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Nome *</label>
              <input type="text" id="nome" name="nome" className={`form-input ${errors.nome ? 'error' : ''}`}
                placeholder="Seu nome" value={formData.nome} onChange={handleChange} autoFocus />
              {errors.nome && <span className="form-error">{errors.nome}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sobrenome">Sobrenome *</label>
              <input type="text" id="sobrenome" name="sobrenome" className={`form-input ${errors.sobrenome ? 'error' : ''}`}
                placeholder="Seu sobrenome" value={formData.sobrenome} onChange={handleChange} />
              {errors.sobrenome && <span className="form-error">{errors.sobrenome}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail *</label>
            <input type="email" id="email" name="email" className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="seu@email.com" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="telefone">Telefone *</label>
              <input type="tel" id="telefone" name="telefone" className={`form-input ${errors.telefone ? 'error' : ''}`}
                placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleChange} />
              {errors.telefone && <span className="form-error">{errors.telefone}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cpf">CPF *</label>
              <input type="text" id="cpf" name="cpf" className={`form-input ${errors.cpf ? 'error' : ''}`}
                placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} />
              {errors.cpf && <span className="form-error">{errors.cpf}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="dataNascimento">Data de Nascimento *</label>
              <input type="date" id="dataNascimento" name="dataNascimento"
                className={`form-input ${errors.dataNascimento ? 'error' : ''}`}
                value={formData.dataNascimento} onChange={handleChange} />
              {errors.dataNascimento && <span className="form-error">{errors.dataNascimento}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="genero">Gênero *</label>
              <select id="genero" name="genero" className={`form-select ${errors.genero ? 'error' : ''}`}
                value={formData.genero} onChange={handleChange}>
                <option value="">Selecione...</option>
                {generos.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.genero && <span className="form-error">{errors.genero}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="senha">Senha *</label>
              <input type="password" id="senha" name="senha"
                className={`form-input ${errors.senha ? 'error' : ''}`}
                placeholder="Mínimo 6 caracteres" value={formData.senha} onChange={handleChange} />
              {formData.senha && (
                <div className="password-strength">
                  <div className="password-strength-bar">
                    <div className={`password-strength-bar-fill ${pwStrength.class}`} style={{ width: pwStrength.width }} />
                  </div>
                  <span className="password-strength-text">
                    {pwStrength.label}
                  </span>
                </div>
              )}
              {errors.senha && <span className="form-error">{errors.senha}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmarSenha">Confirmar Senha *</label>
              <input type="password" id="confirmarSenha" name="confirmarSenha"
                className={`form-input ${errors.confirmarSenha ? 'error' : ''}`}
                placeholder="Repita a senha" value={formData.confirmarSenha} onChange={handleChange} />
              {errors.confirmarSenha && <span className="form-error">{errors.confirmarSenha}</span>}
            </div>
          </div>

          <button type="button" className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
            Próximo —
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h4 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
            Endereço
          </h4>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="cep">CEP *</label>
              <input type="text" id="cep" name="cep" className={`form-input ${errors.cep ? 'error' : ''}`}
                placeholder="00000-000" value={formData.cep} onChange={handleChange} />
              {errors.cep && <span className="form-error">{errors.cep}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="numero">Número *</label>
              <input type="text" id="numero" name="numero" className={`form-input ${errors.numero ? 'error' : ''}`}
                placeholder="Nº" value={formData.numero} onChange={handleChange} />
              {errors.numero && <span className="form-error">{errors.numero}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="logradouro">Logradouro *</label>
            <input type="text" id="logradouro" name="logradouro" className={`form-input ${errors.logradouro ? 'error' : ''}`}
              placeholder="Rua, Avenida..." value={formData.logradouro} onChange={handleChange} />
            {errors.logradouro && <span className="form-error">{errors.logradouro}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="complemento">Complemento</label>
            <input type="text" id="complemento" name="complemento" className="form-input"
              placeholder="Apto, Bloco..." value={formData.complemento} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="bairro">Bairro *</label>
              <input type="text" id="bairro" name="bairro" className={`form-input ${errors.bairro ? 'error' : ''}`}
                placeholder="Seu bairro" value={formData.bairro} onChange={handleChange} />
              {errors.bairro && <span className="form-error">{errors.bairro}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cidade">Cidade *</label>
              <input type="text" id="cidade" name="cidade" className={`form-input ${errors.cidade ? 'error' : ''}`}
                placeholder="Sua cidade" value={formData.cidade} onChange={handleChange} />
              {errors.cidade && <span className="form-error">{errors.cidade}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="estado">Estado *</label>
            <select id="estado" name="estado" className={`form-select ${errors.estado ? 'error' : ''}`}
              value={formData.estado} onChange={handleChange}>
              <option value="">Selecione...</option>
              {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
            </select>
            {errors.estado && <span className="form-error">{errors.estado}</span>}
          </div>

          <div className="form-divider">Informações de Emergência</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="tipoSanguineo">Tipo Sanguíneo *</label>
              <select id="tipoSanguineo" name="tipoSanguineo" className={`form-select ${errors.tipoSanguineo ? 'error' : ''}`}
                value={formData.tipoSanguineo} onChange={handleChange}>
                <option value="">Selecione...</option>
                {tiposSanguineos.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.tipoSanguineo && <span className="form-error">{errors.tipoSanguineo}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="emergenciaContato">Contato de Emergência *</label>
              <input type="text" id="emergenciaContato" name="emergenciaContato"
                className={`form-input ${errors.emergenciaContato ? 'error' : ''}`}
                placeholder="Nome completo" value={formData.emergenciaContato} onChange={handleChange} />
              {errors.emergenciaContato && <span className="form-error">{errors.emergenciaContato}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="emergenciaTelefone">Telefone de Emergência *</label>
            <input type="tel" id="emergenciaTelefone" name="emergenciaTelefone"
              className={`form-input ${errors.emergenciaTelefone ? 'error' : ''}`}
              placeholder="(11) 99999-9999" value={formData.emergenciaTelefone} onChange={handleChange} />
            {errors.emergenciaTelefone && <span className="form-error">{errors.emergenciaTelefone}</span>}
          </div>

          <div className="form-divider">Plano</div>

          <div className="form-group">
            <label className="form-label" htmlFor="plano">Selecione seu Plano *</label>
            <select id="plano" name="plano" className="form-select" value={formData.plano} onChange={handleChange}>
              {planos.map((p) => <option key={p.id} value={p.id}>{p.nome} — {p.descricao}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-checkbox">
              <input type="checkbox" name="termos" checked={formData.termos} onChange={handleChange} />
              Aceito os <a href="#termos" style={{ margin: '0 4px' }}>termos de uso</a> e <a href="#privacidade" style={{ margin: '0 4px' }}>política de privacidade</a>
            </label>
            {errors.termos && <span className="form-error">{errors.termos}</span>}
          </div>

          <div className="flex gap-4">
            <button type="button" className="btn btn-secondary btn-full btn-lg" onClick={handleBack}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Cadastrar'}
            </button>
          </div>
        </>
      )}

      <div className="form-footer" style={{ marginTop: 'var(--space-6)' }}>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </div>
    </form>
  )
}

export default RegisterForm
