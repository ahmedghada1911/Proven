import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    } else if (role === 'clinic') {
      return <Navigate to="/clinic/dashboard" replace />
    } else if (role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return children
}

export const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
)

export const ClinicRoute = ({ children }) => (
  <ProtectedRoute requiredRole="clinic">{children}</ProtectedRoute>
)

export const PatientRoute = ({ children }) => (
  <ProtectedRoute requiredRole="patient">{children}</ProtectedRoute>
)
