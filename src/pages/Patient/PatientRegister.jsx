import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import DualLogoHeader from '../components/DualLogoHeader'
import authService from '../services/authService'
import '../styles/PatientRegister.css'

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clinicData, setClinicData] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const clinicId = searchParams.get('clinic')
  const productId = searchParams.get('product')

  useEffect(() => {
    // Fetch clinic data for dual logo display
    if (clinicId) {
      // TODO: Fetch clinic data from API
      setClinicData({
        id: clinicId,
        name: 'Sample Clinic',
        logo: '/assets/clinic-logo.png',
      })
    }
  }, [clinicId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!clinicId || !productId) {
      setError('Invalid registration link')
      setLoading(false)
      return
    }

    try {
      const response = await authService.patientRegister(
        clinicId,
        productId,
        formData
      )
      dispatch(
        loginSuccess({
          user: response.patient,
          token: response.token,
          role: 'patient',
          patientData: response.patient,
        })
      )
      navigate('/patient/dashboard')
    } catch (err) {
      const errorMessage = err.message || 'Registration failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!clinicId || !productId) {
    return (
      <div className="patient-register-container">
        <div className="error-box">
          <p>❌ Invalid Registration Link</p>
          <p>Please use the link provided by your clinic.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="patient-register-container">
      <DualLogoHeader
        clinicLogo={clinicData?.logo}
        clinicName={clinicData?.name || 'Your Clinic'}
      />

      <div className="register-box">
        <h2>Welcome to Proven Treatment Program</h2>
        <p>Complete your registration to get started</p>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>

        <p className="register-terms">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default PatientRegister
