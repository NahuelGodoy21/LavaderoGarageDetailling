import React, { useState } from 'react'

const servicios = [
  'Lavado Básico - $8.000',
  'Lavado Premium - $14.000',
  'Detallado Interior - $18.000',
  'Pulido de Pintura - $25.000',
  'Protección Cerámica - $45.000',
  'Full Detailing - $55.000',
]

export default function Reserva() {
  const [form, setForm] = useState({ nombre: '', telefono: '', servicio: '', fecha: '', hora: '', notas: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola! Quiero reservar un turno.\n\n👤 Nombre: ${form.nombre}\n📱 Tel: ${form.telefono}\n🚗 Servicio: ${form.servicio}\n📅 Fecha: ${form.fecha}\n🕐 Hora: ${form.hora}\n📝 Notas: ${form.notas || 'N/A'}`;
    window.open(`https://wa.me/5493445645818?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="reserva" className="reserva-section">
      <div className="section-header">
        <h2 className="section-title text-gradient">RESERVÁ TU TURNO</h2>
        <p className="section-subtitle">Elegí el servicio y agendá en el momento</p>
      </div>
      <form className="reserva-form glass" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Teléfono / WhatsApp</label>
            <input type="tel" name="telefono" placeholder="3445-XXXXXX" value={form.telefono} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label>Servicio</label>
          <select name="servicio" value={form.servicio} onChange={handleChange} required>
            <option value="">Elegí un servicio</option>
            {servicios.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Fecha preferida</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Horario preferido</label>
            <select name="hora" value={form.hora} onChange={handleChange} required>
              <option value="">Elegí horario</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Notas adicionales (opcional)</label>
          <textarea name="notas" placeholder="Algo que querés que sepamos..." value={form.notas} onChange={handleChange} rows="3" />
        </div>
        <button type="submit" className="btn-primary reservar-btn">
          Reservar por WhatsApp
        </button>
      </form>
    </section>
  )
}
