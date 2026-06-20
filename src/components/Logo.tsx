interface LogoProps {
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function Logo({ showSlogan = true, size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 56 : 44;
  const titleSize = size === 'sm' ? '1.2rem' : size === 'lg' ? '2rem' : '1.5rem';

  return (
    <a href="/" className="logo" style={{ textDecoration: 'none' }}>
      <svg
        className="logo-icon"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2E5C" />
            <stop offset="100%" stopColor="#4A90D9" />
          </linearGradient>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#logoSky)" />
        <path
          d="M32 15L26 30L20 28L18 32L26 34L26 38L30 36L32 45L34 36L38 38L38 34L46 32L44 28L38 30Z"
          fill="white"
          opacity="0.95"
        />
        <circle cx="32" cy="20" r="3" fill="url(#logoGold)" />
      </svg>
      <div className="logo-text">
        <div className="logo-title" style={{ fontSize: titleSize }}>
          <span>Voe</span><span>Mais</span>
        </div>
        {showSlogan && <span className="logo-slogan">Sua Jornada Começa Aqui</span>}
      </div>
    </a>
  )
}

export default Logo
