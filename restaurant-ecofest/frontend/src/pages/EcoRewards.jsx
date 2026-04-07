import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { rewardsAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './EcoRewards.css'

const EcoRewards = () => {
  const [activeTab, setActiveTab] = useState('wallet')
  const [rewardPoints, setRewardPoints] = useState(0)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activityForm, setActivityForm] = useState({
    activityType: '',
    image: null,
    description: '',
  })
  const navigate = useNavigate()
  const user = getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadRewardData()
  }, [user, navigate])

  const loadRewardData = async () => {
    try {
      const [balanceRes, historyRes] = await Promise.all([
        rewardsAPI.getBalance(user.id),
        rewardsAPI.getHistory(user.id),
      ])
      setRewardPoints(balanceRes.data)
      setHistory(historyRes.data)
    } catch (error) {
      console.error('Failed to load reward data:', error)
    }
  }

  const activities = [
    { type: 'PLANT_TREE', name: 'Plant a Tree', points: 50, icon: '🌳', description: 'Upload a photo of yourself planting a tree' },
    { type: 'CYCLE_TO_RESTAURANT', name: 'Cycle to Restaurant', points: 25, icon: '🚴', description: 'Use a bicycle instead of a car to visit us' },
    { type: 'CARPOOL', name: 'Carpool', points: 15, icon: '🚗', description: 'Share a ride with friends to reduce emissions' },
    { type: 'REUSABLE_CONTAINER', name: 'Use Reusable Container', points: 10, icon: '♻️', description: 'Bring your own container for takeaway' },
    { type: 'PUBLIC_TRANSPORT', name: 'Use Public Transport', points: 20, icon: '🚇', description: 'Take public transport to our restaurant' },
  ]

  const handleActivityChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setActivityForm({
        ...activityForm,
        image: files[0],
      })
    } else {
      setActivityForm({
        ...activityForm,
        [name]: value,
      })
    }
    setError('')
  }

  const handleSubmitActivity = async (e) => {
    e.preventDefault()
    setError('')

    if (!activityForm.activityType) {
      setError('Please select an activity')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('userId', user.id)
      formData.append('activityType', activityForm.activityType)
      formData.append('description', activityForm.description || '')
      if (activityForm.image) {
        formData.append('image', activityForm.image)
      }

      await rewardsAPI.submitActivity(formData)

      alert('Activity submitted successfully! Your points will be added after verification.')
      setActivityForm({
        activityType: '',
        image: null,
        description: '',
      })
      loadRewardData()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit activity. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedActivity = activities.find(a => a.type === activityForm.activityType)
  const totalEarned = history.filter(h => h.pointsChange > 0).reduce((sum, h) => sum + h.pointsChange, 0)
  const totalRedeemed = Math.abs(history.filter(h => h.pointsChange < 0).reduce((sum, h) => sum + h.pointsChange, 0))

  return (
    <div className="eco-rewards">
      <div className="page-header">
        <h1>Eco-Friendly Rewards</h1>
        <p>Make sustainable choices, upload proof, and earn rewards</p>
      </div>

      <div className="rewards-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'wallet' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            Eco Wallet
          </button>
          <button
            className={`tab ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            Submit Activities
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Rewards
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'wallet' && (
            <div className="wallet-section">
              <h2>Your Eco Points</h2>
              <p>Use your points to redeem exclusive rewards</p>

              <div className="points-display">
                <div className="points-card">
                  <div className="points-value">{rewardPoints}</div>
                  <div className="points-label">Available Points</div>
                </div>
                <div className="points-summary">
                  <div className="summary-item">
                    <span className="summary-label">Total Earned</span>
                    <span className="summary-value">{totalEarned}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Redeemed</span>
                    <span className="summary-value">{totalRedeemed}</span>
                  </div>
                </div>
              </div>

              <div className="recent-activities">
                <h3>Recent Activities</h3>
                {history.length === 0 ? (
                  <p className="no-activities">No activities recorded yet</p>
                ) : (
                  <div className="activity-list">
                    {history.slice(0, 5).map((activity, index) => (
                      <div key={index} className="activity-item">
                        <span className={`activity-points ${activity.pointsChange > 0 ? 'positive' : 'negative'}`}>
                          {activity.pointsChange > 0 ? '+' : ''}{activity.pointsChange}
                        </span>
                        <span className="activity-reason">{activity.reason}</span>
                        <span className="activity-date">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'submit' && (
            <div className="submit-section">
              <h2>Submit Eco Activity</h2>
              <p>Choose an activity and upload proof to earn eco points</p>

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmitActivity} className="activity-form">
                <div className="activity-cards">
                  {activities.map((activity) => (
                    <div
                      key={activity.type}
                      className={`activity-card ${activityForm.activityType === activity.type ? 'selected' : ''}`}
                      onClick={() => setActivityForm({ ...activityForm, activityType: activity.type })}
                    >
                      <div className="activity-icon">{activity.icon}</div>
                      <div className="activity-info">
                        <h4>{activity.name}</h4>
                        <p>{activity.description}</p>
                        <div className="activity-points-badge">+{activity.points} points</div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedActivity && (
                  <div className="form-details">
                    <div className="form-group">
                      <label htmlFor="description">Additional Description (Optional)</label>
                      <textarea
                        id="description"
                        name="description"
                        value={activityForm.description}
                        onChange={handleActivityChange}
                        placeholder="Add any additional details about your eco-friendly activity..."
                        rows={4}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="image">Upload Proof Image *</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleActivityChange}
                        required
                      />
                      <small>Upload a photo as proof of your eco-friendly activity</small>
                    </div>

                    {activityForm.image && (
                      <div className="image-preview">
                        <img src={URL.createObjectURL(activityForm.image)} alt="Preview" />
                      </div>
                    )}
                  </div>
                )}

                <button type="submit" className="submit-activity-btn" disabled={loading || !selectedActivity}>
                  {loading ? 'Submitting...' : 'Submit Activity'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-section">
              <h2>Reward History</h2>
              <p>View all your eco-reward transactions</p>

              {history.length === 0 ? (
                <div className="no-history">
                  <p>No reward history yet. Start earning points by submitting activities!</p>
                </div>
              ) : (
                <div className="history-list">
                  {history.map((transaction, index) => (
                    <div key={index} className="history-item">
                      <div className="history-main">
                        <div className="history-reason">{transaction.reason}</div>
                        <div className={`history-points ${transaction.pointsChange > 0 ? 'positive' : 'negative'}`}>
                          {transaction.pointsChange > 0 ? '+' : ''}{transaction.pointsChange} points
                        </div>
                      </div>
                      <div className="history-date">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EcoRewards

