// API Middleware for request/response handling
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
      window.location.href = '/'
    }
    if (error.response?.status === 403) {
      // Forbidden - redirect to appropriate dashboard
      const role = localStorage.getItem('userRole')
      if (role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else if (role === 'clinic') {
        window.location.href = '/clinic/dashboard'
      } else {
        window.location.href = '/patient/dashboard'
      }
    }
    return Promise.reject(error)
  }
)

export default api
