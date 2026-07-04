import { useState } from 'react'
import { useSelector } from 'react-redux'
import { programLibrary } from '../utils/programLibrary'
import '../styles/PatientDashboard.css'

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedProgram, setSelectedProgram] = useState(null)
  const { patientData } = useSelector(state => state.auth)

  return (
    <div className="patient-dashboard">
      <div className="patient-sidebar">
        <div className="sidebar-header">
          <h2>My Account</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveTab('programs')}
          >
            💊 Programs
          </button>
          <button
            className={`nav-item ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            🎁 Offers
          </button>
          <button
            className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            📅 Appointments
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
        </nav>
      </div>

      <div className="patient-main">
        <div className="patient-header">
          <h1>Welcome to Your Treatment Journey</h1>
        </div>

        <div className="patient-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>Your Progress</h2>
              <div className="progress-cards">
                <div className="progress-card">
                  <h3>Current Program</h3>
                  <p className="program-name">Not Selected</p>
                  <p className="progress-info">Select a program to begin</p>
                </div>
                <div className="progress-card">
                  <h3>Sessions Completed</h3>
                  <p className="stat-number">0 / 3</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="progress-card">
                  <h3>Next Appointment</h3>
                  <p className="appointment-info">To be scheduled</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="tab-content">
              <h2>Available Programs</h2>
              <p className="section-desc">Explore our range of treatment programs</p>
              <div className="programs-grid">
                {programLibrary.map((program) => (
                  <div key={program.id} className="program-card">
                    <div className="program-icon">{program.icon}</div>
                    <h3>{program.name}</h3>
                    <p className="program-tagline">{program.tagline}</p>
                    <p className="program-brief">{program.brief}</p>
                    <div className="indications">
                      <p className="indications-title">Suitable for:</p>
                      <ul>
                        {program.indications.map((indication, idx) => (
                          <li key={idx}>✓ {indication}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="select-program-btn"
                      onClick={() => setSelectedProgram(program)}
                    >
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="tab-content">
              <h2>Clinic Offers & Promotions</h2>
              <p className="section-desc">Special offers from your clinic</p>
              <div className="offers-list">
                <p className="empty-state">No active offers at the moment</p>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="tab-content">
              <h2>Your Appointments</h2>
              <div className="appointments-list">
                <p className="empty-state">No appointments scheduled yet</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Your Profile</h2>
              <div className="profile-info">
                <div className="info-group">
                  <label>Name</label>
                  <p>{patientData?.firstName} {patientData?.lastName}</p>
                </div>
                <div className="info-group">
                  <label>Email</label>
                  <p>{patientData?.email}</p>
                </div>
                <div className="info-group">
                  <label>Phone</label>
                  <p>{patientData?.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedProgram && (
        <div className="program-modal-overlay" onClick={() => setSelectedProgram(null)}>
          <div className="program-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProgram(null)}>✕</button>
            <div className="program-icon-large">{selectedProgram.icon}</div>
            <h2>{selectedProgram.name}</h2>
            <p className="program-tagline">{selectedProgram.tagline}</p>
            <p className="program-brief">{selectedProgram.brief}</p>
            <div className="indications">
              <h3>Indications</h3>
              <ul>
                {selectedProgram.indications.map((indication, idx) => (
                  <li key={idx}>✓ {indication}</li>
                ))}
              </ul>
            </div>
            <button className="book-btn">📅 Book Program</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientDashboard
