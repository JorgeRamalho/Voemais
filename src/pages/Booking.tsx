import { useState } from 'react'
import { Link } from 'react-router-dom'

type SearchMode = 'flights' | 'hotels'

interface FlightResult {
  id: string
  airline: string
  icon: string
  departure: string
  departureTime: string
  arrival: string
  arrivalTime: string
  duration: string
  stops: string
  price: number
}

interface HotelResult {
  id: string
  name: string
  icon: string
  location: string
  rating: number
  stars: number
  amenities: string[]
  pricePerNight: number
}

const mockFlights: FlightResult[] = [
  { id: 'FL001', airline: 'VoeMais Air', icon: '✈️', departure: 'GRU', departureTime: '06:30', arrival: 'JFK', arrivalTime: '14:20', duration: '9h50', stops: 'Direto', price: 2490 },
  { id: 'FL002', airline: 'SkyWay', icon: '🛩️', departure: 'GRU', departureTime: '08:45', arrival: 'JFK', arrivalTime: '17:10', duration: '10h25', stops: '1 conexão', price: 1890 },
  { id: 'FL003', airline: 'VoeMais Air', icon: '✈️', departure: 'GRU', departureTime: '14:00', arrival: 'MIA', arrivalTime: '21:30', duration: '8h30', stops: 'Direto', price: 2150 },
  { id: 'FL004', airline: 'Global Lines', icon: '🌍', departure: 'GRU', departureTime: '22:15', arrival: 'LIS', arrivalTime: '11:40', duration: '9h25', stops: 'Direto', price: 3290 },
  { id: 'FL005', airline: 'Eagle Air', icon: '🦅', departure: 'GRU', departureTime: '07:00', arrival: 'MIA', arrivalTime: '15:50', duration: '9h50', stops: '1 conexão', price: 1670 },
  { id: 'FL006', airline: 'VoeMais Air', icon: '✈️', departure: 'CGH', departureTime: '09:30', arrival: 'SDU', arrivalTime: '10:45', duration: '1h15', stops: 'Direto', price: 420 },
]

const mockHotels: HotelResult[] = [
  { id: 'HT001', name: 'Skyline Tower Hotel', icon: '🏨', location: 'Nova York, EUA', rating: 4.8, stars: 5, amenities: ['Wi-Fi', 'Piscina', 'Academia', 'Spa', 'Restaurante'], pricePerNight: 890 },
  { id: 'HT002', name: 'Beachfront Paradise', icon: '🏖️', location: 'Miami, EUA', rating: 4.5, stars: 4, amenities: ['Wi-Fi', 'Praia', 'Piscina', 'Bar'], pricePerNight: 520 },
  { id: 'HT003', name: 'Lisboa Heritage Inn', icon: '🏛️', location: 'Lisboa, Portugal', rating: 4.7, stars: 4, amenities: ['Wi-Fi', 'Café da manhã', 'Ar condicionado', 'Concierge'], pricePerNight: 380 },
  { id: 'HT004', name: 'Paulista Business Hotel', icon: '🏢', location: 'São Paulo, Brasil', rating: 4.3, stars: 3, amenities: ['Wi-Fi', 'Academia', 'Estacionamento', 'Café da manhã'], pricePerNight: 260 },
  { id: 'HT005', name: 'Copacabana Palace Resort', icon: '🌊', location: 'Rio de Janeiro, Brasil', rating: 4.9, stars: 5, amenities: ['Wi-Fi', 'Praia', 'Piscina', 'Spa', 'Restaurante', 'Bar'], pricePerNight: 1200 },
]

function Booking() {
  const [mode, setMode] = useState<SearchMode>('flights')
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [flights] = useState<FlightResult[]>(mockFlights)
  const [hotels] = useState<HotelResult[]>(mockHotels)

  const [flightSearch, setFlightSearch] = useState({
    origem: 'GRU',
    destino: 'JFK',
    dataIda: '',
    dataVolta: '',
    passageiros: '1',
    classe: 'economica',
  })

  const [hotelSearch, setHotelSearch] = useState({
    destino: 'Nova York',
    checkin: '',
    checkout: '',
    hospedes: '2',
  })

  const handleFlightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFlightSearch(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleHotelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHotelSearch(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = async () => {
    setSearching(true)
    await new Promise(r => setTimeout(r, 1200))
    setSearching(false)
    setShowResults(true)
  }

  const renderStars = (n: number) => '⭐'.repeat(n)

  const renderRating = (r: number) => {
    const full = Math.floor(r)
    const half = r % 1 >= 0.5
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0))
  }

  return (
    <main className="main-content">
      {/* Booking Hero */}
      <section className="booking-hero">
        <div className="container">
          <div className="booking-hero-content">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✈️</div>
            <h1>Reserve sua <span style={{ color: 'var(--color-accent)' }}>Viagem</span></h1>
            <p>Encontre as melhores ofertas em passagens aéreas e hotéis</p>

            {/* Search Tabs */}
            <div className="search-tabs">
              <button
                className={`search-tab ${mode === 'flights' ? 'active' : ''}`}
                onClick={() => { setMode('flights'); setShowResults(false) }}
              >
                ✈️ Voos
              </button>
              <button
                className={`search-tab ${mode === 'hotels' ? 'active' : ''}`}
                onClick={() => { setMode('hotels'); setShowResults(false) }}
              >
                🏨 Hotéis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Box */}
      <div className="container">
        <div className="search-box">
          {mode === 'flights' ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
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
            <form onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
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

      {/* Results */}
      {showResults && (
        <section className="booking-results">
          <div className="container">
            {mode === 'flights' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h2>🛩️ Voos Encontrados</h2>
                  <span className="status-badge active">{flights.length} resultados</span>
                </div>
                <p>{flightSearch.origem} → {flightSearch.destino}</p>

                {flights.map(f => (
                  <div key={f.id} className="flight-card">
                    <div className="flight-card-airline">
                      <span style={{ fontSize: '1.5rem' }}>{f.icon}</span>
                      <span>{f.airline}</span>
                    </div>
                    <div className="flight-card-route">
                      <div className="flight-card-time">
                        <div className="time">{f.departureTime}</div>
                        <div className="airport">{f.departure}</div>
                      </div>
                      <div className="flight-card-duration">
                        <div className="line" />
                        <span className="duration-text">{f.duration}</span>
                        <span className="stops">{f.stops}</span>
                      </div>
                      <div className="flight-card-time">
                        <div className="time">{f.arrivalTime}</div>
                        <div className="airport">{f.arrival}</div>
                      </div>
                    </div>
                    <div className="flight-card-price">
                      <div className="price">R$ {f.price.toFixed(2).replace('.', ',')}</div>
                      <div className="price-note">por pessoa</div>
                      <button className="btn btn-accent btn-sm">Reservar</button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h2>🏨 Hotéis Encontrados</h2>
                  <span className="status-badge active">{hotels.length} resultados</span>
                </div>
                <p>{hotelSearch.destino}</p>

                {hotels.map(h => (
                  <div key={h.id} className="hotel-card">
                    <div className="hotel-card-image">
                      {h.icon}
                    </div>
                    <div className="hotel-card-info">
                      <h4>{h.name}</h4>
                      <div className="location">📍 {h.location}</div>
                      <div className="rating">
                        {renderRating(h.rating)}
                        <span style={{ marginLeft: '0.5rem', color: 'var(--color-text)', fontWeight: 600 }}>{h.rating}</span>
                      </div>
                      <div style={{ marginBottom: '0.5rem' }}>{renderStars(h.stars)}</div>
                      <div className="amenities">
                        {h.amenities.map((a, i) => <span key={i}>{a}</span>)}
                      </div>
                    </div>
                    <div className="hotel-card-price">
                      <div>
                        <div className="price">R$ {h.pricePerNight.toFixed(2).replace('.', ',')}</div>
                        <div className="price-note">por noite</div>
                      </div>
                      <button className="btn btn-primary btn-sm">Reservar</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>
      )}

      {/* Packages CTA */}
      <section style={{ padding: '4rem 0', background: 'var(--gradient-dark)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            🌟 Pacotes Voe + Hotel
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '550px', margin: '0 auto 2rem' }}>
            Economize até <strong style={{ color: 'var(--color-accent)' }}>40%</strong> reservando voo e hotel juntos.
            Ofertas exclusivas para nossos passageiros.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cadastro" className="btn btn-accent btn-lg">🎁 Ver Pacotes</Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
              Minhas Reservas
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Booking
