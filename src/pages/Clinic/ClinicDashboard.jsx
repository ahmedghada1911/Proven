import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout, updateClinicData } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { setShowModal } from '../store/notificationSlice'
import notificationService from '../services/notificationService'
import clinicService from '../services/clinicService'
import '../styles/ClinicDashboard.css'

const ClinicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [clinicProfile, setClinicProfile] = useState({
    name: 'Sample Clinic',
    phone: '+1-555-0000',
    whatsapp: '+1-555-0000',
    email: 'clinic@example.com',
    bio: 'Your clinic bio here',
    branches: [],
    logo: null,
  })
  const [offers, setOffers] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { user, clinicData } = useSelector(state => state.auth)
  const { showModal } = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Check notification permission on mount
  useEffect(() => {
    const permission = notificationService.getPermission()
    if (permission !== 'granted') {
      dispatch(setShowModal(true))
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/clinic/login')
  }

  const handleProfileChange = (field, value) => {
    setClinicProfile(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // TODO: Call API to save profile
      dispatch(updateClinicData(clinicProfile))
      setIsEditing(false)
      alert('Profile updated successfully')
    } catch (error) {
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoading(true)
      try {
        // TODO: Call API to upload logo
        const reader = new FileReader()
        reader.onload = (event) => {
          setClinicProfile(prev => ({
            ...prev,
            logo: event.target.result,
          }))
        }
        reader.readAsDataURL(file)
      } catch (error) {
        alert('Failed to upload logo')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="clinic-dashboard">
      <div className="clinic-sidebar">
        <div className="sidebar-header">
          <h2>Clinic Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
          <button
            className={`nav-item ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            🎁 Offers
          </button>
          <button
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            📋 Bookings
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="clinic-main">
        <div className="clinic-header">
          <h1>Clinic Dashboard</h1>
          <div className="clinic-user-info">
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="clinic-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Welcome Back!</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Patients</h3>
                  <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                  <h3>Active Sessions</h3>
                  <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                  <h3>Active Offers</h3>
                  <p className="stat-number">{offers.length}</p>
                </div>
                <div className="stat-card">
                  <h3>This Month</h3>
                  <p className="stat-number">📅 {new Date().getDate()} days</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <div className="settings-header">
                <h2>Clinic Settings</h2>
                {!isEditing && (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    ✏️ Edit Profile
                  </button>
                )}
              </div>

              <div className="settings-section">
                <h3>Logo & Branding</h3>
                <div className="logo-upload">
                  {clinicProfile.logo && (
                    <img src={clinicProfile.logo} alt="Clinic Logo" className="clinic-logo-preview" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    id="logo-input"
                    style={{ display: 'none' }}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <label htmlFor="logo-input" className="upload-label">
                      📸 Upload Logo
                    </label>
                  )}
                </div>
              </div>

              <div className="settings-form">
                <div className="form-group">
                  <label>Clinic Name</label>
                  <input
                    type="text"
                    value={clinicProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={clinicProfile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp</label>
                    <input
                      type="tel"
                      value={clinicProfile.whatsapp}
                      onChange={(e) => handleProfileChange('whatsapp', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={clinicProfile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Bio/Description</label>
                  <textarea
                    value={clinicProfile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows="4"
                  />
                </div>

                {isEditing && (
                  <div className="form-actions">
                    <button className="save-btn" onClick={handleSaveProfile} disabled={loading}>
                      💾 Save Changes
                    </button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                      ❌ Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="tab-content">
              <div className="offers-header">
                <h2>Clinic Offers</h2>
                <button className="add-btn">➕ Create Offer</button>
              </div>
              <div className="offers-list">
                {offers.length === 0 ? (
                  <p className="empty-state">No offers created yet. Create one to get started!</p>
                ) : (
                  offers.map((offer) => (
                    <div key={offer.id} className="offer-card">
                      <h3>{offer.title}</h3>
                      <p>{offer.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="tab-content">
              <h2>Patient Bookings</h2>
              <p>View and manage patient session bookings</p>
              <div className="bookings-list">
                <p className="empty-state">No bookings yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClinicDashboard
