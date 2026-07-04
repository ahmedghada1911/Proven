import { useState } from 'react'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <img src="/assets/proven-logo.png" alt="Proven" className="hero-logo" />
          <h1>Proven Treatment Platform</h1>
          <p>Professional aesthetic and wellness treatment management system</p>
          <div className="hero-buttons">
            <a href="/admin/login" className="btn btn-primary">Admin Portal</a>
            <a href="/clinic/login" className="btn btn-secondary">Clinic Login</a>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🏥 Clinic Management</h3>
            <p>Complete control over clinic profile, branding, and patient offers</p>
          </div>
          <div className="feature-card">
            <h3>👥 Patient Tracking</h3>
            <p>Track patient progress through treatment programs seamlessly</p>
          </div>
          <div className="feature-card">
            <h3>🔔 Smart Notifications</h3>
            <p>Real-time push notifications for bookings and clinic updates</p>
          </div>
          <div className="feature-card">
            <h3>💼 Treatment Programs</h3>
            <p>Five specialized programs: Hair, Skin, Revitalize, Revive, and Pink Secret</p>
          </div>
          <div className="feature-card">
            <h3>📊 Analytics</h3>
            <p>Comprehensive system monitoring and audit logs</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Secure Access</h3>
            <p>Role-based authentication for Admin, Clinic, and Patient portals</p>
          </div>
        </div>
      </section>

      <section className="programs-preview">
        <h2>Our Treatment Programs</h2>
        <div className="programs-preview-grid">
          <div className="program-preview-card">
            <div className="program-icon">💇</div>
            <h3>Hair Complex Program</h3>
            <p>Restore. Strengthen. Regrow.</p>
          </div>
          <div className="program-preview-card">
            <div className="program-icon">✨</div>
            <h3>Skin Enhancer Program</h3>
            <p>Glow from Within.</p>
          </div>
          <div className="program-preview-card">
            <div className="program-icon">🌟</div>
            <h3>Revitalize Program</h3>
            <p>Brighten. Even. Renew.</p>
          </div>
          <div className="program-preview-card">
            <div className="program-icon">🔄</div>
            <h3>Revive Program</h3>
            <p>Regenerate. Rebuild. Revive.</p>
          </div>
          <div className="program-preview-card">
            <div className="program-icon">💗</div>
            <h3>Pink Secret Program</h3>
            <p>The Pink Elixir of Youth.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of clinics managing patient care with Proven</p>
        <a href="/clinic/login" className="btn btn-large">Enter Clinic Portal</a>
      </section>
    </div>
  )
}

export default Home
