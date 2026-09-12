import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useServicios() {
  const [servicios, setServicios] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchServicios = async () => {
    setLoading(true)
    const { data } = await supabase.from('servicios').select('*').order('precio')
    setServicios(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchServicios() }, [])

  const crearServicio = async (servicio) => {
    const { data, error } = await supabase.from('servicios').insert(servicio).select().single()
    if (error) throw error
    setServicios(prev => [...prev, data])
    return data
  }

  const actualizarServicio = async (id, updates) => {
    const { data, error } = await supabase.from('servicios').update(updates).eq('id', id).select().single()
    if (error) throw error
    setServicios(prev => prev.map(s => s.id === id ? data : s))
    return data
  }

  const eliminarServicio = async (id) => {
    const { error } = await supabase.from('servicios').delete().eq('id', id)
    if (error) throw error
    setServicios(prev => prev.filter(s => s.id !== id))
  }

  return { servicios, loading, crearServicio, actualizarServicio, eliminarServicio, refetch: fetchServicios }
}
