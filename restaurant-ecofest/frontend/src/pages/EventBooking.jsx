import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './Booking.css'

const EventBooking = () => {
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    time: '',
    guestCount: 10,
    totalAmount: 0,
    contactNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const user = getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const eventTypes = [
    { value: 'Birthday Party', price: 5000 },
    { value: 'Anniversary', price: 6000 },
    { value: 'Corporate Meeting', price: 8000 },
    { value: 'Wedding Reception', price: 15000 },
    { value: 'Festival Celebration', price: 7000 },
    { value: 'Other', price: 5000 },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    let updates = { [name]: value }

    if (name === 'eventType') {
      const selectedEvent = eventTypes.find((e) => e.value === value)
      updates.totalAmount = selectedEvent ? selectedEvent.price : 0
    }

    if (name === 'guestCount') {
      const selectedEvent = eventTypes.find((e) => e.value === formData.eventType)
      if (selectedEvent) {
        const basePrice = selectedEvent.price
        const additionalGuests = Math.max(0, parseInt(value) - 10)
        updates.totalAmount = basePrice + additionalGuests * 500
      }
    }

    setFormData({
      ...formData,
      ...updates,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.eventType || !formData.date || !formData.time || !formData.contactNumber) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const eventDateTime = new Date(`${formData.date}T${formData.time}`)
      
      await bookingAPI.bookEvent({
        userId: user.id,
        eventType: formData.eventType,
        eventDateTime: eventDateTime.toISOString(),
        guestCount: parseInt(formData.guestCount),
        totalAmount: parseFloat(formData.totalAmount),
      })

      alert('Event booked successfully!')
      setFormData({
        eventType: '',
        date: '',
        time: '',
        guestCount: 10,
        totalAmount: 0,
        contactNumber: '',
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1>Event Booking</h1>
        <p>Host your special events with us</p>
      </div>

      <div className="booking-container">
        <form onSubmit={handleSubmit} className="booking-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-section">
            <h2>Event Details</h2>
            
            <div className="form-group">
              <label htmlFor="eventType">Event Type *</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select event type</option>
                {eventTypes.map((event) => (
                  <option key={event.value} value={event.value}>
                    {event.value} (Starting at ₹{event.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Event Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Event Time *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select time</option>
                <option value="10:00">10:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="20:00">8:00 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="guestCount">Number of Guests *</label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="1"
                required
              />
              <small>Base price includes up to 10 guests. Additional guests: ₹500 each</small>
            </div>

            <div className="form-group">
              <label htmlFor="totalAmount">Total Amount</label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={formData.totalAmount}
                readOnly
                className="readonly-input"
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
            {loading ? 'Booking...' : 'Confirm Event Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EventBooking

