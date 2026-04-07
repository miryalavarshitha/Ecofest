import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Eat Smart. Live Green</h1>
          <p className="hero-subtitle">
            Book tables, pre-order your favorite meals, and earn eco-rewards
            while making sustainable choices for our planet.
          </p>
          <div className="hero-buttons">
            <Link to="/table-booking" className="btn btn-primary">
              Book a Table
            </Link>
            <Link to="/eco-rewards" className="btn btn-secondary">
              Learn About Eco Rewards
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Choose Your Experience</h2>
        <div className="feature-cards">
          <Link to="/food-ordering" className="feature-card">
            <div className="card-icon">🍽️</div>
            <h3>Food Ordering</h3>
            <p>Browse delicious meals, add to cart, and pre-order for your visit. Apply eco-rewards for discounts!</p>
            <div className="card-button">Get Started →</div>
          </Link>

          <Link to="/table-booking" className="feature-card">
            <div className="card-icon">🪑</div>
            <h3>Table Booking</h3>
            <p>Reserve your table by selecting date, time, and number of guests. Plan your perfect dining experience.</p>
            <div className="card-button">Get Started →</div>
          </Link>

          <Link to="/event-booking" className="feature-card">
            <div className="card-icon">🎉</div>
            <h3>Event Booking</h3>
            <p>Host your special events with us. Book space for celebrations, meetings, and gatherings.</p>
            <div className="card-button">Get Started →</div>
          </Link>

          <Link to="/food-donation" className="feature-card">
            <div className="card-icon">❤️</div>
            <h3>Food Donation</h3>
            <p>Make a difference by donating food. Help feed those in need and contribute to a sustainable community.</p>
            <div className="card-button">Get Started →</div>
          </Link>
        </div>
      </section>

      <section className="about">
        <h2 className="section-title">About EcoFest</h2>
        <div className="about-content">
          <p>
            EcoFest is an innovative platform that combines exceptional dining experiences
            with environmental responsibility. We believe that every meal can make a positive
            impact on our planet.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <span className="feature-icon">🌿</span>
              <h4>Sustainable Practices</h4>
              <p>We source locally and use eco-friendly packaging</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">⭐</span>
              <h4>Eco Rewards</h4>
              <p>Earn points for sustainable choices and get discounts</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">🤝</span>
              <h4>Community Impact</h4>
              <p>Support food donation and community initiatives</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

