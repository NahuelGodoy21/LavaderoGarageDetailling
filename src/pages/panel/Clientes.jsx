import { useState } from 'react'
import { useClientes } from '../../hooks/useClientes'
import SearchBar from '../../components/ui/SearchBar'
import Modal from '../../components/ui/Modal'
import ClienteForm from '../../components/clientes/ClienteForm'
import { formatDate } from '../../utils/helpers'

export default function Clientes() {
  const { clientes, loading, crearCliente, actualizarCliente, eliminarCliente } = useClientes()
  const [busqueda, setBusqueda] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState(null)

  const filtrados = clientes.filter(c =>
    c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.telefono?.includes(busqueda) ||
    c.email?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleSave = async (data) => {
    if (editando) await actualizarCliente(editando.id, data)
    else await crearCliente(data)
    setModalOpen(false)
    setEditando(null)
  }

  const handleEdit = (cliente) => {
    setEditando(cliente)
    setModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este cliente?')) await eliminarCliente(id)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Clientes</h1>
        <button className="btn-primary" onClick={() => { setEditando(null); setModalOpen(true) }}>+ Nuevo Cliente</button>
      </div>

      <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por nombre, teléfono o email..." />

      {loading ? <p className="empty-text">Cargando...</p> : (
        <div className="table-container glass">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.nombre}</strong></td>
                  <td>{c.telefono || '-'}</td>
                  <td>{c.email || '-'}</td>
                  <td>{formatDate(c.created_at)}</td>
                  <td className="actions-cell">
                    <button className="btn-icon" onClick={() => handleEdit(c)}>✏️</button>
                    <button className="btn-icon btn-danger" onClick={() => handleDelete(c.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && <tr><td colSpan="5" className="empty-text">No se encontraron clientes</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditando(null) }} title={editando ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <ClienteForm initial={editando} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditando(null) }} />
      </Modal>
    </div>
  )
}
