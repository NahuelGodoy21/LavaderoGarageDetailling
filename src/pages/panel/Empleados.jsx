import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import SearchBar from '../../components/ui/SearchBar'
import Modal from '../../components/ui/Modal'
import EmpleadoForm from '../../components/empleados/EmpleadoForm'

export default function Empleados() {
  const { perfil } = useAuth()
  const [empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => { fetchEmpleados() }, [])

  async function fetchEmpleados() {
    setLoading(true)
    const { data } = await supabase.from('perfiles').select('*').order('created_at', { ascending: false })
    setEmpleados(data || [])
    setLoading(false)
  }

  const filtrados = empleados.filter(e =>
    e.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.rol?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const handleCreate = async (data) => {
    const { data: authData, error } = await supabase.auth.signUp({ email: data.email, password: data.password })
    if (error) { alert(error.message); return }
    await supabase.from('perfiles').insert({ id: authData.user.id, nombre: data.nombre, rol: data.rol, activo: true })
    setModalOpen(false)
    fetchEmpleados()
  }

  const toggleActivo = async (emp) => {
    await supabase.from('perfiles').update({ activo: !emp.activo }).eq('id', emp.id)
    fetchEmpleados()
  }

  if (perfil?.rol !== 'admin') {
    return <div><h1 className="page-title">Acceso denegado</h1><p className="empty-text">Solo los administradores pueden gestionar empleados.</p></div>
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Empleados</h1>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>+ Nuevo Empleado</button>
      </div>

      <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar por nombre o rol..." />

      {loading ? <p className="empty-text">Cargando...</p> : (
        <div className="table-container glass">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(e => (
                <tr key={e.id}>
                  <td><strong>{e.nombre}</strong></td>
                  <td><span className="rol-badge">{e.rol}</span></td>
                  <td>
                    <span className={`estado-badge ${e.activo ? 'activo' : 'inactivo'}`}>
                      {e.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-icon" onClick={() => toggleActivo(e)}>
                      {e.activo ? '⏸️' : '▶️'}
                    </button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && <tr><td colSpan="4" className="empty-text">No se encontraron empleados</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Empleado">
        <EmpleadoForm onSave={handleCreate} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
