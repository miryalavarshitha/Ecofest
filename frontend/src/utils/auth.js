export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

export const setCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearCurrentUser = () => {
  localStorage.removeItem('user')
}

export const isAuthenticated = () => {
  return getCurrentUser() !== null
}

