import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import ScrollToTop from './components/ui/ScrollToTop'
import Login from './pages/admin/Login'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ProjectForm from './pages/admin/ProjectForm'
import Demands from './pages/admin/Demands'
import { Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f6]" style={{ fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <div className="flex-grow relative z-10 bg-[#f8f8f6] shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-b-[2rem] md:rounded-b-[4rem]" style={{ overflowX: 'clip' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Route>
        
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="demands" element={<Demands />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
