import { useState } from 'react'
import { useServicios } from '../../hooks/useServicios'
import SearchBar from '../../components/ui/SearchBar'
import Modal from '../../components/ui/Modal'
import ServicioForm from '../../components/servicios/ServicioForm'
import { formatCurrency } from '../../utils/helpers'

export default function Servicios() {
  const { servicios, loading, crearServicio, actualizarServicio, eliminarServicio } = useServicios()
  const [busqueda, setBusqueda] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState(null)

  const filtrados = servicios.filter(s =>
    s.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    s.categoria?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleSave = async (data) => {
    if (editando) await actualizarServicio(editando.id, data)
    else await crearServicio(data)
    setModalOpen(false)
    setEditando(null)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Servicios</h1>
        <button className="btn-primary" onClick={() => { setEditando(null); setModalOpen(true) }}>+ Nuevo Servicio</button>
      </div>

      <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por nombre o categoría..." />

      {loading ? <p className="empty-text">Cargando...</p> : (
        <div className="servicios-grid-panel">
          {filtrados.map(s => (
            <div key={s.id} className="servicio-panel-card glass">
              <div className="servicio-panel-header">
                <h3>{s.nombre}</h3>
                <span className="servicio-panel-precio">{formatCurrency(s.precio)}</span>
              </div>
              <p className="servicio-panel-desc">{s.descripcion}</p>
              <div className="servicio-panel-meta">
                <span>⏱ {s.duracion_min} min</span>
                <span className="servicio-panel-cat">{s.categoria}</span>
              </div>
              <div className="servicio-panel-actions">
                <button className="btn-icon" onClick={() => { setEditando(s); setModalOpen(true) }}>✏️</button>
                <button className="btn-icon btn-danger" onClick={() => { if (confirm('¿Eliminar?')) eliminarServicio(s.id) }}>🗑️</button>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && <p className="empty-text">No se encontraron servicios</p>}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditando(null) }} title={editando ? 'Editar Servicio' : 'Nuevo Servicio'}>
        <ServicioForm initial={editando} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditando(null) }} />
      </Modal>
    </div>
  )
}
