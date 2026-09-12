import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import SobreNosotros from '../components/landing/SobreNosotros'
import Servicios from '../components/landing/Servicios'
import Galeria from '../components/landing/Galeria'
import Testimonios from '../components/landing/Testimonios'
import Reserva from '../components/landing/Reserva'
import FAQ from '../components/landing/FAQ'
import Footer from '../components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <SobreNosotros />
      <Servicios />
      <Galeria />
      <Testimonios />
      <Reserva />
      <FAQ />
      <Footer />
    </div>
  )
}
