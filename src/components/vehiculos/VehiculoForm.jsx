import { useState } from 'react'

export default function VehiculoForm({ initial, clientes, onSave, onCancel }) {
  const [form, setForm] = useState({
    patente: initial?.patente || '',
    marca: initial?.marca || '',
    modelo: initial?.modelo || '',
    color: initial?.color || '',
    tamano: initial?.tamano || 'mediano',
    cliente_id: initial?.cliente_id || '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Patente *</label>
        <input name="patente" value={form.patente} onChange={handleChange} required placeholder="ABC 123" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Marca</label>
          <input name="marca" value={form.marca} onChange={handleChange} placeholder="Ford" />
        </div>
        <div className="form-group">
          <label>Modelo</label>
          <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="EcoSport" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Color</label>
          <input name="color" value={form.color} onChange={handleChange} placeholder="Negro" />
        </div>
        <div className="form-group">
          <label>Tamaño</label>
          <select name="tamano" value={form.tamano} onChange={handleChange}>
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Cliente *</label>
        <select name="cliente_id" value={form.cliente_id} onChange={handleChange} required>
          <option value="">Seleccionar cliente</option>
          {clientes?.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">{initial ? 'Guardar' : 'Crear'}</button>
      </div>
    </form>
  )
}
