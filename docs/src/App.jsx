import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GettingStarted from './pages/GettingStarted'
import Commands from './pages/Commands'
import Components from './pages/Components'
import Helpers from './pages/Helpers'
import Models from './pages/Models'
import Controllers from './pages/Controllers'
import Services from './pages/Services'
import Repositories from './pages/Repositories'
import Middleware from './pages/Middleware'
import Utils from './pages/Utils'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/commands" element={<Commands />} />
        <Route path="/components" element={<Components />} />
        <Route path="/helpers" element={<Helpers />} />
        <Route path="/models" element={<Models />} />
        <Route path="/controllers" element={<Controllers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/middleware" element={<Middleware />} />
        <Route path="/utils" element={<Utils />} />
      </Routes>
    </Layout>
  )
}

export default App
