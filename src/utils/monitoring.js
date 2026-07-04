/* Health Check Endpoint - Sentry Integration Ready */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const healthCheck = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`, {
      timeout: 5000,
    })
    return {
      status: 'ok',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.message,
      details: error.response?.data,
    }
  }
}

// Initialize Sentry (optional - for production)
export const initializeSentry = () => {
  // This will be configured with actual Sentry DSN in production
  if (import.meta.env.PROD) {
    // import * as Sentry from '@sentry/react'
    // Sentry.init({
    //   dsn: import.meta.env.VITE_SENTRY_DSN,
    //   environment: import.meta.env.MODE,
    // })
  }
}

// Error tracking
export const trackError = (error, context = {}) => {
  console.error('Error tracked:', error, context)
  // In production, this would send to Sentry
  if (import.meta.env.PROD) {
    // Sentry.captureException(error, { extra: context })
  }
}
