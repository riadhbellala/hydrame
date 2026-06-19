import { useState } from 'react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Expertise from '../components/sections/Expertise'
import Methodology from '../components/sections/Methodology'
import Projects from '../components/sections/Projects'
import Environmental from '../components/sections/Environmental'
import Contact from '../components/sections/Contact'
import Intro from '../components/ui/Intro'

export default function Home() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!window.hasPlayedIntro
    }
    return false
  })

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      window.hasPlayedIntro = true
    }
    setIntroDone(true)
  }

  return (
    <main>
      {!introDone && <Intro onComplete={handleIntroComplete} />}
      <Hero />
      <About />
      <Expertise />
      <Methodology />
      <Projects />
      <Environmental />
      <Contact />
    </main>
  )
}
