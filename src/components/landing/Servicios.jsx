import React from 'react'

const servicios = [
  {
    icon: '🚿',
    title: 'Lavado Básico',
    desc: 'Lavado exterior con espuma activa, enjuague a presión, secado con microfibra y aspirado interior.',
    incluye: ['Lavado exterior', 'Aspirado interior', 'Limpieza de vidrios', 'Secado con microfibra'],
    precio: '$8.000',
  },
  {
    icon: '🧽',
    title: 'Lavado Premium',
    desc: 'Lavado completo con descontaminación de pintura, limpieza profunda de interior y acondicionamiento.',
    incluye: ['Todo lo del Básico', 'Limpieza de panelled', 'Acondicionador de plásticos', 'Limpieza de tapizados'],
    precio: '$14.000',
  },
  {
    icon: '💎',
    title: 'Detallado Interior',
    desc: 'Limpieza profunda de tapizados, cuero, plásticos, vidrios y eliminating de olores.',
    incluye: ['Aspirado profundo', 'Lavado de tapizados', 'Limpieza de cuero', 'Desodorización', 'Acondicionamiento'],
    precio: '$18.000',
  },
  {
    icon: '🖌️',
    title: 'Pulido de Pintura',
    desc: 'Corrección de laca para eliminar rayones superficiales, marcas de agua y opacidad.',
    incluye: ['Descontaminación', 'Pulido mecánico', 'Corrección de micro-rayones', 'Brillo espejo'],
    precio: '$25.000',
  },
  {
    icon: '🛡️',
    title: 'Protección Cerámica',
    desc: 'Aplicación de recubrimiento cerámico para protección duradera contra rayos UV, lluvia y suciedad.',
    incluye: ['Preparación de superficie', 'Aplicación de cerámica', 'Secado y curado', 'Protección UV'],
    precio: '$45.000',
  },
  {
    icon: '🔥',
    title: 'Full Detailing',
    desc: 'Servicio completo de estética vehicular: exterior, interior, pulido y protección.',
    incluye: ['Todo lo del Premium', 'Pulido de pintura', 'Cera de protección', 'Limpieza de motor', 'Tratamiento de neumáticos'],
    precio: '$55.000',
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="servicios-section">
      <div className="section-header">
        <h2 className="section-title text-gradient">NUESTROS SERVICIOS</h2>
        <p className="section-subtitle">Calidad inigualable en cada detalle</p>
      </div>
      <div className="servicios-grid">
        {servicios.map((s, i) => (
          <div key={i} className="servicio-card glass">
            <span className="servicio-icon">{s.icon}</span>
            <h3 className="servicio-title">{s.title}</h3>
            <p className="servicio-desc">{s.desc}</p>
            <ul className="servicio-incluye">
              {s.incluye.map((item, j) => (
                <li key={j}>✓ {item}</li>
              ))}
            </ul>
            <div className="servicio-precio">{s.precio}</div>
            <a
              href={`https://wa.me/5493445645818?text=${encodeURIComponent(`Hola! Quiero reservar: ${s.title}`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary servicio-btn"
            >
              Reservar
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
