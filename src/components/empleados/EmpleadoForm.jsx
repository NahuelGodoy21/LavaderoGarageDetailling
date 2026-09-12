import { useState } from 'react'

export default function EmpleadoForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'empleado',
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
        <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre del empleado" />
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="email@ejemplo.com" />
      </div>
      <div className="form-group">
        <label>Contraseña *</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required minLength="6" placeholder="Mínimo 6 caracteres" />
      </div>
      <div className="form-group">
        <label>Rol</label>
        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="empleado">Empleado</option>
          <option value="gerente">Gerente</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">Crear Empleado</button>
      </div>
    </form>
  )
}
