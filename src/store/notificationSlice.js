import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  permission: 'default', // 'default', 'granted', 'denied'
  notificationEnabled: false,
  notifications: [],
  showModal: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPermission: (state, action) => {
      state.permission = action.payload
    },
    setNotificationEnabled: (state, action) => {
      state.notificationEnabled = action.payload
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notif => notif.id !== action.payload
      )
    },
  },
})

export const {
  setPermission,
  setNotificationEnabled,
  setShowModal,
  addNotification,
  removeNotification,
} = notificationSlice.actions

export default notificationSlice.reducer
