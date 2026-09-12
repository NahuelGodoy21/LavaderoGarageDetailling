import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVehiculos = async () => {
    setLoading(true)
    const { data } = await supabase.from('vehiculos').select('*, clientes(nombre)').order('created_at', { ascending: false })
    setVehiculos(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchVehiculos() }, [])

  const crearVehiculo = async (vehiculo) => {
    const { data, error } = await supabase.from('vehiculos').insert(vehiculo).select('*, clientes(nombre)').single()
    if (error) throw error
    setVehiculos(prev => [data, ...prev])
    return data
  }

  const actualizarVehiculo = async (id, updates) => {
    const { data, error } = await supabase.from('vehiculos').update(updates).eq('id', id).select('*, clientes(nombre)').single()
    if (error) throw error
    setVehiculos(prev => prev.map(v => v.id === id ? data : v))
    return data
  }

  const eliminarVehiculo = async (id) => {
    const { error } = await supabase.from('vehiculos').delete().eq('id', id)
    if (error) throw error
    setVehiculos(prev => prev.filter(v => v.id !== id))
  }

  return { vehiculos, loading, crearVehiculo, actualizarVehiculo, eliminarVehiculo, refetch: fetchVehiculos }
}
