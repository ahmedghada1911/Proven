import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, loginFailure } from '../store/authSlice'
import authService from '../services/authService'
import '../styles/ClinicLogin.css'

const ClinicLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.clinicLogin(email, password)
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
          role: 'clinic',
          clinicData: response.clinic,
        })
      )
      navigate('/clinic/dashboard')
    } catch (err) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      dispatch(loginFailure(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="clinic-login-container">
      <div className="clinic-login-box">
        <div className="clinic-login-header">
          <img src="/assets/proven-logo.png" alt="Proven" className="login-logo" />
          <h1>Clinic Portal</h1>
          <p>Manage Your Clinic Operations</p>
        </div>

        <form onSubmit={handleSubmit} className="clinic-login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Clinic Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="clinic@healthcare.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Access your clinic dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default ClinicLogin
