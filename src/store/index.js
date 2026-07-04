import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import clinicReducer from './clinicSlice'
import notificationReducer from './notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clinic: clinicReducer,
    notification: notificationReducer,
  },
})
