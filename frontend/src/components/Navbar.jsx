import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getCurrentUser, clearCurrentUser } from '../utils/auth'
import './Navbar.css'

const Navbar = () => {
  const [user, setUser] = useState(getCurrentUser())
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [location])

  const handleLogout = () => {
    clearCurrentUser()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon" style={{ width: "44px", height: "44px" }}><img 
                  src="/icons/title-icon.png" 
                  alt="logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                /></span>
          <span className="logo-text">EcoFest</span>
        </Link>

        <div className="navbar-actions">
          <Link to="/suggestions" className="suggestions-link">
            <span>Suggestions</span>
          </Link>
          <Link to="/eco-rewards" className="eco-rewards-link">
            <span className="rewards-icon">⭐</span>
            <span>Eco Rewards</span>
            {user && (
              <span className="points-badge">{user.rewardPoints || 0}</span>
            )}
          </Link>

          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.fullName}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Sign In
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

