import { useState } from 'react'
import './index.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Expertise from './components/sections/Expertise'
import Methodology from './components/sections/Methodology'
import Projects from './components/sections/Projects'
import Environmental from './components/sections/Environmental'
import Contact from './components/sections/Contact'
import Intro from './components/ui/Intro'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-body)', backgroundColor: '#f8f8f6' }}>
      {/* Intro sequence handles its own unmount */}
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Methodology />
        <Projects />
        <Environmental />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
