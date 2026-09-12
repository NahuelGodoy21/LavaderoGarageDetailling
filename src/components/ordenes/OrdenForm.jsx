import { useState } from 'react'
import { formatCurrency } from '../../utils/helpers'

export default function OrdenForm({ clientes, vehiculos, servicios, onSave, onCancel }) {
  const [clienteId, setClienteId] = useState('')
  const [vehiculoId, setVehiculoId] = useState('')
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([])
  const [notas, setNotas] = useState('')

  const vehiculosCliente = vehiculos.filter(v => v.cliente_id === clienteId)
  const total = serviciosSeleccionados.reduce((sum, s) => sum + s.precio, 0)

  const toggleServicio = (servicio) => {
    setServiciosSeleccionados(prev => {
      const exists = prev.find(s => s.id === servicio.id)
      if (exists) return prev.filter(s => s.id !== servicio.id)
      return [...prev, servicio]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!clienteId || !vehiculoId || serviciosSeleccionados.length === 0) {
      alert('Completá cliente, vehículo y al menos un servicio')
      return
    }
    onSave({
      orden: {
        cliente_id: clienteId,
        vehiculo_id: vehiculoId,
        total,
        notas,
        estado: 'pendiente',
      },
      servicios: serviciosSeleccionados,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Cliente *</label>
        <select value={clienteId} onChange={e => { setClienteId(e.target.value); setVehiculoId('') }} required>
          <option value="">Seleccionar cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      {clienteId && (
        <div className="form-group">
          <label>Vehículo *</label>
          <select value={vehiculoId} onChange={e => setVehiculoId(e.target.value)} required>
            <option value="">Seleccionar vehículo</option>
            {vehiculosCliente.map(v => (
              <option key={v.id} value={v.id}>{v.marca} {v.modelo} - {v.patente}</option>
            ))}
          </select>
          {vehiculosCliente.length === 0 && <p className="form-hint">Este cliente no tiene vehículos registrados</p>}
        </div>
      )}

      <div className="form-group">
        <label>Servicios *</label>
        <div className="servicios-selector">
          {servicios.map(s => (
            <div
              key={s.id}
              className={`servicio-option ${serviciosSeleccionados.find(ss => ss.id === s.id) ? 'selected' : ''}`}
              onClick={() => toggleServicio(s)}
            >
              <span className="servicio-option-name">{s.nombre}</span>
              <span className="servicio-option-price">{formatCurrency(s.precio)}</span>
            </div>
          ))}
        </div>
      </div>

      {serviciosSeleccionados.length > 0 && (
        <div className="orden-total">
          <span>Total:</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      )}

      <div className="form-group">
        <label>Notas</label>
        <textarea value={notas} onChange={e => setNotas(e.target.value)} rows="2" placeholder="Observaciones..." />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-outline" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">Crear Orden</button>
      </div>
    </form>
  )
}
