import { useState } from 'react'
import { useGastos } from '../../hooks/useGastos'
import SearchBar from '../../components/ui/SearchBar'
import Modal from '../../components/ui/Modal'
import GastoForm from '../../components/gastos/GastoForm'
import { formatCurrency, formatDate, CATEGORIAS_GASTO } from '../../utils/helpers'

export default function Gastos() {
  const { gastos, loading, crearGasto, eliminarGasto } = useGastos()
  const [busqueda, setBusqueda] = useState('')
  const [filtroCat, setFiltroCat] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtrados = gastos.filter(g => {
    const matchBusqueda = g.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    const matchCat = !filtroCat || g.categoria === filtroCat
    return matchBusqueda && matchCat
  })

  const totalFiltrado = filtrados.reduce((sum, g) => sum + (g.monto || 0), 0)

  const handleSave = async (data) => {
    await crearGasto(data)
    setModalOpen(false)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gastos</h1>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>+ Nuevo Gasto</button>
      </div>

      <div className="gastos-filters">
        <SearchBar value={busqueda} onChange={setBusqueda} placeholder="Buscar gasto..." />
        <select className="filter-select" value={filtroCat} onChange={e => setFiltroCat(e.target.value)}>
          <option value="">Todas las categorías</option>
          {CATEGORIAS_GASTO.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <div className="gastos-total glass">
        <span>Total filtrado:</span>
        <strong className="text-neon-pink">{formatCurrency(totalFiltrado)}</strong>
      </div>

      {loading ? <p className="empty-text">Cargando...</p> : (
        <div className="table-container glass">
          <table className="data-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(g => (
                <tr key={g.id}>
                  <td><strong>{g.descripcion}</strong></td>
                  <td className="gasto-monto">{formatCurrency(g.monto)}</td>
                  <td><span className="gasto-cat-badge">{CATEGORIAS_GASTO.find(c => c.value === g.categoria)?.label || g.categoria}</span></td>
                  <td>{formatDate(g.fecha)}</td>
                  <td className="actions-cell">
                    <button className="btn-icon btn-danger" onClick={() => { if (confirm('¿Eliminar?')) eliminarGasto(g.id) }}>🗑️</button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && <tr><td colSpan="5" className="empty-text">No se encontraron gastos</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Gasto">
        <GastoForm onSave={handleSave} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
