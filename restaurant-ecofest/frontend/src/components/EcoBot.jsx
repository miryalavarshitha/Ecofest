import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { foodRecommendationAPI, supportAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './EcoBot.css'

const GREETING = "Hey, I\u2019m your EcoBot \ud83c\udf31. How can I help you?"
const MAIN_OPTIONS = ['Website Guidance', 'Food Recommendations', 'File a Complaint']
const PREFERENCE_OPTIONS = ['healthy', 'low-calorie', 'vegan', 'protein', 'spicy']

const EcoBot = ({ onAddToCart }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: GREETING, recommendations: [], options: MAIN_OPTIONS },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [awaitingComplaint, setAwaitingComplaint] = useState(false)
  const user = getCurrentUser()

  const localRuleReply = (message) => {
    const text = message.toLowerCase()
    if (text.includes('hello') || text === 'hi' || text.includes('hey')) {
      return { reply: 'Hello! Please choose one option below so I can help quickly.' }
    }
    if (text.includes('website') || text.includes('app') || text.includes('feature')) {
      return { reply: 'In this website you can order food with calorie tracking, book tables/events, donate food, and earn eco rewards.' }
    }
    if (text.includes('food') || text.includes('recommend') || text.includes('healthy') || text.includes('vegan') || text.includes('protein') || text.includes('spicy')) {
      return { reply: 'Tell me your interest exactly, like: low-calorie, vegan, protein-rich, or spicy, and I will recommend items.' }
    }
    if (text.includes('complaint') || text.includes('issue') || text.includes('problem')) {
      return { reply: 'To file a complaint, type: complaint: <your issue details>' }
    }
    return { reply: 'I can help with website guidance, food recommendations, and complaint support.' }
  }

  const detectPreference = (text) => {
    const normalized = text.toLowerCase()
    if (normalized.includes('low-calorie') || normalized.includes('low calorie')) return 'low-calorie'
    if (normalized.includes('vegan')) return 'vegan'
    if (normalized.includes('protein')) return 'protein'
    if (normalized.includes('spicy')) return 'spicy'
    if (normalized.includes('healthy')) return 'healthy'
    if (normalized.includes('food') || normalized.includes('recommend')) return 'healthy'
    return null
  }

  const appendBotMessage = (text, recommendations = [], options = []) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), from: 'bot', text, recommendations, options },
    ])
  }

  const getFallbackRecommendations = (preference) => {
    const base = {
      healthy: [
        { id: -101, name: 'Caesar Salad', calories: 260, price: 159 },
        { id: -102, name: 'Miso Soup', calories: 90, price: 99 },
        { id: -103, name: 'Dal Tadka', calories: 280, price: 129 },
      ],
      'low-calorie': [
        { id: -201, name: 'Fresh Lime Soda', calories: 70, price: 59 },
        { id: -202, name: 'Hot and Sour Soup', calories: 150, price: 119 },
        { id: -203, name: 'Fruit Mocktail', calories: 150, price: 149 },
      ],
      vegan: [
        { id: -301, name: 'Edamame', calories: 190, price: 139 },
        { id: -302, name: 'Kung Pao Vegetables', calories: 410, price: 189 },
        { id: -303, name: 'Penne Arrabbiata', calories: 520, price: 189 },
      ],
      protein: [
        { id: -401, name: 'Orange Chicken', calories: 520, price: 199 },
        { id: -402, name: 'Chilli Paneer', calories: 390, price: 199 },
        { id: -403, name: 'Teriyaki Tofu Bowl', calories: 450, price: 229 },
      ],
      spicy: [
        { id: -501, name: 'Veg Manchuria', calories: 320, price: 149 },
        { id: -502, name: 'Chilli Paneer', calories: 390, price: 199 },
        { id: -503, name: 'Penne Arrabbiata', calories: 520, price: 189 },
      ],
    }
    return base[preference] || base.healthy
  }

  const handlePreferenceRecommendation = async (preference) => {
    try {
      const response = await foodRecommendationAPI.recommend(preference)
      const recommendations = response.data?.length
        ? response.data
        : getFallbackRecommendations(preference)
      appendBotMessage(
        `Great choice. Here are some ${preference} recommendations from our menu.`,
        recommendations,
        MAIN_OPTIONS
      )
    } catch (error) {
      appendBotMessage(
        `Great choice. Here are some ${preference} recommendations from our menu.`,
        getFallbackRecommendations(preference),
        MAIN_OPTIONS
      )
    }
  }

  const handleOptionClick = async (option) => {
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: option }])
    if (option === 'Website Guidance') {
      appendBotMessage(
        'EcoFest Website Guide:\n1) Food Ordering: browse menu, view per-item calories, and see total cart calories.\n2) Table Booking: reserve your table with date/time.\n3) Event Booking: schedule event dining.\n4) Food Donation: donate food for social impact.\n5) Eco Rewards: earn and redeem eco points.\n6) Suggestions: share ideas to improve the platform.',
        [],
        MAIN_OPTIONS
      )
      return
    }
    if (option === 'Food Recommendations') {
      appendBotMessage(
        'Great! Tell me your interests: healthy, low-calorie, vegan, protein-rich, spicy, or budget-friendly.',
        [],
        PREFERENCE_OPTIONS
      )
      return
    }
    if (option === 'File a Complaint') {
      setAwaitingComplaint(true)
      appendBotMessage('Please describe your problem in detail. I will file it right away for our support team.')
      return
    }
    if (PREFERENCE_OPTIONS.includes(option)) {
      await handlePreferenceRecommendation(option)
    }
  }

  useEffect(() => {
    if (!open) return
    if (!window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(GREETING)
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [open])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const currentInput = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: currentInput }])
    setLoading(true)

    try {
      if (awaitingComplaint || currentInput.toLowerCase().startsWith('complaint:')) {
        const complaintMessage = awaitingComplaint
          ? currentInput
          : currentInput.substring('complaint:'.length).trim()
        if (!complaintMessage.trim()) throw new Error('Complaint details are required.')
        try {
          await supportAPI.fileComplaint({
            userId: user?.id || null,
            message: complaintMessage,
          })
        } catch (error) {
          // Keep UX polite even if backend is temporarily unavailable.
        }
        setAwaitingComplaint(false)
        appendBotMessage(
          'Sorry for the inconvenience. Thanks for your complaint. We will resolve it soon.',
          [],
          MAIN_OPTIONS
        )
        return
      }

      const normalizedInput = currentInput.toLowerCase()
      if (PREFERENCE_OPTIONS.some((pref) => normalizedInput.includes(pref))) {
        const matched = PREFERENCE_OPTIONS.find((pref) => normalizedInput.includes(pref))
        await handlePreferenceRecommendation(matched)
        return
      }

      const response = await foodRecommendationAPI.chatWithEcoBot(currentInput)
      const preferenceFromText = detectPreference(currentInput)
      const fallbackRecommendations = preferenceFromText ? getFallbackRecommendations(preferenceFromText) : []
      const recommendations = response.data.recommendations?.length
        ? response.data.recommendations
        : fallbackRecommendations
      appendBotMessage(response.data.reply, recommendations, MAIN_OPTIONS)
    } catch (error) {
      const fallback = localRuleReply(currentInput)
      const preferenceFromText = detectPreference(currentInput)
      const fallbackRecommendations = preferenceFromText ? getFallbackRecommendations(preferenceFromText) : []
      appendBotMessage(fallback.reply, fallbackRecommendations, MAIN_OPTIONS)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ecobot-wrapper">
      {open && (
        <div className="ecobot-window">
          <div className="ecobot-header">
            <div>
              <h3>EcoBot</h3>
              <p>Smart eco food assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chatbot">x</button>
          </div>
          <div className="ecobot-body">
            {messages.map((message) => (
              <div key={message.id} className={`ecobot-msg ${message.from}`}>
                <p>{message.text}</p>
                {message.from === 'bot' && message.recommendations?.length > 0 && (
                  <div className="ecobot-recommend-grid">
                    {message.recommendations.slice(0, 3).map((item) => (
                      <div key={item.id} className="eco-card">
                        <strong>{item.name}</strong>
                        <span>{item.calories} kcal</span>
                        <span>Rs {item.price}</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (onAddToCart) {
                              onAddToCart(item)
                              return
                            }
                            navigate('/food-ordering')
                            setOpen(false)
                          }}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {message.from === 'bot' && message.options?.length > 0 && (
                  <div className="ecobot-options">
                    {message.options.map((option) => (
                      <button key={option} type="button" onClick={() => handleOptionClick(option)}>
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="ecobot-msg bot"><p>Typing...</p></div>}
          </div>
          <div className="ecobot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask: healthy, vegan, low-calorie..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button type="button" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <button type="button" className="ecobot-fab" onClick={() => setOpen((v) => !v)} aria-label="Open EcoBot">
        <span>🌳</span>
      </button>
    </div>
  )
}

export default EcoBot
