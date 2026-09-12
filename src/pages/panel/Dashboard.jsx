import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import StatsCard from '../../components/ui/StatsCard'
import Badge from '../../components/ui/Badge'
import { formatCurrency, formatDate } from '../../utils/helpers'

export default function Dashboard() {
  const [stats, setStats] = useState({ ingresosHoy: 0, ordenesActivas: 0, totalClientes: 0, gastosMes: 0 })
  const [ultimasOrdenes, setUltimasOrdenes] = useState([])
  const [ingresosSemana, setIngresosSemana] = useState([])

  useEffect(() => {
    fetchStats()
    fetchUltimasOrdenes()
    fetchIngresosSemana()
  }, [])

  async function fetchStats() {
    const hoy = new Date().toISOString().split('T')[0]
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

    const [ordenesHoy, ordenesActivas, clientes, gastos] = await Promise.all([
      supabase.from('ordenes').select('total').gte('created_at', hoy).eq('estado', 'completada'),
      supabase.from('ordenes').select('id').in('estado', ['pendiente', 'en_progreso']),
      supabase.from('clientes').select('id', { count: 'exact', head: true }),
      supabase.from('gastos').select('monto').gte('fecha', inicioMes.split('T')[0]),
    ])

    setStats({
      ingresosHoy: (ordenesHoy.data || []).reduce((sum, o) => sum + (o.total || 0), 0),
      ordenesActivas: (ordenesActivas.data || []).length,
      totalClientes: clientes.count || 0,
      gastosMes: (gastos.data || []).reduce((sum, g) => sum + (g.monto || 0), 0),
    })
  }

  async function fetchUltimasOrdenes() {
    const { data } = await supabase
      .from('ordenes')
      .select('*, clientes(nombre), vehiculos(patente, marca)')
      .order('created_at', { ascending: false })
      .limit(5)
    setUltimasOrdenes(data || [])
  }

  async function fetchIngresosSemana() {
    const dias = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dias.push(d.toISOString().split('T')[0])
    }

    const { data } = await supabase
      .from('ordenes')
      .select('total, created_at')
      .eq('estado', 'completada')
      .gte('created_at', dias[0])

    const ingresosPorDia = dias.map(dia => {
      const diaStr = dia
      const ingresos = (data || [])
        .filter(o => o.created_at?.startsWith(diaStr))
        .reduce((sum, o) => sum + (o.total || 0), 0)
      return { dia: diaStr, ingresos }
    })
    setIngresosSemana(ingresosPorDia)
  }

  const maxIngreso = Math.max(...ingresosSemana.map(d => d.ingresos), 1)

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <StatsCard icon="💵" label="Ingresos Hoy" value={formatCurrency(stats.ingresosHoy)} color="#22c55e" />
        <StatsCard icon="🧾" label="Órdenes Activas" value={stats.ordenesActivas} color="#f59e0b" />
        <StatsCard icon="👤" label="Total Clientes" value={stats.totalClientes} color="#3b82f6" />
        <StatsCard icon="💸" label="Gastos del Mes" value={formatCurrency(stats.gastosMes)} color="#ef4444" />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-chart glass">
          <h3>Ingresos - Últimos 7 días</h3>
          <div className="chart-bars">
            {ingresosSemana.map((d, i) => (
              <div key={i} className="chart-bar-col">
                <span className="chart-value">{d.ingresos > 0 ? formatCurrency(d.ingresos) : ''}</span>
                <div className="chart-bar" style={{ height: `${(d.ingresos / maxIngreso) * 100}%` }} />
                <span className="chart-label">{new Date(d.dia).toLocaleDateString('es-AR', { weekday: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-ordenes glass">
          <div className="dashboard-ordenes-header">
            <h3>Últimas Órdenes</h3>
            <Link to="/panel/ordenes" className="btn-link">Ver todas →</Link>
          </div>
          <div className="ordenes-list">
            {ultimasOrdenes.length === 0 && <p className="empty-text">No hay órdenes aún</p>}
            {ultimasOrdenes.map(o => (
              <div key={o.id} className="orden-item">
                <div>
                  <strong>{o.clientes?.nombre || 'Sin cliente'}</strong>
                  <span className="orden-vehiculo">{o.vehiculos?.marca} {o.vehiculos?.patente}</span>
                </div>
                <div className="orden-item-right">
                  <Badge estado={o.estado} />
                  <span className="orden-fecha">{formatDate(o.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link to="/panel/ordenes" className="btn-primary dashboard-nueva-orden">+ Nueva Orden</Link>
    </div>
  )
}
