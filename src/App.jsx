import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/panel/Dashboard'
import Clientes from './pages/panel/Clientes'
import Vehiculos from './pages/panel/Vehiculos'
import Ordenes from './pages/panel/Ordenes'
import Servicios from './pages/panel/Servicios'
import Gastos from './pages/panel/Gastos'
import Empleados from './pages/panel/Empleados'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>
  if (user) return <Navigate to="/panel" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/panel" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="vehiculos" element={<Vehiculos />} />
        <Route path="ordenes" element={<Ordenes />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="empleados" element={<Empleados />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
