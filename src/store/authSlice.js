import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  role: null, // 'admin', 'clinic', 'patient'
  isAuthenticated: false,
  clinicData: null,
  patientData: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      const { user, token, role, clinicData, patientData } = action.payload
      state.user = user
      state.token = token
      state.role = role
      state.isAuthenticated = true
      state.clinicData = clinicData
      state.patientData = patientData
      state.loading = false
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      state.isAuthenticated = false
      state.clinicData = null
      state.patientData = null
      state.error = null
    },
    updateClinicData: (state, action) => {
      state.clinicData = action.payload
    },
    updatePatientData: (state, action) => {
      state.patientData = action.payload
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateClinicData,
  updatePatientData,
} = authSlice.actions

export default authSlice.reducer
