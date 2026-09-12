import { useState } from 'react'

export default function ClienteForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    nombre: initial?.nombre || '',
    telefono: initial?.telefono || '',
    email: initial?.email || '',
    direccion: initial?.direccion || '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre *</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre del cliente" />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="3445-XXXXXX" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@ejemplo.com" />
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">{initial ? 'Guardar' : 'Crear'}</button>
      </div>
    </form>
  )
}
