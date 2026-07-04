import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowModal } from '../store/notificationSlice'
import notificationService from '../services/notificationService'
import '../styles/NotificationModal.css'

const NotificationModal = () => {
  const dispatch = useDispatch()
  const { showModal } = useSelector(state => state.notification)

  useEffect(() => {
    const permission = notificationService.getPermission()
    if (permission !== 'granted' && notificationService.isSupported()) {
      dispatch(setShowModal(true))
    }
  }, [])

  const handleEnableNotifications = async () => {
    try {
      const permission = await notificationService.requestPermission()
      if (permission === 'granted') {
        await notificationService.registerServiceWorker()
        dispatch(setShowModal(false))
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error)
    }
  }

  if (!showModal) return null

  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <h2>🔔 Activate Critical Notifications</h2>
        <p>Stay updated with important alerts about your clinic operations</p>

        <div className="instruction-graphic">
          <div className="browser-mockup">
            <div className="browser-bar">
              <span className="lock-icon">🔒</span>
              <span className="address-text">proven.clinic.com</span>
              <span className="bell-icon">🔔</span>
            </div>
            <p className="instruction-text">Click the 🔔 icon and select 'Allow'</p>
          </div>
        </div>

        <button
          className="enable-notifications-btn"
          onClick={handleEnableNotifications}
        >
          Enable Notifications Now
        </button>

        <p className="notification-info">
          You won't be able to access your dashboard until notifications are enabled.
        </p>
      </div>
    </div>
  )
}

export default NotificationModal
