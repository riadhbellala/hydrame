// Animated SVG wave component for background decoration
export default function WaterWave({ className = '', opacity = 0.15 }) {
  return (
    <div className={`absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: '200px' }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a6b3c" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#1a6b3c" />
          </linearGradient>
        </defs>
        <path
          d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,186.7C672,181,768,139,864,138.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGrad)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;-40,10;0,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,250.7C672,256,768,224,864,213.3C960,203,1056,213,1152,229.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGrad)"
          opacity="0.5"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;30,-5;0,0"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}
