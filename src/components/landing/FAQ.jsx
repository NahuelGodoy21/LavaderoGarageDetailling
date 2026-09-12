import React, { useState } from 'react'

const preguntas = [
  {
    q: '¿Cuánto demora cada servicio?',
    a: 'El Lavado Básico toma entre 30-45 minutos. Los servicios de Detallado y Pulido pueden tomar entre 2 y 4 horas dependiendo del estado del vehículo. El Full Detailing puede llevar un día completo.',
  },
  {
    q: '¿Qué productos utilizan?',
    a: 'Trabajamos exclusivamente con productos de marcas reconocidas y premium del mercado automotriz. Utilizamos ceras, descontaminantes y acondicionadores de primera calidad que protegen la pintura y los materiales de tu auto.',
  },
  {
    q: '¿Atienden en el local o a domicilio?',
    a: 'Nuestro servicio principal se realiza en nuestro local en Rosario del Tala. Consultanos por servicio a domicilio para trabajos de detailing, sujeto a disponibilidad y zona.',
  },
  {
    q: '¿Cuáles son las formas de pago?',
    a: 'Aceptamos efectivo, transferencia bancaria y Mercado Pago. También podés abonar con tarjeta de débito o crédito.',
  },
  {
    q: '¿Necesito hacer cita previa?',
    a: 'Sí, recomendamos reservar tu turno con anticipación para garantizar disponibilidad. Podés reservar por WhatsApp o a través de nuestro formulario de reserva.',
  },
  {
    q: '¿Ofrecen algún tipo de garantía?',
    a: 'Sí, todos nuestros servicios cuentan con garantía de satisfacción. Si no quedás conforme con el resultado, lo solucionamos sin costo adicional.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="faq-section">
      <div className="section-header">
        <h2 className="section-title text-gradient">PREGUNTAS FRECUENTES</h2>
        <p className="section-subtitle">Resolvemos tus dudas</p>
      </div>
      <div className="faq-list">
        {preguntas.map((p, i) => (
          <div key={i} className={`faq-item glass ${openIndex === i ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <span>{p.q}</span>
              <span className="faq-arrow">{openIndex === i ? '−' : '+'}</span>
            </button>
            {openIndex === i && <div className="faq-answer"><p>{p.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}
