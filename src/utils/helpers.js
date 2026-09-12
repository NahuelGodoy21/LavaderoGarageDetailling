export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getEstadoColor(estado) {
  const colors = {
    pendiente: '#f59e0b',
    en_progreso: '#3b82f6',
    completada: '#22c55e',
    entregada: '#a855f7',
  }
  return colors[estado] || '#6b7280'
}

export function getEstadoLabel(estado) {
  const labels = {
    pendiente: 'Pendiente',
    en_progreso: 'En Progreso',
    completada: 'Completada',
    entregada: 'Entregada',
  }
  return labels[estado] || estado
}

export function getTamanoLabel(tamano) {
  const labels = { pequeno: 'Pequeño', mediano: 'Mediano', grande: 'Grande' }
  return labels[tamano] || tamano
}

export const CATEGORIAS_GASTO = [
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'productos', label: 'Productos' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'sueldos', label: 'Sueldos' },
  { value: 'impuestos', label: 'Impuestos' },
  { value: 'otros', label: 'Otros' },
]

export const METODOS_PAGO = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'tarjeta', label: 'Tarjeta' },
]
