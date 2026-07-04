import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const adminService = {
  // Get all clinics
  getAllClinics: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/clinics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch clinics' }
    }
  },

  // Get clinic details
  getClinicDetails: async (clinicId) => {
    try {
      const response = await axios.get(`${API_URL}/admin/clinics/${clinicId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch clinic details' }
    }
  },

  // Get audit logs
  getAuditLogs: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/admin/audit-logs`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch audit logs' }
    }
  },

  // Get system health
  getSystemHealth: async () => {
    try {
      const response = await axios.get(`${API_URL}/health`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch system health' }
    }
  },

  // Get analytics
  getAnalytics: async (timeRange = '30d') => {
    try {
      const response = await axios.get(`${API_URL}/admin/analytics`, {
        params: { timeRange },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch analytics' }
    }
  },
}

export default adminService
