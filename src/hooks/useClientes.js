import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useClientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchClientes = async () => {
    setLoading(true)
    const { data } = await supabase.from('clientes').select('*').order('created_at', { ascending: false })
    setClientes(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchClientes() }, [])

  const crearCliente = async (cliente) => {
    const { data, error } = await supabase.from('clientes').insert(cliente).select().single()
    if (error) throw error
    setClientes(prev => [data, ...prev])
    return data
  }

  const actualizarCliente = async (id, updates) => {
    const { data, error } = await supabase.from('clientes').update(updates).eq('id', id).select().single()
    if (error) throw error
    setClientes(prev => prev.map(c => c.id === id ? data : c))
    return data
  }

  const eliminarCliente = async (id) => {
    const { error } = await supabase.from('clientes').delete().eq('id', id)
    if (error) throw error
    setClientes(prev => prev.filter(c => c.id !== id))
  }

  return { clientes, loading, crearCliente, actualizarCliente, eliminarCliente, refetch: fetchClientes }
}
