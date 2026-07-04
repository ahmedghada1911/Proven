// Notification Service for Web Push API

export const notificationService = {
  // Check if browser supports notifications
  isSupported: () => {
    return 'Notification' in window && 'serviceWorker' in navigator
  },

  // Request notification permission
  requestPermission: async () => {
    if (!this.isSupported()) {
      console.warn('Notifications not supported')
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission
    }

    return Notification.permission
  },

  // Get current permission status
  getPermission: () => {
    if (!this.isSupported()) return 'denied'
    return Notification.permission || 'default'
  },

  // Register service worker
  registerServiceWorker: async () => {
    if (!this.isSupported()) return null

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })
      console.log('Service Worker registered:', registration)
      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return null
    }
  },

  // Send notification via service worker
  sendNotification: async (title, options = {}) => {
    if (!this.isSupported() || Notification.permission !== 'granted') {
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready
      registration.showNotification(title, {
        badge: '/assets/proven-logo.png',
        icon: '/assets/proven-logo.png',
        ...options,
      })
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  },

  // Subscribe to push notifications
  subscribeToPushNotifications: async (vapidPublicKey) => {
    if (!this.isSupported()) return null

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
      })
      return subscription
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      return null
    }
  },

  // Helper to convert VAPID key
  urlBase64ToUint8Array: (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  },
}

export default notificationService
