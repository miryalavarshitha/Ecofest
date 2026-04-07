import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './Booking.css'

const TOTAL_TABLES = 30

const TableBooking = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    numberOfPeople: 2,
    contactNumber: '',
    specialRequests: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tableStats, setTableStats] = useState({
    total: TOTAL_TABLES,
    occupied: 0,
    available: TOTAL_TABLES,
  })
  const navigate = useNavigate()
  const user = getCurrentUser()

  const getSlotKey = (date, time) => {
    if (!date || !time) return 'default'
    return `${date}_${time}`
  }

  const loadLocalTableStats = (date, time) => {
    if (!date || !time) {
      setTableStats({
        total: TOTAL_TABLES,
        occupied: 0,
        available: TOTAL_TABLES,
      })
      return
    }

    try {
      const raw = localStorage.getItem('tableBookings')
      const all = raw ? JSON.parse(raw) : {}
      const occupied = all[getSlotKey(date, time)] || 0
      setTableStats({
        total: TOTAL_TABLES,
        occupied,
        available: Math.max(0, TOTAL_TABLES - occupied),
      })
    } catch {
      setTableStats({
        total: TOTAL_TABLES,
        occupied: 0,
        available: TOTAL_TABLES,
      })
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      loadLocalTableStats(formData.date, formData.time)
    }
  }, [user, navigate, formData.date, formData.time])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.date || !formData.time || !formData.contactNumber) {
      setError('Please fill in all required fields')
      return
    }

    if (tableStats.available <= 0) {
      setError('No tables available at the moment. Please try a different time slot.')
      return
    }

    setLoading(true)

    try {
      const bookingDateTime = new Date(`${formData.date}T${formData.time}`)
      
      await bookingAPI.bookTable({
        userId: user.id,
        bookingTime: bookingDateTime.toISOString(),
        numberOfPeople: parseInt(formData.numberOfPeople),
        specialRequests: formData.specialRequests || null,
      })

      alert('Table booked successfully!')
      // Persist booking count per (date, time) slot in localStorage
      try {
        const key = getSlotKey(formData.date, formData.time)
        const raw = localStorage.getItem('tableBookings')
        const all = raw ? JSON.parse(raw) : {}
        const currentOccupied = all[key] || 0
        const newOccupied = Math.min(TOTAL_TABLES, currentOccupied + 1)
        all[key] = newOccupied
        localStorage.setItem('tableBookings', JSON.stringify(all))
        loadLocalTableStats(formData.date, formData.time)
      } catch {
        // If localStorage fails, at least reduce locally
        setTableStats((prev) => {
          const newOccupied = Math.min(prev.total, prev.occupied + 1)
          const newAvailable = Math.max(0, prev.total - newOccupied)
          return {
            ...prev,
            occupied: newOccupied,
            available: newAvailable,
          }
        })
      }

      // Reset only non-slot fields so user still sees updated availability for same slot
      setFormData((prev) => ({
        ...prev,
        numberOfPeople: 2,
        contactNumber: '',
        specialRequests: '',
      }))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book table. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1>Book a Table</h1>
        <p>Reserve your table for the perfect dining experience</p>
      </div>

      <div className="booking-container">
        <div className="table-stats">
          <div className="table-stat-card">
            <span className="table-stat-value">{tableStats.total}</span>
            <span className="table-stat-label">Total Tables</span>
          </div>
          <div className="table-stat-card occupied">
            <span className="table-stat-value">{tableStats.occupied}</span>
            <span className="table-stat-label">Occupied</span>
          </div>
          <div className="table-stat-card available">
            <span className="table-stat-value">{tableStats.available}</span>
            <span className="table-stat-label">Available</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-section">
            <h2>Reservation Details</h2>
            
            <div className="form-group">
              <label htmlFor="date">Date *</label>
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
              <label htmlFor="time">Time Slot *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select time</option>
                <option value="11:00">7:00 AM</option>
                <option value="12:00">9:00 AM</option>
                <option value="13:00">11:00 AM</option>
                <option value="14:00">1:00 PM</option>
                <option value="18:00">3:00 PM</option>
                <option value="19:00">5:00 PM</option>
                <option value="20:00">7:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numberOfPeople">Number of Guests *</label>
              <select
                id="numberOfPeople"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
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

            <div className="form-group">
              <label htmlFor="specialRequests">Special Requests</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requirements or preferences..."
                rows={4}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TableBooking

