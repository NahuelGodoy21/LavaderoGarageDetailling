import { useState } from 'react'
import { useVehiculos } from '../../hooks/useVehiculos'
import { useClientes } from '../../hooks/useClientes'
import SearchBar from '../../components/ui/SearchBar'
import Modal from '../../components/ui/Modal'
import VehiculoForm from '../../components/vehiculos/VehiculoForm'
import { getTamanoLabel } from '../../utils/helpers'

export default function Vehiculos() {
  const { vehiculos, loading, crearVehiculo, actualizarVehiculo, eliminarVehiculo } = useVehiculos()
  const { clientes } = useClientes()
  const [busqueda, setBusqueda] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState(null)

  const filtrados = vehiculos.filter(v =>
    v.patente?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.marca?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.modelo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.clientes?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleSave = async (data) => {
    if (editando) await actualizarVehiculo(editando.id, data)
    else await crearVehiculo(data)
    setModalOpen(false)
    setEditando(null)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Vehículos</h1>
        <button className="btn-primary" onClick={() => { setEditando(null); setModalOpen(true) }}>+ Nuevo Vehículo</button>
      </div>

      <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por patente, marca, modelo o cliente..." />

      {loading ? <p className="empty-text">Cargando...</p> : (
        <div className="table-container glass">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Color</th>
                <th>Tamaño</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(v => (
                <tr key={v.id}>
                  <td><strong>{v.patente}</strong></td>
                  <td>{v.marca || '-'}</td>
                  <td>{v.modelo || '-'}</td>
                  <td>{v.color || '-'}</td>
                  <td>{getTamanoLabel(v.tamano)}</td>
                  <td>{v.clientes?.nombre || '-'}</td>
                  <td className="actions-cell">
                    <button className="btn-icon" onClick={() => { setEditando(v); setModalOpen(true) }}>✏️</button>
                    <button className="btn-icon btn-danger" onClick={() => { if (confirm('¿Eliminar?')) eliminarVehiculo(v.id) }}>🗑️</button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && <tr><td colSpan="7" className="empty-text">No se encontraron vehículos</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditando(null) }} title={editando ? 'Editar Vehículo' : 'Nuevo Vehículo'}>
        <VehiculoForm initial={editando} clientes={clientes} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditando(null) }} />
      </Modal>
    </div>
  )
}
