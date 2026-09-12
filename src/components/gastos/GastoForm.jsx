import { useState } from 'react'
import { CATEGORIAS_GASTO } from '../../utils/helpers'

export default function GastoForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    categoria: 'otros',
    fecha: new Date().toISOString().split('T')[0],
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, monto: parseInt(form.monto) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Descripción *</label>
        <input name="descripcion" value={form.descripcion} onChange={handleChange} required placeholder="Descripción del gasto" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Monto ($) *</label>
          <input name="monto" type="number" value={form.monto} onChange={handleChange} required min="0" placeholder="5000" />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          {CATEGORIAS_GASTO.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">Crear Gasto</button>
      </div>
    </form>
  )
}
