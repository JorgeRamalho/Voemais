import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Carousel from '../components/Carousel'


type SearchMode = 'flights' | 'hotels'

const features = [
  {
    icon: '🛩️',
    bg: 'blue',
    title: 'Cadastro Simplificado',
    desc: 'Matrícula rápida e intuitiva. Preencha seus dados em poucos minutos e comece a voar.',
  },
  {
    icon: '🛂',
    bg: 'teal',
    title: 'Segurança Total',
    desc: 'Seus dados protegidos com criptografia de ponta a ponta. Conformidade com a LGPD.',
  },
  {
    icon: '📈',
    bg: 'green',
    title: 'Painel Completo',
    desc: 'Acompanhe seus voos, histórico, milhas e muito mais em um só lugar.',
  },
  {
    icon: '💎',
    bg: 'gold',
    title: 'Planos Flexíveis',
    desc: 'Do básico ao premium. Escolha o plano que se adapta ao seu estilo de voar.',
  },
  {
    icon: '🗺️',
    bg: 'purple',
    title: 'Destinos Globais',
    desc: 'Conecte-se com os principais aeroportos nacionais e internacionais.',
  },
  {
    icon: '🎧',
    bg: 'blue',
    title: 'Suporte 24h',
    desc: 'Equipe dedicada pronta para ajudar você em qualquer momento da jornada.',
  },
]

function Home() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<SearchMode>('flights')
  const [searching, setSearching] = useState(false)

  const [flightSearch, setFlightSearch] = useState({
    origem: '', destino: '', dataIda: '', dataVolta: '', passageiros: '1', classe: 'economica',
  })

  const [hotelSearch, setHotelSearch] = useState({
    destino: '', checkin: '', checkout: '', hospedes: '2',
  })

  const [cadastro, setCadastro] = useState({
    nome: '', email: '', telefone: '', dataNascimento: '', cidade: '',
  })
  const [cadastroEnviado, setCadastroEnviado] = useState(false)

  const handleFlightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFlightSearch(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleHotelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHotelSearch(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCadastroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCadastro(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 600))
    setCadastroEnviado(true)
    setTimeout(() => navigate('/cadastro'), 1500)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)
    await new Promise(r => setTimeout(r, 800))
    setSearching(false)
    navigate('/reservas')
  }

  return (
    <main className="main-content">
      {/* Carrossel */}
      <Carousel />

      {/* Search Box — abaixo do carrossel */}
      <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div className="search-box">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setMode('flights')}
              className={`search-tab ${mode === 'flights' ? 'active' : ''}`}
              style={{
                flex: 'none', padding: '0.5rem 1.25rem', border: 'none', borderRadius: '8px',
                fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                background: mode === 'flights' ? 'var(--color-primary)' : 'var(--color-bg)',
                color: mode === 'flights' ? 'white' : 'var(--color-text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              ✈️ Voos
            </button>
            <button
              onClick={() => setMode('hotels')}
              className={`search-tab ${mode === 'hotels' ? 'active' : ''}`}
              style={{
                flex: 'none', padding: '0.5rem 1.25rem', border: 'none', borderRadius: '8px',
                fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                background: mode === 'hotels' ? 'var(--color-primary)' : 'var(--color-bg)',
                color: mode === 'hotels' ? 'white' : 'var(--color-text-muted)',
                transition: 'all 0.2s ease',
              }}
            >
              🏨 Hotéis
            </button>
          </div>

          {mode === 'flights' ? (
            <form onSubmit={handleSearch}>
              <div className="search-box-grid">
                <div className="form-group">
                  <label className="form-label">Origem</label>
                  <input type="text" className="form-input" name="origem" value={flightSearch.origem}
                    onChange={handleFlightChange} placeholder="Cidade ou aeroporto" />
                </div>
                <div className="form-group">
                  <label className="form-label">Destino</label>
                  <input type="text" className="form-input" name="destino" value={flightSearch.destino}
                    onChange={handleFlightChange} placeholder="Cidade ou aeroporto" />
                </div>
                <div className="form-group">
                  <label className="form-label">Ida</label>
                  <input type="date" className="form-input" name="dataIda" value={flightSearch.dataIda}
                    onChange={handleFlightChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Volta</label>
                  <input type="date" className="form-input" name="dataVolta" value={flightSearch.dataVolta}
                    onChange={handleFlightChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Passageiros</label>
                  <select className="form-select" name="passageiros" value={flightSearch.passageiros}
                    onChange={handleFlightChange}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'passageiro' : 'passageiros'}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Classe</label>
                  <select className="form-select" name="classe" value={flightSearch.classe}
                    onChange={handleFlightChange}>
                    <option value="economica">Econômica</option>
                    <option value="executiva">Executiva</option>
                    <option value="primeira">Primeira Classe</option>
                  </select>
                </div>
              </div>
              <div className="search-box-actions">
                <button type="submit" className="btn btn-primary" disabled={searching}>
                  {searching ? <><span className="spinner spinner-dark" /> Buscando...</> : '🔍 Buscar Voos'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSearch}>
              <div className="search-box-grid">
                <div className="form-group">
                  <label className="form-label">Destino</label>
                  <input type="text" className="form-input" name="destino" value={hotelSearch.destino}
                    onChange={handleHotelChange} placeholder="Cidade ou hotel" />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-in</label>
                  <input type="date" className="form-input" name="checkin" value={hotelSearch.checkin}
                    onChange={handleHotelChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out</label>
                  <input type="date" className="form-input" name="checkout" value={hotelSearch.checkout}
                    onChange={handleHotelChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Hóspedes</label>
                  <select className="form-select" name="hospedes" value={hotelSearch.hospedes}
                    onChange={handleHotelChange}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'hóspede' : 'hóspedes'}</option>)}
                  </select>
                </div>
              </div>
              <div className="search-box-actions">
                <button type="submit" className="btn btn-primary" disabled={searching}>
                  {searching ? <><span className="spinner spinner-dark" /> Buscando...</> : '🔍 Buscar Hotéis'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" style={{ padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div className="hero-content" style={{ maxWidth: '100%', textAlign: 'center', margin: '0 auto' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} className="animate-fade-in-up">🛩️</div>
            <h1 className="animate-fade-in-up" style={{ fontSize: 'var(--text-4xl)' }}>
              Voe <span className="highlight">Mais</span>
              Alto, Voe <span className="highlight">Mais</span> Longe 🌅
            </h1>
            <p className="animate-fade-in-up stagger-2" style={{ margin: '0 auto 1.5rem', maxWidth: '550px' }}>
              Sua jornada começa aqui. Cadastre-se em segundos e tenha acesso ao
              melhor portal de aviação com recursos exclusivos para você.
            </p>
            <div className="hero-actions animate-fade-in-up stagger-3" style={{ justifyContent: 'center' }}>
              <Link to="/cadastro" className="btn btn-accent btn-lg">
                Cadastre-se Grátis
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                Já tenho conta
              </Link>
            </div>
            <div className="hero-stats animate-fade-in-up stagger-4" style={{ justifyContent: 'center' }}>
              <div className="hero-stat">
                <div className="hero-stat-number">50K+</div>
                <div className="hero-stat-label">Usuários</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">15K+</div>
                <div className="hero-stat-label">Voos Realizados</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">98%</div>
                <div className="hero-stat-label">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-decoration" />
      </section>

      {/* Brand Bar */}
      <section style={{ padding: '3rem 0 2rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <Logo size="lg" />
        </div>
      </section>

      {/* Features */}
      <section className="features" id="recursos">
        <div className="container">
          <div className="features-header">
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✈️</span>
            <h2 className="text-gradient">Tudo que você precisa</h2>
            <p>Do cadastro ao embarque, oferecemos a melhor experiência para sua jornada.</p>
          </div>
          <div className="features-grid">
            {features.map((feat, i) => (
              <div key={i} className="card card-highlight animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`card-icon ${feat.bg}`}>{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 0', background: 'var(--color-primary)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', fontSize: '12rem', opacity: '0.06', pointerEvents: 'none' }}>✈️</div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', fontSize: '8rem', opacity: '0.04', pointerEvents: 'none', transform: 'rotate(-30deg)' }}>🛩️</div>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem', position: 'relative' }}>
            Vamos embarcar? 🚀
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.125rem' }}>
            Cadastre-se agora e descubra um novo jeito de voar. Sua jornada começa aqui.
          </p>
          <Link to="/cadastro" className="btn btn-accent btn-lg">
            Criar Conta Gratuita
          </Link>
        </div>
      </section>

      {/* Cadastro Rápido */}
      <section className="quick-register">
        <div className="container">
          <div className="quick-register-inner">
            <div className="quick-register-info">
              <h2>📝 Cadastre-se grátis</h2>
              <p>Preencha seus dados básicos e comece a aproveitar todos os benefícios do Voe Mais. Em menos de 2 minutos você já pode reservar voos e hotéis.</p>
              <ul className="quick-register-benefits">
                <li>✈️ Reservas de voos nacionais e internacionais</li>
                <li>🏨 Hotéis com preços exclusivos</li>
                <li>🌟 Acúmulo de milhas a cada viagem</li>
                <li>🎧 Suporte prioritário 24 horas</li>
              </ul>
            </div>

            <div className="quick-register-form">
              {cadastroEnviado ? (
                <div className="alert alert-success" style={{ padding: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>
                  ✅ <strong>Cadastro recebido!</strong><br />
                  <span style={{ fontSize: '0.9rem' }}>Redirecionando para o formulário completo...</span>
                </div>
              ) : (
                <form onSubmit={handleCadastroSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nome completo *</label>
                      <input type="text" name="nome" className="form-input" required
                        placeholder="Seu nome" value={cadastro.nome} onChange={handleCadastroChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail *</label>
                      <input type="email" name="email" className="form-input" required
                        placeholder="seu@email.com" value={cadastro.email} onChange={handleCadastroChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Telefone</label>
                      <input type="tel" name="telefone" className="form-input"
                        placeholder="(11) 99999-9999" value={cadastro.telefone} onChange={handleCadastroChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Data de Nascimento</label>
                      <input type="date" name="dataNascimento" className="form-input"
                        value={cadastro.dataNascimento} onChange={handleCadastroChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cidade</label>
                    <input type="text" name="cidade" className="form-input"
                      placeholder="Sua cidade" value={cadastro.cidade} onChange={handleCadastroChange} />
                  </div>
                  <button type="submit" className="btn btn-accent btn-full btn-lg">
                    🚀 Quero me cadastrar
                  </button>
                  <p className="form-footer" style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}>
                    Ao cadastrar, você concorda com nossos <a href="#termos">Termos</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
