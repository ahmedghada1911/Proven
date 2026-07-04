import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import GlobalHeader from './components/GlobalHeader'
import NotificationModal from './components/NotificationModal'
import { AdminRoute, ClinicRoute, PatientRoute } from './components/ProtectedRoute'
import AdminLogin from './pages/Admin/AdminLogin'
import ClinicLogin from './pages/Clinic/ClinicLogin'
import PatientRegister from './pages/Patient/PatientRegister'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalHeader />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/clinic/login" element={<ClinicLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoute><div>Admin Dashboard (Coming Soon)</div></AdminRoute>} />

          {/* Clinic Routes */}
          <Route path="/clinic/*" element={<ClinicRoute><NotificationModal /><div>Clinic Dashboard (Coming Soon)</div></ClinicRoute>} />

          {/* Patient Routes */}
          <Route path="/patient/*" element={<PatientRoute><div>Patient Dashboard (Coming Soon)</div></PatientRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
