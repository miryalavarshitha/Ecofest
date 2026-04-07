import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { donationAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './Donation.css'

const staticNgos = [
  {
    id: 1,
    name: 'Green Plate Foundation',
    location: 'Hyderabad, Telangana',
    email: 'contact@greenplate.org',
    phone: '+91 98765 43210',
    description: 'Rescuing surplus food from events and restaurants to serve urban homeless communities.',
    verified: true,
  },
  {
    id: 2,
    name: 'Joy of Meals Trust',
    location: 'Bengaluru, Karnataka',
    email: 'support@joyofmeals.in',
    phone: '+91 99887 66554',
    description: 'Connecting corporate canteens and NGOs to ensure no meal is wasted.',
    verified: true,
  },
  {
    id: 3,
    name: 'Seva Annadaan Mission',
    location: 'Chennai, Tamil Nadu',
    email: 'hello@sevaannadaan.org',
    phone: '+91 91234 56780',
    description: 'Distributing fresh home-cooked meals to children and elderly in need.',
    verified: true,
  },
]

const FoodDonation = () => {
  const [activeType, setActiveType] = useState(null) // 'food' | 'funds' | null
  const [formData, setFormData] = useState({
    foodDetails: '',
    servings: 1,
    date: '',
    time: '',
    numberOfPeople: 1,
    contactNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fundForm, setFundForm] = useState({
    name: '',
    email: '',
    amount: '',
    transactionId: '',
    contactNumber: '',
  })
  const [fundLoading, setFundLoading] = useState(false)
  const [fundError, setFundError] = useState('')
  const [fundSuccess, setFundSuccess] = useState('')
  const navigate = useNavigate()
  const user = getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleFundChange = (e) => {
    setFundForm({
      ...fundForm,
      [e.target.name]: e.target.value,
    })
    setFundError('')
    setFundSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.foodDetails || !formData.contactNumber) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      await donationAPI.donateFood({
        userId: user.id,
        foodDetails: formData.foodDetails,
        servings: parseInt(formData.servings),
      })

      alert('Food donation registered successfully! Thank you for your contribution. You earned eco-rewards!')
      setFormData({
        foodDetails: '',
        servings: 1,
        date: '',
        time: '',
        numberOfPeople: 1,
        contactNumber: '',
      })
      // Optionally you could refresh impact stats after a donation
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register donation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFundSubmit = (e) => {
    e.preventDefault()
    setFundError('')
    setFundSuccess('')

    if (!fundForm.name || !fundForm.amount || !fundForm.transactionId) {
      setFundError('Please fill in name, amount, and transaction ID.')
      return
    }

    setFundLoading(true)

    setTimeout(() => {
      setFundLoading(false)
      setFundSuccess(
        'Thank you for your financial contribution! Your details have been recorded.'
      )
      setFundForm({
        name: '',
        email: '',
        amount: '',
        transactionId: '',
        contactNumber: '',
      })
    }, 800)
  }

  return (
    <div className="donation-page">
      <div className="page-header">
        <h1>Food Donation</h1>
        <p>Make a difference by donating food to help those in need</p>
      </div>

      {/* Choice cards to switch between food and funds */}
      <section className="donation-section donation-choice">
        <h2>Choose How You Want to Help</h2>
        <div className="choice-grid">
          <button
            type="button"
            className={`choice-card${activeType === 'food' ? ' active' : ''}`}
            onClick={() => setActiveType('food')}
          >
            <div className="choice-icon">🍱</div>
            <h3>Donate Food</h3>
            <p>Share safe, surplus food that can be picked up by our NGO partners.</p>
          </button>
          <button
            type="button"
            className={`choice-card${activeType === 'funds' ? ' active' : ''}`}
            onClick={() => setActiveType('funds')}
          >
            <div className="choice-icon">💰</div>
            <h3>Donate Money</h3>
            <p>Support NGOs with funds for logistics, storage, and outreach.</p>
          </button>
        </div>
      </section>
      <span></span>
      {activeType && (
      <div className="donation-container">
        <div className="donation-info">
          <h2>Why Donate?</h2>
          <ul>
            <li>🌱 Help reduce food waste and hunger</li>
            <li>❤️ Support verified NGOs and community kitchens</li>
            <li>⭐ Earn eco-rewards points (for food donations)</li>
            <li>🌍 Contribute directly to a more sustainable future</li>
          </ul>
        </div>
        
        {activeType === 'food' ? (
          <form onSubmit={handleSubmit} className="donation-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-section">
              <h2>Food Donation Form</h2>
              
              <div className="form-group">
                <label htmlFor="foodDetails">Food Description *</label>
                <textarea
                  id="foodDetails"
                  name="foodDetails"
                  value={formData.foodDetails}
                  onChange={handleChange}
                  placeholder="Describe the food items you're donating (e.g., Fresh vegetables, Cooked meals, Packaged food, etc.)"
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="servings">Number of Servings *</label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <small>Each serving earns you 5 eco-reward points</small>
              </div>

              <div className="form-group">
                <label htmlFor="date">Preferred Donation Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Donation Time</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="numberOfPeople">Expected Recipients</label>
                <input
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number *</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Food Donation'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFundSubmit} className="donation-form">
            {fundError && <div className="error-message">{fundError}</div>}
            {fundSuccess && <div className="success-message">{fundSuccess}</div>}

            <div className="form-section">
              <h2>Monetary Donation Form</h2>

              <div className="payment-details-card">
                <h3>Transfer Details</h3>
                <p><strong>Account Name:</strong> EcoFest NGO Support</p>
                <p><strong>Account Number:</strong> 123456789012</p>
                <p><strong>IFSC Code:</strong> ECOF0001234</p>
                <p><strong>UPI ID:</strong> ecofest@upi</p>
                <div className="qr-placeholder">
                  <span><img src="/icons/upi.jpeg" alt="UPI QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }}/></span>
                  <small>Scan this code in your UPI app to pay</small>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="name">Donor Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fundForm.name}
                  onChange={handleFundChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fundForm.email}
                  onChange={handleFundChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Donation Amount (₹) *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  value={fundForm.amount}
                  onChange={handleFundChange}
                  placeholder="e.g., 500"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID *</label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={fundForm.transactionId}
                  onChange={handleFundChange}
                  placeholder="Reference ID from your payment app"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fundContactNumber">Contact Number</label>
                <input
                  type="tel"
                  id="fundContactNumber"
                  name="contactNumber"
                  value={fundForm.contactNumber}
                  onChange={handleFundChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <small>
                Note: This form records your donation details. Actual payment should be
                completed via your preferred UPI / banking app.
              </small>
            </div>

            <button type="submit" className="submit-btn" disabled={fundLoading}>
              {fundLoading ? 'Recording Donation...' : 'Submit Monetary Donation'}
            </button>
          </form>
        )}
      </div>
      )}

      {/* How Food Donation Works */}
      <section className="donation-section how-it-works">
        <h2>How Food Donation Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">🍱</div>
            <h3>Share Surplus Food</h3>
            <p>Donor submits safe, surplus food details with servings and timing.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">📍</div>
            <h3>NGO Gets Notified</h3>
            <p>Nearby registered NGO partners are automatically notified.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🚚</div>
            <h3>Quality Check & Pickup</h3>
            <p>NGOs verify food quality and schedule a safe pickup.</p>
          </div>
          <div className="step-card">
            <div className="step-icon">❤️</div>
            <h3>Food Reaches People</h3>
            <p>Meals are distributed to beneficiaries and impact is recorded.</p>
          </div>
        </div>
      </section>

      {/* Registered NGO Partners (static examples) */}
      <section className="donation-section ngo-partners">
        <h2>Our Verified NGO Partners</h2>
        <div className="ngo-grid">
          {staticNgos.map((ngo) => (
            <div key={ngo.id} className="ngo-card">
              <div className="ngo-header">
                <h3>{ngo.name}</h3>
                {ngo.verified && <span className="ngo-badge">✔ Verified Partner</span>}
              </div>
              <p className="ngo-location">{ngo.location}</p>
              <p className="ngo-description">{ngo.description}</p>
              <div className="ngo-contact">
                <span>{ngo.email}</span>
                <span>{ngo.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All monetary / impact summary features removed as requested */}
    </div>
  )
}

export default FoodDonation

