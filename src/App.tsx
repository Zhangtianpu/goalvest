import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Landing from '@/pages/Landing'
import Finance from '@/pages/Finance'
import Allocation from '@/pages/Allocation'
import Projection from '@/pages/Projection'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'
import About from '@/pages/About'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/finance" element={<Finance />} />
              <Route path="/allocation" element={<Allocation />} />
              <Route path="/projection" element={<Projection />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}
