import '../styles/DualLogoHeader.css'

const DualLogoHeader = ({ clinicLogo, clinicName }) => {
  return (
    <div className="dual-logo-header">
      <div className="logo-container">
        <div className="proven-logo-section">
          <img
            src="/assets/proven-logo.png"
            alt="Proven Logo"
            className="proven-logo-large"
          />
        </div>
        <div className="clinic-logo-section">
          {clinicLogo ? (
            <div className="clinic-logo-circle">
              <img src={clinicLogo} alt={clinicName} />
              <p className="clinic-name">{clinicName}</p>
            </div>
          ) : (
            <div className="clinic-logo-placeholder">
              <p className="clinic-name">{clinicName}</p>
            </div>
          )}
        </div>
      </div>
      <h1 className="partnership-text">Partnership Program</h1>
    </div>
  )
}

export default DualLogoHeader
