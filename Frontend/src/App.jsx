import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Vans from './pages/Vans/Vans';
import VanDetails from './pages/Vans/VanDetails';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';

// Layouts
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';

// Host (protected) pages
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import HostVans from './pages/Host/HostVans';
import HostVanDetail from './pages/Host/HostVanDetail';
import Reviews from './pages/Host/Reviews';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NewHostVan from './pages/Host/NewHostVan';
import EditHostVan from './pages/Host/EditHostVan';

// Auth
import AuthRequired from './components/AuthRequired';
import { AuthProvider } from '../Context/AuthContext';

// Root application component
export default function App() {
  return (
    // Global auth context provider
    <AuthProvider>

      {/* Router wrapper */}
      <BrowserRouter>
        <Routes>

          {/* Main layout (shared across public + host routes) */}
          <Route path='/' element={<Layout />}>

            {/* Public routes */}
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='vans' element={<Vans />} />
            <Route path='vans/:id' element={<VanDetails />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />

            {/* Protected routes (require authentication) */}
            <Route element={<AuthRequired />}>

              {/* Host layout */}
              <Route path='host' element={<HostLayout />}>

                {/* Dashboard */}
                <Route index element={<Dashboard />} />
                {/* Host features */}
                <Route path='income' element={<Income />} />
                <Route path='reviews' element={<Reviews />} />

                {/* Vans management */}
                <Route path='vans'>

                  <Route index element={<HostVans />} />
                  {/* Create new van */}
                  <Route path='new' element={<NewHostVan />} />

                  {/* Van detail with nested tabs */}
                  <Route path=':id' element={<HostVanDetail />}>

                    <Route index element={<HostVanInfo />} />
                    <Route path='pricing' element={<HostVanPricing />} />
                    <Route path='photos' element={<HostVanPhotos />} />

                  </Route>

                  {/* Edit van */}
                  <Route path=':id/edit' element={<EditHostVan />} />
                </Route>
              </Route>
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
