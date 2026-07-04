import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clinics: [],
  currentClinic: null,
  offers: [],
  loading: false,
  error: null,
}

const clinicSlice = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    setCurrentClinic: (state, action) => {
      state.currentClinic = action.payload
    },
    updateClinicProfile: (state, action) => {
      if (state.currentClinic) {
        state.currentClinic = { ...state.currentClinic, ...action.payload }
      }
    },
    setOffers: (state, action) => {
      state.offers = action.payload
    },
    addOffer: (state, action) => {
      state.offers.push(action.payload)
    },
    deleteOffer: (state, action) => {
      state.offers = state.offers.filter(offer => offer.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  setCurrentClinic,
  updateClinicProfile,
  setOffers,
  addOffer,
  deleteOffer,
  setLoading,
  setError,
} = clinicSlice.actions

export default clinicSlice.reducer
