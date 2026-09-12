-- ============================================
-- GARAGE DETAILING - Esquema de Base de Datos
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Tabla de perfiles (extends auth.users)
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nombre TEXT NOT NULL,
  rol TEXT DEFAULT 'empleado' CHECK (rol IN ('admin', 'gerente', 'empleado')),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  telefono TEXT,
  email TEXT,
  direccion TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patente TEXT NOT NULL,
  marca TEXT,
  modelo TEXT,
  color TEXT,
  tamano TEXT DEFAULT 'mediano' CHECK (tamano IN ('pequeno', 'mediano', 'grande')),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Servicios
CREATE TABLE IF NOT EXISTS servicios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio INTEGER NOT NULL,
  duracion_min INTEGER,
  categoria TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Órdenes de lavado
CREATE TABLE IF NOT EXISTS ordenes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id),
  vehiculo_id UUID REFERENCES vehiculos(id),
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_progreso', 'completada', 'entregada')),
  metodo_pago TEXT CHECK (metodo_pago IN ('efectivo', 'transferencia', 'tarjeta')),
  total INTEGER DEFAULT 0,
  empleado_id UUID REFERENCES perfiles(id),
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completada_at TIMESTAMPTZ
);

-- Detalle de servicios por orden
CREATE TABLE IF NOT EXISTS orden_servicios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  orden_id UUID REFERENCES ordenes(id) ON DELETE CASCADE,
  servicio_id UUID REFERENCES servicios(id),
  precio INTEGER NOT NULL
);

-- Gastos
CREATE TABLE IF NOT EXISTS gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descripcion TEXT NOT NULL,
  monto INTEGER NOT NULL,
  categoria TEXT DEFAULT 'otros' CHECK (categoria IN ('alquiler', 'productos', 'servicios', 'sueldos', 'impuestos', 'otros')),
  fecha DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orden_servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Políticas: usuarios autenticados pueden leer todo
CREATE POLICY "Authenticated read perfiles" ON perfiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all perfiles" ON perfiles FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read clientes" ON clientes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all clientes" ON clientes FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read vehiculos" ON vehiculos FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all vehiculos" ON vehiculos FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read servicios" ON servicios FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all servicios" ON servicios FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read ordenes" ON ordenes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all ordenes" ON ordenes FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read orden_servicios" ON orden_servicios FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all orden_servicios" ON orden_servicios FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read gastos" ON gastos FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated all gastos" ON gastos FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SERVICIOS INICIALES
-- ============================================

INSERT INTO servicios (nombre, descripcion, precio, duracion_min, categoria) VALUES
('Lavado Básico', 'Lavado exterior con espuma activa, enjuague a presión, secado con microfibra y aspirado interior.', 8000, 40, 'lavado'),
('Lavado Premium', 'Lavado completo con descontaminación de pintura, limpieza profunda de interior y acondicionamiento.', 14000, 60, 'lavado'),
('Detallado Interior', 'Limpieza profunda de tapizados, cuero, plásticos, vidrios y eliminación de olores.', 18000, 120, 'detailing'),
('Pulido de Pintura', 'Corrección de laca para eliminar rayones superficiales, marcas de agua y opacidad.', 25000, 180, 'pulido'),
('Protección Cerámica', 'Aplicación de recubrimiento cerámico para protección duradera contra rayos UV y suciedad.', 45000, 240, 'proteccion'),
('Full Detailing', 'Servicio completo: exterior + interior + pulido + cera de protección.', 55000, 360, 'premium');
