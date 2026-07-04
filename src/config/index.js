// Environment variables configuration

export const config = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  
  // App Configuration
  APP_NAME: 'Proven',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  FEATURES: {
    NOTIFICATIONS: true,
    ANALYTICS: true,
    AUDIT_LOGS: true,
  },
  
  // Role-based configuration
  ROLES: {
    ADMIN: 'admin',
    CLINIC: 'clinic',
    PATIENT: 'patient',
  },
  
  // Routes configuration
  ROUTES: {
    ADMIN: '/admin',
    CLINIC: '/clinic',
    PATIENT: '/patient',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
  },
  
  // Notification configuration
  NOTIFICATIONS: {
    PERMISSION_TIMEOUT: 5000, // 5 seconds
    CHECK_INTERVAL: 30000, // 30 seconds
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
}

export default config
