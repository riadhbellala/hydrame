import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-ink-950" style={{ fontFamily: 'var(--font-body)' }}>
        <Navbar />
        
        {/* Main Content wrapper - sits above the footer to enable the parallax reveal */}
        <div className="flex-grow relative z-10 bg-[#f8f8f6] shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-b-[2rem] md:rounded-b-[4rem]" style={{ overflowX: 'clip' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  )
}
