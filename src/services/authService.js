import axios from 'axios'

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3001'

const authService = {
  // Admin login
  adminLogin: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/admin/login`, {
        email,
        password,
      })
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('userRole', 'admin')
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  // Clinic login
  clinicLogin: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/clinic/login`, {
        email,
        password,
      })
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('userRole', 'clinic')
        localStorage.setItem('clinicId', response.data.clinicId)
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  // Patient registration/login via QR
  patientRegister: async (clinicId, productId, patientData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/patient/register`, {
        clinicId,
        productId,
        ...patientData,
      })
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('userRole', 'patient')
        localStorage.setItem('patientId', response.data.patientId)
      }
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('clinicId')
    localStorage.removeItem('patientId')
  },

  // Get stored token
  getToken: () => localStorage.getItem('authToken'),

  // Get user role
  getUserRole: () => localStorage.getItem('userRole'),

  // Check if authenticated
  isAuthenticated: () => !!localStorage.getItem('authToken'),
}

export default authService
