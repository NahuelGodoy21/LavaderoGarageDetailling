import React, { useState } from 'react'

const fotos = [
  { src: 'https://images.unsplash.com/photo-1769641156615-5d561513b3fa?w=600&auto=format&fit=crop&q=80', alt: 'Lavado exterior con espuma activa' },
  { src: 'https://images.unsplash.com/photo-1746079074447-73c1bc30bf70?w=600&auto=format&fit=crop&q=80', alt: 'Limpieza interior con vapor' },
  { src: 'https://images.unsplash.com/photo-1754296577887-955581147486?w=600&auto=format&fit=crop&q=80', alt: 'Auto cubierto de espuma' },
  { src: 'https://images.unsplash.com/photo-1761138078661-541ba2bf7b12?w=600&auto=format&fit=crop&q=80', alt: 'Porsche detallado en garage' },
  { src: 'https://images.unsplash.com/photo-1728415936033-37846aeb302b?w=600&auto=format&fit=crop&q=80', alt: 'Detalle de llanta brillante' },
  { src: 'https://images.unsplash.com/photo-1750492786588-fa447659b42b?w=600&auto=format&fit=crop&q=80', alt: 'Lavado profesional de auto' },
]

export default function Galeria() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="galeria" className="galeria-section">
      <div className="section-header">
        <h2 className="section-title text-gradient">NUESTROS TRABAJOS</h2>
        <p className="section-subtitle">Resultados que hablan por sí solos</p>
      </div>
      <div className="galeria-grid">
        {fotos.map((f, i) => (
          <div key={i} className="galeria-item" onClick={() => setSelected(f)}>
            <img src={f.src} alt={f.alt} loading="lazy" />
            <div className="galeria-overlay">
              <span>Ver imagen</span>
            </div>
          </div>
        ))}
      </div>
      <div className="galeria-cta">
        <a href="https://www.instagram.com/garage__detailing_/" target="_blank" rel="noreferrer" className="btn-outline">
          Ver más en Instagram
        </a>
      </div>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
          <img src={selected.src} alt={selected.alt} />
        </div>
      )}
    </section>
  )
}
