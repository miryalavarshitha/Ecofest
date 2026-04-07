import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FoodOrdering from './pages/FoodOrdering'
import TableBooking from './pages/TableBooking'
import EventBooking from './pages/EventBooking'
import FoodDonation from './pages/FoodDonation'
import EcoRewards from './pages/EcoRewards'
import Suggestions from './pages/Suggestions'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EcoBot from './components/EcoBot'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food-ordering" element={<FoodOrdering />} />
            <Route path="/table-booking" element={<TableBooking />} />
            <Route path="/event-booking" element={<EventBooking />} />
            <Route path="/food-donation" element={<FoodDonation />} />
            <Route path="/eco-rewards" element={<EcoRewards />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <EcoBot />
        <Footer />
      </div>
    </Router>
  )
}

export default App

