import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOffer, deleteOffer } from '../store/clinicSlice'
import clinicService from '../services/clinicService'
import '../styles/OffersManagement.css'

const OffersManagement = ({ clinicId }) => {
  const [offers, setOffers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
    programs: [],
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateOffer = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const offer = {
        id: Date.now(),
        ...formData,
        createdAt: new Date(),
        status: 'active',
      }
      setOffers(prev => [offer, ...prev])
      setFormData({
        title: '',
        description: '',
        discount: '',
        validUntil: '',
        programs: [],
      })
      setShowForm(false)
      alert('Offer created successfully!')
    } catch (error) {
      alert('Failed to create offer')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOffer = async (offerId) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setLoading(true)
      try {
        setOffers(prev => prev.filter(offer => offer.id !== offerId))
        alert('Offer deleted successfully')
      } catch (error) {
        alert('Failed to delete offer')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="offers-management">
      <div className="offers-header">
        <h2>Manage Offers</h2>
        <button
          className="create-offer-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ New Offer'}
        </button>
      </div>

      {showForm && (
        <div className="offer-form-container">
          <form onSubmit={handleCreateOffer}>
            <div className="form-group">
              <label>Offer Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Summer Special Discount"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your offer"
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="e.g., 20"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div className="form-group">
                <label>Valid Until</label>
                <input
                  type="date"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creating...' : 'Create Offer'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="offers-list">
        {offers.length === 0 ? (
          <div className="empty-state">
            <p>No offers created yet</p>
            <p>Create your first offer to attract more patients</p>
          </div>
        ) : (
          offers.map(offer => (
            <div key={offer.id} className="offer-item">
              <div className="offer-info">
                <h3>{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-meta">
                  <span className="discount-badge">{offer.discount}% OFF</span>
                  <span className="valid-date">Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteOffer(offer.id)}
                disabled={loading}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OffersManagement
