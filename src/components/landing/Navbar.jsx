import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-nosotros', label: 'Nosotros' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#galeria', label: 'Trabajos' },
    { href: '#testimonios', label: 'Opiniones' },
    { href: '#reserva', label: 'Reservar' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contacto', label: 'Contacto' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'glass' : ''}`}>
        <div className="nav-brand">
          <img src="/logo.png" alt="Garage Detailing Logo" className="brand-logo" />
          <span className="brand-text text-gradient">GARAGE DETAILING</span>
        </div>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
          ))}
        </div>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <img src="/logo.png" alt="Logo" className="brand-logo" style={{ height: '40px' }} />
          <span className="brand-text text-gradient">GARAGE DETAILING</span>
        </div>
        {links.map(l => (
          <a key={l.href} href={l.href} className="mobile-link" onClick={e => handleNavClick(e, l.href)}>{l.label}</a>
        ))}
        <a href="https://wa.me/5493445645818" target="_blank" rel="noreferrer" className="btn-primary mobile-cta">
          Reservar por WhatsApp
        </a>
      </div>
    </>
  )
}
