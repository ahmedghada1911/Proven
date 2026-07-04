import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const patientService = {
  // Get patient dashboard
  getPatientDashboard: async (patientId) => {
    try {
      const response = await axios.get(`${API_URL}/patient/${patientId}/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard' }
    }
  },

  // Get patient clinic offers
  getClinicOffers: async (patientId, clinicId) => {
    try {
      const response = await axios.get(
        `${API_URL}/patient/${patientId}/clinic/${clinicId}/offers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch offers' }
    }
  },

  // Book appointment
  bookAppointment: async (patientId, appointmentData) => {
    try {
      const response = await axios.post(
        `${API_URL}/patient/${patientId}/appointment`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to book appointment' }
    }
  },
}

export default patientService
