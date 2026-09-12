import React from 'react'

export default function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle text-neon-green">EXCELENCIA AUTOMOTRIZ</span>
        <h1 className="hero-title">
          <span className="text-gradient">ELEVANDO EL ESTÁNDAR</span>
          <span className="text-gradient">DE TU VEHÍCULO</span>
        </h1>
        <p className="hero-description">
          Cuidado profesional y al detalle para aquellos que exigen lo mejor.
          Descubre la verdadera belleza de tu auto.
        </p>
        <div className="hero-cta">
          <a href="https://wa.me/5493445645818" target="_blank" rel="noreferrer" className="btn-primary">
            Reservar Turno
          </a>
          <a href="#servicios" className="btn-outline" onClick={e => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Ver Servicios
          </a>
        </div>
      </div>
    </section>
  )
}
