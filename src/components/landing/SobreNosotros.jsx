import React from 'react'

const badges = [
  { icon: '✨', text: 'Atención al Detalle' },
  { icon: '🧴', text: 'Productos Premium' },
  { icon: '🛡️', text: 'Garantía de Satisfacción' },
  { icon: '⚡', text: 'Trabajo Rápido y Profesional' },
]

export default function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className="sobre-section">
      <div className="sobre-container">
        <div className="sobre-text">
          <h2 className="section-title text-gradient">SOBRE NOSOTROS</h2>
          <p className="sobre-desc">
            En <strong className="text-neon-pink">Garage Detailing</strong> somos apasionados por la
            estética vehicular. Con años de experiencia en el cuidado y embellecimiento de autos,
            nos dedicamos a devolver y potenciar el brillo original de tu vehículo.
          </p>
          <p className="sobre-desc">
            Utilizamos productos de primera calidad y técnicas profesionales para garantizar
            resultados impecables. Cada auto que ingresa a nuestro taller recibe la atención
            que merece, como si fuera único.
          </p>
          <div className="sobre-badges">
            {badges.map((b, i) => (
              <div key={i} className="sobre-badge glass">
                <span className="badge-icon">{b.icon}</span>
                <span className="badge-text">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sobre-image">
          <img
            src="https://images.unsplash.com/photo-1746079074447-73c1bc30bf70?w=600&auto=format&fit=crop&q=80"
            alt="Trabajo profesional de detailing"
          />
        </div>
      </div>
    </section>
  )
}
