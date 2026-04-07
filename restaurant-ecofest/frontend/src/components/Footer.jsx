import './Footer.css'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              <span className="footer-logo-icon" style={{ width: "40px", height: "40px" }}>
                <img 
                  src="/icons/title-icon.png" 
                  alt="logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </span>
              EcoFest
            </h3>
            <p>Eat Smart. Live Green</p>
            <p>Making sustainable dining choices for a better planet.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/food-ordering">Food Ordering</a></li>
              <li><a href="/table-booking">Table Booking</a></li>
              <li><a href="/event-booking">Event Booking</a></li>
              <li><a href="/food-donation">Food Donation</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@ecofest.com</p>
            <p>Phone: +91 6734523981</p>
            <p>Address: 123 Green Street, Eco City</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
             <a href="#" aria-label="Facebook">
              <img 
                src="/icons/fb.png"
                alt="Facebook Icon"
                style={{ width: "38px", height: "38px" }}
              />
            </a>

              <a href="#" aria-label="Twitter"><img src="/icons/twitter.png" alt="Twitter Icon" /></a>
              <a href="#" aria-label="Instagram"><img src="/icons/insta.png" alt="Instagram Icon" /></a>
        
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 EcoFest. All rights reserved by EcoFest.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

