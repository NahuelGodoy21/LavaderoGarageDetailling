import React from 'react'

const testimonios = [
  {
    nombre: 'Martín G.',
    auto: 'Volkswagen Gol',
    estrellas: 5,
    texto: 'Excelente trabajo, mi auto quedó como nuevo. La atención es muy profesional y los precios son justos. ¡100% recomendado!',
  },
  {
    nombre: 'Luciana P.',
    auto: 'Ford EcoSport',
    estrellas: 5,
    texto: 'Hice el Full Detailing y quede impresionada. Se nota la pasión por lo que hacen. El interior quedó impecable.',
  },
  {
    nombre: 'Carlos R.',
    auto: 'Chevrolet Onix',
    estrellas: 5,
    texto: 'Llevo mi auto siempre a Garage Detailing. Son puntuales, detallistas y el auto queda brillando como el primer día.',
  },
  {
    nombre: 'Sofía M.',
    auto: 'Fiat Cronos',
    estrellas: 5,
    texto: 'Muy buen servicio de lavado premium. El auto quedó perfecto por dentro y por fuera. Volveré sin duda.',
  },
]

function Estrellas({ count }) {
  return (
    <div className="testimonio-estrellas">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'star filled' : 'star'}>★</span>
      ))}
    </div>
  )
}

export default function Testimonios() {
  return (
    <section id="testimonios" className="testimonios-section">
      <div className="section-header">
        <h2 className="section-title text-gradient">LO QUE DICEN NUESTROS CLIENTES</h2>
        <p className="section-subtitle">Opiniones reales de quienes ya confiaron en nosotros</p>
      </div>
      <div className="testimonios-grid">
        {testimonios.map((t, i) => (
          <div key={i} className="testimonio-card glass">
            <Estrellas count={t.estrellas} />
            <p className="testimonio-texto">"{t.texto}"</p>
            <div className="testimonio-autor">
              <div className="testimonio-avatar">{t.nombre.charAt(0)}</div>
              <div>
                <strong>{t.nombre}</strong>
                <span className="testimonio-auto">{t.auto}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
