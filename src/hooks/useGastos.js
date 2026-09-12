import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useGastos() {
  const [gastos, setGastos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchGastos = async () => {
    setLoading(true)
    const { data } = await supabase.from('gastos').select('*').order('fecha', { ascending: false })
    setGastos(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchGastos() }, [])

  const crearGasto = async (gasto) => {
    const { data, error } = await supabase.from('gastos').insert(gasto).select().single()
    if (error) throw error
    setGastos(prev => [data, ...prev])
    return data
  }

  const eliminarGasto = async (id) => {
    const { error } = await supabase.from('gastos').delete().eq('id', id)
    if (error) throw error
    setGastos(prev => prev.filter(g => g.id !== id))
  }

  return { gastos, loading, crearGasto, eliminarGasto, refetch: fetchGastos }
}
