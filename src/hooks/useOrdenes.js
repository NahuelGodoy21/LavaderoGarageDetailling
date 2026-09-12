import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useOrdenes() {
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrdenes = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('ordenes')
      .select('*, clientes(nombre, telefono), vehiculos(patente, marca, modelo), perfiles(nombre)')
      .order('created_at', { ascending: false })
    setOrdenes(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchOrdenes() }, [])

  const crearOrden = async (orden, servicios) => {
    const { data: ordenData, error } = await supabase.from('ordenes').insert(orden).select().single()
    if (error) throw error

    if (servicios?.length) {
      const ordenServicios = servicios.map(s => ({
        orden_id: ordenData.id,
        servicio_id: s.id,
        precio: s.precio,
      }))
      const { error: osError } = await supabase.from('orden_servicios').insert(ordenServicios)
      if (osError) throw osError
    }

    await fetchOrdenes()
    return ordenData
  }

  const actualizarEstado = async (id, estado, metodo_pago = null) => {
    const updates = { estado }
    if (metodo_pago) updates.metodo_pago = metodo_pago
    if (estado === 'completada') updates.completada_at = new Date().toISOString()

    const { error } = await supabase.from('ordenes').update(updates).eq('id', id)
    if (error) throw error
    await fetchOrdenes()
  }

  const eliminarOrden = async (id) => {
    const { error } = await supabase.from('ordenes').delete().eq('id', id)
    if (error) throw error
    setOrdenes(prev => prev.filter(o => o.id !== id))
  }

  return { ordenes, loading, crearOrden, actualizarEstado, eliminarOrden, refetch: fetchOrdenes }
}
