import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useSelector, useEffect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { store } from './store'
import GlobalHeader from './components/GlobalHeader'
import NotificationModal from './components/NotificationModal'
import { AdminRoute, ClinicRoute, PatientRoute } from './components/ProtectedRoute'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ClinicLogin from './pages/Clinic/ClinicLogin'
import ClinicDashboard from './pages/Clinic/ClinicDashboard'
import PatientRegister from './pages/Patient/PatientRegister'
import PatientDashboard from './pages/Patient/PatientDashboard'
import Home from './pages/Home'
import notificationService from './services/notificationService'
import './App.css'

function AppRoutes() {
  const { isAuthenticated, role } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // Initialize notifications on mount
  useEffect(() => {
    if (notificationService.isSupported()) {
      notificationService.registerServiceWorker().catch(err => {
        console.warn('Service Worker registration failed:', err)
      })
    }
  }, [])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/clinic/login" element={<ClinicLogin />} />
      <Route path="/patient/register" element={<PatientRegister />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Clinic Routes */}
      <Route
        path="/clinic/dashboard"
        element={
          <ClinicRoute>
            <NotificationModal />
            <ClinicDashboard />
          </ClinicRoute>
        }
      />

      {/* Patient Routes */}
      <Route
        path="/patient/dashboard"
        element={
          <PatientRoute>
            <PatientDashboard />
          </PatientRoute>
        }
      />

      {/* Redirect authenticated users away from login pages */}
      {isAuthenticated && role === 'admin' && (
        <Route path="/admin/login" element={<Navigate to="/admin/dashboard" replace />} />
      )}
      {isAuthenticated && role === 'clinic' && (
        <Route path="/clinic/login" element={<Navigate to="/clinic/dashboard" replace />} />
      )}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalHeader />
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
