import { useState } from 'react'

export default function ServicioForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    nombre: initial?.nombre || '',
    descripcion: initial?.descripcion || '',
    precio: initial?.precio || '',
    duracion_min: initial?.duracion_min || '',
    categoria: initial?.categoria || 'lavado',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, precio: parseInt(form.precio), duracion_min: parseInt(form.duracion_min) || null })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre *</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre del servicio" />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" placeholder="Descripción del servicio" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Precio ($) *</label>
          <input name="precio" type="number" value={form.precio} onChange={handleChange} required min="0" placeholder="8000" />
        </div>
        <div className="form-group">
          <label>Duración (min)</label>
          <input name="duracion_min" type="number" value={form.duracion_min} onChange={handleChange} min="0" placeholder="40" />
        </div>
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="lavado">Lavado</option>
          <option value="detailing">Detailing</option>
          <option value="pulido">Pulido</option>
          <option value="proteccion">Protección</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">{initial ? 'Guardar' : 'Crear'}</button>
      </div>
    </form>
  )
}
