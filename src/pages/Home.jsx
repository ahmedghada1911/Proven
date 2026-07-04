import { useEffect, useState } from 'react'
import '../styles/Home.css'

function Home() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🏥 Proven</h1>
        <p>Patients Management Application</p>
      </header>

      <main className="home-content">
        <section className="welcome-section">
          <h2>Welcome to Proven</h2>
          <p>
            A modern, user-friendly application for managing patient records,
            appointments, and medical information.
          </p>
        </section>

        <section className="features-section">
          <h3>Key Features</h3>
          <ul className="features-list">
            <li>✅ Patient record management</li>
            <li>📅 Appointment scheduling</li>
            <li>📋 Medical history tracking</li>
            <li>🔒 Secure patient data handling</li>
            <li>📱 Responsive UI for desktop and mobile</li>
          </ul>
        </section>

        <section className="getting-started-section">
          <h3>Getting Started</h3>
          <p>Follow these steps to set up the development environment:</p>
          <ol>
            <li>Install dependencies: <code>npm install</code></li>
            <li>Start development server: <code>npm run dev</code></li>
            <li>Navigate to <code>http://localhost:3000</code></li>
            <li>Begin building amazing features!</li>
          </ol>
        </section>

        <section className="next-steps">
          <h3>Next Steps</h3>
          <p>Start by:</p>
          <ul>
            <li>Reviewing the project structure in the README</li>
            <li>Setting up your backend API connection</li>
            <li>Creating user authentication</li>
            <li>Building patient dashboard components</li>
          </ul>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 Proven. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
