import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`nav-item ${activeTab === 'clinics' ? 'active' : ''}`}
            onClick={() => setActiveTab('clinics')}
          >
            🏥 Clinics
          </button>
          <button
            className={`nav-item ${activeTab === 'audits' ? 'active' : ''}`}
            onClick={() => setActiveTab('audits')}
          >
            📋 Audit Logs
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>System Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Clinics</h3>
                  <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                  <h3>Active Patients</h3>
                  <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                  <h3>Offers Published</h3>
                  <p className="stat-number">0</p>
                </div>
                <div className="stat-card">
                  <h3>System Health</h3>
                  <p className="stat-number">✅ Healthy</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clinics' && (
            <div className="tab-content">
              <h2>Clinic Management</h2>
              <p>Manage all registered clinics and their onboarding status</p>
              <div className="clinics-list">
                <p className="empty-state">No clinics registered yet</p>
              </div>
            </div>
          )}

          {activeTab === 'audits' && (
            <div className="tab-content">
              <h2>Audit Logs</h2>
              <p>Track all clinic profile changes and system activities</p>
              <div className="audit-logs">
                <p className="empty-state">No audit logs yet</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>System Settings</h2>
              <div className="settings-form">
                <div className="setting-group">
                  <label>System Name</label>
                  <input type="text" value="Proven Platform" disabled />
                </div>
                <div className="setting-group">
                  <label>Support Email</label>
                  <input type="email" value="support@proven.com" disabled />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
