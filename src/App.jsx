import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 1,
      title: "Lavado y Aspirado Completo",
      desc: "Limpieza profunda con los mejores productos para dejar tu auto impecable por dentro y por fuera.",
      icon: "💎",
      price: "Consultar"
    },
    {
      id: 2,
      title: "Detallado Vehicular",
      desc: "Atención meticulosa a cada rincón, limpieza de tapizados, plásticos y acondicionamiento interior y exterior.",
      icon: "💎",
      price: "Consultar"
    },
    {
      id: 3,
      title: "Pulidos y Tratamientos",
      desc: "Corrección de laca, eliminación de rayas y aplicación de tratamientos para máximo brillo y protección.",
      icon: "💥",
      price: "Consultar"
    }
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'glass' : ''}`}>
        <div className="nav-brand">
          <img src="/logo.png" alt="Garage Detailing Logo" className="brand-logo" />
          <span className="brand-text text-gradient">GARAGE DETAILING</span>
        </div>
        <div className="nav-links">
          <a href="#inicio" className="nav-link">Inicio</a>
          <a href="#servicios" className="nav-link">Servicios</a>
          <a href="#galeria" className="nav-link">Trabajos</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <span className="hero-subtitle text-neon-green">EXCELENCIA AUTOMOTRIZ</span>
          <h1 className="hero-title">
            <span className="text-gradient">ELEVANDO EL ESTÁNDAR</span>
            <span className="text-gradient">DE TU VEHÍCULO</span>
          </h1>
          <p className="hero-description">
            Cuidado profesional y al detalle para aquellos que exigen lo mejor. Descubre la verdadera belleza de tu auto.
          </p>
          <div className="hero-cta">
            <a href="https://wa.me/5493445645818" target="_blank" rel="noreferrer" className="btn-primary">
              Reservar Turno
            </a>
            <a href="https://www.instagram.com/garage__detailing_/" target="_blank" rel="noreferrer" className="btn-outline">
              Ver Trabajos
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services-section">
        <div className="section-header">
          <h2 className="section-title text-gradient">NUESTROS SERVICIOS</h2>
          <p className="section-subtitle">Calidad inigualable en cada detalle</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card glass">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contacto" className="footer-section">
        <div className="footer-content">
          <div className="footer-col">
            <div className="nav-brand" style={{ marginBottom: '1.5rem' }}>
              <img src="/logo.png" alt="Garage Detailing Logo" className="brand-logo" style={{ height: '40px' }} />
              <span className="brand-text text-gradient">GARAGE DETAILING</span>
            </div>
            <p>Especialistas en estética vehicular.</p>
            <p>📍 Rosario del Tala</p>
            <p>Dueño: <a href="https://www.instagram.com/briangodoy954/" target="_blank" rel="noreferrer" style={{display: 'inline', color: 'var(--color-primary)'}}>@briangodoy954</a></p>
          </div>
          <div className="footer-col">
            <h4 className="text-neon-pink">Contacto</h4>
            <a href="https://wa.me/5493445645818" target="_blank" rel="noreferrer">📱 WhatsApp: 3445-645818</a>
            <a href="https://www.instagram.com/garage__detailing_/" target="_blank" rel="noreferrer">📸 Instagram Oficial</a>
          </div>
          <div className="footer-col">
            <h4 className="text-neon-pink">Horarios</h4>
            <p>Lunes a Sábado</p>
            <p>09:00 - 18:00</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Garage Detailing. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
