import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Prevent requests from hanging forever so the UI doesn't stay on "Processing..."
  timeout: 10000,
})

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
}

// Food Order API
export const foodOrderAPI = {
  placeOrder: (data) => api.post('/orders', data),
}

export const foodRecommendationAPI = {
  getItems: () => api.get('/food/items'),
  recommend: (preferences) => api.get('/food/recommend', { params: { preferences } }),
  chatWithEcoBot: (message) => api.post('/food/chat', { message }),
}

export const supportAPI = {
  fileComplaint: (data) => api.post('/support/complaints', data),
}

export const suggestionAPI = {
  create: (data) => api.post('/suggestions', data),
}

// Booking API
export const bookingAPI = {
  bookTable: (data) => api.post('/bookings/table', data),
  bookEvent: (data) => api.post('/bookings/event', data),
  getTableStats: () => api.get('/bookings/table-stats'),
}

// Donation API
export const donationAPI = {
  donateFood: (data) => api.post('/donations', data),
}

// NGO API
export const ngoAPI = {
  getVerified: () => api.get('/ngos/verified'),
}

// Impact / stats API
export const impactAPI = {
  getStats: () => api.get('/donations/impact'),
}

// Funding / monetary donations API
export const fundingAPI = {
  createDonation: (data) => api.post('/funding', data),
  getStats: () => api.get('/funding/stats'),
}

// Rewards API
export const rewardsAPI = {
  getBalance: (userId) => api.get(`/rewards/balance/${userId}`),
  getHistory: (userId) => api.get(`/rewards/history/${userId}`),
  submitActivity: (formData) => api.post('/rewards/submit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
}

export default api

