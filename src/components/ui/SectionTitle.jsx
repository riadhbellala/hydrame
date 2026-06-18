/**
 * SectionTitle — clean, editorial. No gradient text, no decorative lines.
 */
export default function SectionTitle({ eyebrow, title, subtitle, centered = true }) {
  return (
    <div className={`mb-14 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="eyebrow mb-4">{eyebrow}</p>
      )}
      <h2
        className="text-4xl md:text-[2.75rem] font-bold text-white leading-tight mb-5"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-[1rem] leading-relaxed text-slate-400 max-w-xl ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
