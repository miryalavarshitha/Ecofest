import { useState } from 'react'
import { suggestionAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './Suggestions.css'

const Suggestions = () => {
  const user = getCurrentUser()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !message.trim()) {
      setResult('Please fill in both title and suggestion details.')
      return
    }
    setLoading(true)
    setResult('')
    try {
      const response = await suggestionAPI.create({
        userId: user?.id || null,
        title: title.trim(),
        message: message.trim(),
      })
      setResult(response.data?.message || 'Suggestion submitted successfully.')
      setTitle('')
      setMessage('')
    } catch (error) {
      setResult('Could not submit suggestion. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="suggestions-page">
      <div className="suggestions-card">
        <h1>Suggestions</h1>
        <p>Share your ideas to improve EcoFest experience.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Suggestion Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Add dark mode"
          />

          <label htmlFor="message">Details</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Describe your suggestion in detail..."
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </form>
        {result && <div className="suggestion-result">{result}</div>}
      </div>
    </div>
  )
}

export default Suggestions
