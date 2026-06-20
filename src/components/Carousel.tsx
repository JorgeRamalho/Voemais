import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1755617597631-91470f821442?w=1600&h=900&fit=crop',
    alt: 'Passageiros embarcando em aeronave via ponte de embarque',
    caption: 'Embarque seguro e confortável',
  },
  {
    url: 'https://images.unsplash.com/photo-1767710096520-9246565a9d31?w=1600&h=900&fit=crop',
    alt: 'Pessoas com bagagem em terminal moderno',
    caption: 'Terminais modernos para sua jornada',
  },
  {
    url: 'https://images.unsplash.com/photo-1683971113886-ca5883e598b6?w=1600&h=900&fit=crop',
    alt: 'Vista aérea de pista de aeroporto ao pôr do sol',
    caption: 'Destinos incríveis esperam por você',
  },
  {
    url: 'https://images.unsplash.com/photo-1774995842354-a87e489f45f3?w=1600&h=900&fit=crop',
    alt: 'Avião na pista ao pôr do sol com céu dramático',
    caption: 'Voos com os melhores horários',
  },
  {
    url: 'https://images.unsplash.com/photo-1766310549748-8a8c2c5077d2?w=1600&h=900&fit=crop',
    alt: 'Pessoas embarcando em avião pelas escadas',
    caption: 'Cada viagem é uma nova história',
  },
]

function Carousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="carousel">
      <div className="carousel-track">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.url})` }}
            role="img"
            aria-label={slide.alt}
          >
            <div className="carousel-overlay" />
            <div className={`carousel-caption ${i === current ? 'active' : ''}`}>
              <span>{slide.caption}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Anterior">
        ‹
      </button>
      <button className="carousel-btn carousel-next" onClick={next} aria-label="Próximo">
        ›
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel
