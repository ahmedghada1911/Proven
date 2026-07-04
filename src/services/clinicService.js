import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const clinicService = {
  // Get clinic profile
  getClinicProfile: async (clinicId) => {
    try {
      const response = await axios.get(`${API_URL}/clinic/${clinicId}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch clinic profile' }
    }
  },

  // Update clinic profile
  updateClinicProfile: async (clinicId, profileData) => {
    try {
      const response = await axios.put(`${API_URL}/clinic/${clinicId}/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update clinic profile' }
    }
  },

  // Upload clinic logo
  uploadClinicLogo: async (clinicId, file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post(`${API_URL}/clinic/${clinicId}/logo`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload logo' }
    }
  },

  // Get clinic offers
  getOffers: async (clinicId) => {
    try {
      const response = await axios.get(`${API_URL}/clinic/${clinicId}/offers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch offers' }
    }
  },

  // Create offer
  createOffer: async (clinicId, offerData) => {
    try {
      const response = await axios.post(`${API_URL}/clinic/${clinicId}/offers`, offerData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create offer' }
    }
  },

  // Delete offer
  deleteOffer: async (clinicId, offerId) => {
    try {
      const response = await axios.delete(`${API_URL}/clinic/${clinicId}/offers/${offerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete offer' }
    }
  },
}

export default clinicService
