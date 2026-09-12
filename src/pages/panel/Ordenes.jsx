import { useState } from 'react'
import { useOrdenes } from '../../hooks/useOrdenes'
import { useClientes } from '../../hooks/useClientes'
import { useVehiculos } from '../../hooks/useVehiculos'
import { useServicios } from '../../hooks/useServicios'
import Modal from '../../components/ui/Modal'
import OrdenForm from '../../components/ordenes/OrdenForm'
import Badge from '../../components/ui/Badge'
import { formatCurrency, formatDate } from '../../utils/helpers'

const ESTADOS = ['pendiente', 'en_progreso', 'completada', 'entregada']

export default function Ordenes() {
  const { ordenes, loading, crearOrden, actualizarEstado, eliminarOrden } = useOrdenes()
  const { clientes } = useClientes()
  const { vehiculos } = useVehiculos()
  const { servicios } = useServicios()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCobro, setModalCobro] = useState(null)
  const [metodoPago, setMetodoPago] = useState('efectivo')

  const handleCreate = async (data) => {
    await crearOrden(data.orden, data.servicios)
    setModalOpen(false)
  }

  const handleAvanzarEstado = async (orden) => {
    const idx = ESTADOS.indexOf(orden.estado)
    if (idx < ESTADOS.length - 1) {
      const nuevoEstado = ESTADOS[idx + 1]
      if (nuevoEstado === 'completada') {
        setModalCobro(orden)
      } else {
        await actualizarEstado(orden.id, nuevoEstado)
      }
    }
  }

  const handleCobrar = async () => {
    if (modalCobro) {
      await actualizarEstado(modalCobro.id, 'completada', metodoPago)
      setModalCobro(null)
    }
  }

  const ordenesPorEstado = ESTADOS.reduce((acc, estado) => {
    acc[estado] = ordenes.filter(o => o.estado === estado)
    return acc
  }, {})

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Órdenes de Lavado</h1>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>+ Nueva Orden</button>
      </div>

      {loading ? <p className="empty-text">Cargando...</p> : (
        <div className="kanban">
          {ESTADOS.map(estado => (
            <div key={estado} className="kanban-column">
              <div className="kanban-header" style={{ borderColor: estado === 'pendiente' ? '#f59e0b' : estado === 'en_progreso' ? '#3b82f6' : estado === 'completada' ? '#22c55e' : '#a855f7' }}>
                <h3>{estado.replace('_', ' ').toUpperCase()}</h3>
                <span className="kanban-count">{ordenesPorEstado[estado].length}</span>
              </div>
              <div className="kanban-cards">
                {ordenesPorEstado[estado].map(o => (
                  <div key={o.id} className="kanban-card glass">
                    <div className="kanban-card-top">
                      <strong>{o.clientes?.nombre || 'Sin cliente'}</strong>
                      <Badge estado={o.estado} />
                    </div>
                    <p className="kanban-vehiculo">🚗 {o.vehiculos?.marca} {o.vehiculos?.modelo} - {o.vehiculos?.patente}</p>
                    <p className="kanban-total">{formatCurrency(o.total)}</p>
                    <p className="kanban-fecha">{formatDate(o.created_at)}</p>
                    {o.notas && <p className="kanban-notas">📝 {o.notas}</p>}
                    <div className="kanban-card-actions">
                      {ESTADOS.indexOf(o.estado) < ESTADOS.length - 1 && (
                        <button className="btn-sm btn-primary" onClick={() => handleAvanzarEstado(o)}>
                          {ESTADOS.indexOf(o.estado) + 1 === ESTADOS.indexOf('completada') ? '✓ Cobrar' : '→ Siguiente'}
                        </button>
                      )}
                      <button className="btn-sm btn-danger" onClick={() => { if (confirm('¿Eliminar orden?')) eliminarOrden(o.id) }}>🗑️</button>
                    </div>
                  </div>
                ))}
                {ordenesPorEstado[estado].length === 0 && <p className="empty-text">Sin órdenes</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva Orden de Lavado">
        <OrdenForm clientes={clientes} vehiculos={vehiculos} servicios={servicios} onSave={handleCreate} onCancel={() => setModalOpen(false)} />
      </Modal>

      <Modal open={!!modalCobro} onClose={() => setModalCobro(null)} title="Cobrar Orden">
        <div className="cobro-modal">
          <p>Orden de <strong>{modalCobro?.clientes?.nombre}</strong></p>
          <p className="cobro-total">{formatCurrency(modalCobro?.total || 0)}</p>
          <div className="form-group">
            <label>Método de pago</label>
            <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>
          <div className="cobro-actions">
            <button className="btn-outline" onClick={() => setModalCobro(null)}>Cancelar</button>
            <button className="btn-primary" onClick={handleCobrar}>Confirmar Cobro</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
