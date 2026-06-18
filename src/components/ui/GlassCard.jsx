export default function GlassCard({ children, className = '', hover = true, variant = 'default' }) {
  const variants = {
    default: 'glass border-glass',
    green: 'glass-green border-primary-glass',
    dark: 'glass-dark border-glass',
  }

  return (
    <div
      className={`
        rounded-[20px] p-6
        ${variants[variant]}
        ${hover ? 'hover-lift cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
