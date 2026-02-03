import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Vans from './pages/Vans/Vans';
import VanDetails from './pages/Vans/VanDetails';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

import Layout from './components/Layout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import HostVans from './pages/Host/HostVans';
import HostVanDetail from './pages/Host/HostVanDetail';
import Reviews from './pages/Host/Reviews';
import HostLayout from './components/HostLayout';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import AuthRequired from './components/AuthRequired';

import { AuthProvider } from '../Context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='vans' element={<Vans />} />
            <Route path='vans/:id' element={<VanDetails />} />
            <Route path='login' element={<Login />} />



            <Route element={<AuthRequired />}>
              <Route path='host' element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='income' element={<Income />} />
                <Route path='vans' element={<HostVans />} />
                <Route path='reviews' element={<Reviews />} />
                <Route path='vans/:id' element={<HostVanDetail />}>
                  <Route index element={<HostVanInfo />} />
                  <Route path='pricing' element={<HostVanPricing />} />
                  <Route path='photos' element={<HostVanPhotos />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
