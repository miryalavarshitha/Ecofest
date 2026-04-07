import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { foodOrderAPI, foodRecommendationAPI, rewardsAPI } from '../services/api'
import { getCurrentUser } from '../utils/auth'
import './FoodOrdering.css'

const cuisines = ['all', 'Asian', 'Chinese', 'Italian', 'Japanese']

const menuItems = [
  {
    id: 1,
    name: 'Orange Chicken',
    price: 199,
    image: '/food/food1.jpg',
    description: 'Crispy chicken pieces garnished with sesame seeds and green onions.',
    cuisine: 'Chinese',
    calories: 520,
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    price: 210,
    image: '/food/food2.jpg',
    description: 'Hyderabadi biryani with tender chicken and aromatic spices.',
    cuisine: 'Asian',
    calories: 650,
  },
  {
    id: 3,
    name: 'Tandoori Chicken',
    price: 279,
    image: '/food/food3.jpg',
    description: 'Juicy chicken marinated in yogurt and spices, roasted in a tandoor.',
    cuisine: 'Asian',
    calories: 430,
  },
  {
    id: 4,
    name: 'Samosa',
    price: 49,
    image: '/food/food4.jpg',
    description: 'Crispy pastry pockets filled with spicy potato and peas.',
    cuisine: 'Asian',
    calories: 180,
  },
  {
    id: 5,
    name: 'Veg Manchuria',
    price: 149,
    image: '/food/food5.jpg',
    description: 'Vegetable dumplings tossed in tangy Indo-Chinese sauce.',
    cuisine: 'Chinese',
    calories: 320,
  },
  {
    id: 6,
    name: 'Veg Thali',
    price: 199,
    image: '/food/food6.jpg',
    description: 'A wholesome platter with curries, rice, roti, and pickles.',
    cuisine: 'Asian',
    calories: 700,
  },
  {
    id: 7,
    name: 'Paneer Butter Masala',
    price: 249,
    image: '/food/food12.jpg',
    description: 'Soft paneer cubes in rich, creamy tomato gravy.',
    cuisine: 'Asian',
    calories: 540,
  },
  {
    id: 8,
    name: 'Margherita Pizza',
    price: 199,
    image: '/food/food13.jpg',
    description: 'Classic Italian pizza with tomato, basil, and mozzarella.',
    cuisine: 'Italian',
    calories: 600,
  },
  {
    id: 9,
    name: 'Gulab Jamun',
    price: 99,
    image: '/food/food7.jpg',
    description: 'Soft sweet dumplings soaked in sugar syrup.',
    cuisine: 'Asian',
    calories: 260,
  },
  {
    id: 10,
    name: 'Ice Cream Sundae',
    price: 129,
    image: '/food/food8.jpg',
    description: 'Creamy ice cream with nuts and chocolate sauce.',
    cuisine: 'Italian',
    calories: 380,
  },
  {
    id: 11,
    name: 'Fruit Mocktail',
    price: 149,
    image: '/food/food9.jpg',
    description: 'Colorful fizzy drink with fresh fruit flavors.',
    cuisine: 'Asian',
    calories: 150,
  },
  {
    id: 12,
    name: 'Waffles',
    price: 149,
    image: '/food/food10.jpg',
    description: 'Crispy fluffy waffles with maple syrup.',
    cuisine: 'Italian',
    calories: 420,
  },
  {
    id: 13,
    name: 'Dal Tadka',
    price: 129,
    image: '/food/a8.jpg',
    description: 'Tempered yellow lentils with garlic and spices.',
    cuisine: 'Asian',
    calories: 280,
  },
  {
    id: 14,
    name: 'Butter Naan',
    price: 49,
    image: '/food/a9.jpg',
    description: 'Soft leavened flatbread brushed with butter.',
    cuisine: 'Asian',
    calories: 160,
  },
  {
    id: 15,
    name: 'Veg Fried Rice',
    price: 159,
    image: '/food/c10.jpg',
    description: 'Stir-fried rice with mixed vegetables and soy sauce.',
    cuisine: 'Chinese',
    calories: 420,
  },
  {
    id: 16,
    name: 'Pasta Alfredo',
    price: 189,
    image: '/food/i4.jpg',
    description: 'Creamy fettuccine pasta with parmesan and herbs.',
    cuisine: 'Italian',
    calories: 550,
  },
  {
    id: 17,
    name: 'Veg Burger',
    price: 119,
    image: '/food/i5.jpeg',
    description: 'Crispy veggie patty with lettuce, tomato and sauce.',
    cuisine: 'Italian',
    calories: 430,
  },
  {
    id: 18,
    name: 'French Fries',
    price: 79,
    image: '/food/i6.jpg',
    description: 'Golden crispy fries with a pinch of salt.',
    cuisine: 'Italian',
    calories: 320,
  },
  {
    id: 19,
    name: 'Rasmalai',
    price: 119,
    image: '/food/a10.webp',
    description: 'Soft cottage cheese dumplings in sweet saffron milk.',
    cuisine: 'Asian',
    calories: 310,
  },
  {
    id: 20,
    name: 'Chocolate Brownie',
    price: 109,
    image: '/food/i7.jpg',
    description: 'Warm chocolate brownie with a gooey center.',
    cuisine: 'Italian',
    calories: 450,
  },
  {
    id: 21,
    name: 'Masala Chai',
    price: 39,
    image: '/food/a11.jpg',
    description: 'Spiced Indian tea with milk and ginger.',
    cuisine: 'Asian',
    calories: 90,
  },
  {
    id: 22,
    name: 'Fresh Lime Soda',
    price: 59,
    image: '/food/a12.jpg',
    description: 'Refreshing lime juice with soda and mint.',
    cuisine: 'Asian',
    calories: 70,
  },
  {
    id: 23,
    name: 'Sushi Platter',
    price: 299,
    image: '/food/j1.jpeg',
    description: 'Assorted vegetable and avocado sushi rolls.',
    cuisine: 'Japanese',
    calories: 380,
  },
  {
    id: 24,
    name: 'Vegetable Ramen',
    price: 249,
    image: '/food/j2.jpg',
    description: 'Japanese-style noodle soup with veggies and soy broth.',
    cuisine: 'Japanese',
    calories: 480,
  },
  // Extra Chinese dishes (ensure at least 10)
  {
    id: 25,
    name: 'Spring Rolls',
    price: 129,
    image: '/food/c4.jpg',
    description: 'Crispy fried rolls stuffed with mixed vegetables.',
    cuisine: 'Chinese',
    calories: 260,
  },
  {
    id: 26,
    name: 'Kung Pao Vegetables',
    price: 189,
    image: '/food/c5.jpg',
    description: 'Stir-fried veggies with peanuts in a spicy sauce.',
    cuisine: 'Chinese',
    calories: 410,
  },
  {
    id: 27,
    name: 'Hakka Noodles',
    price: 169,
    image: '/food/c6.jpg',
    description: 'Stir-fried noodles with veggies and soy sauce.',
    cuisine: 'Chinese',
    calories: 430,
  },
  {
    id: 28,
    name: 'Chilli Paneer',
    price: 199,
    image: '/food/c7.jpg',
    description: 'Paneer cubes tossed in spicy chilli sauce.',
    cuisine: 'Chinese',
    calories: 390,
  },
  {
    id: 29,
    name: 'Hot and Sour Soup',
    price: 119,
    image: '/food/c8.jpg',
    description: 'Tangy soup with vegetables and soy.',
    cuisine: 'Chinese',
    calories: 150,
  },
  {
    id: 30,
    name: 'Sweet Corn Soup',
    price: 109,
    image: '/food/c9.jpg',
    description: 'Mildly sweet soup with corn and veggies.',
    cuisine: 'Chinese',
    calories: 160,
  },
  {
    id: 31,
    name: 'Garlic Fried Rice',
    price: 169,
    image: '/food/c10.jpg',
    description: 'Fried rice with garlic and spring onions.',
    cuisine: 'Chinese',
    calories: 440,
  },
  // Extra Italian dishes (ensure at least 10)
  {
    id: 32,
    name: 'Penne Arrabbiata',
    price: 189,
    image: '/food/i8.jpeg',
    description: 'Penne pasta in spicy tomato sauce.',
    cuisine: 'Italian',
    calories: 520,
  },
  {
    id: 33,
    name: 'Garlic Bread',
    price: 89,
    image: '/food/i9.jpg',
    description: 'Toasted bread with garlic butter and herbs.',
    cuisine: 'Italian',
    calories: 210,
  },
  {
    id: 34,
    name: 'Caesar Salad',
    price: 159,
    image: '/food/i10.jpg',
    description: 'Fresh lettuce with creamy dressing and croutons.',
    cuisine: 'Italian',
    calories: 260,
  },
  // Extra Japanese dishes (ensure at least 10)
  {
    id: 35,
    name: 'Miso Soup',
    price: 99,
    image: '/food/j3.jpg',
    description: 'Traditional Japanese soup with tofu and seaweed.',
    cuisine: 'Japanese',
    calories: 90,
  },
  {
    id: 36,
    name: 'Tempura Vegetables',
    price: 199,
    image: '/food/j4.jpg',
    description: 'Lightly battered and fried seasonal vegetables.',
    cuisine: 'Japanese',
    calories: 310,
  },
  {
    id: 37,
    name: 'Teriyaki Tofu Bowl',
    price: 229,
    image: '/food/j5.png',
    description: 'Tofu and veggies glazed with teriyaki sauce over rice.',
    cuisine: 'Japanese',
    calories: 450,
  },
  {
    id: 38,
    name: 'Onigiri (Rice Balls)',
    price: 129,
    image: '/food/j6.jpg',
    description: 'Japanese rice balls with savory filling.',
    cuisine: 'Japanese',
    calories: 220,
  },
  {
    id: 39,
    name: 'Matcha Ice Cream',
    price: 149,
    image: '/food/j7.jpg',
    description: 'Green tea flavored creamy ice cream.',
    cuisine: 'Japanese',
    calories: 260,
  },
  {
    id: 40,
    name: 'Udon Noodles',
    price: 229,
    image: '/food/j8.jpg',
    description: 'Thick wheat noodles in mild broth with veggies.',
    cuisine: 'Japanese',
    calories: 420,
  },
  {
    id: 41,
    name: 'Okonomiyaki',
    price: 249,
    image: '/food/j9.jpg',
    description: 'Savory Japanese pancake with veggies and sauce.',
    cuisine: 'Japanese',
    calories: 480,
  },
  {
    id: 42,
    name: 'Edamame',
    price: 139,
    image: '/food/j10.jpg',
    description: 'Boiled young soybeans with sea salt.',
    cuisine: 'Japanese',
    calories: 190,
  },
]

const FoodOrdering = () => {
  const [menuData, setMenuData] = useState(menuItems)
  const [cart, setCart] = useState([])
  const [rewardPoints, setRewardPoints] = useState(0)
  const [applyDiscount, setApplyDiscount] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [interest, setInterest] = useState('all')
  const [recommendedIds, setRecommendedIds] = useState(new Set())
  const [orderMode, setOrderMode] = useState(null)
  const [restaurantMode, setRestaurantMode] = useState(null)
  const [checkoutStep, setCheckoutStep] = useState('cart')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderTimeline, setOrderTimeline] = useState([])
  const [activeStatus, setActiveStatus] = useState(0)
  const [prepTime, setPrepTime] = useState(null)
  const [etaTime, setEtaTime] = useState(null)
  const [deliveryPartner, setDeliveryPartner] = useState(null)
  const navigate = useNavigate()
  const user = getCurrentUser()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadRewardPoints()
    loadFoodItems()
  }, [user, navigate])

  const loadFoodItems = async () => {
    try {
      const response = await foodRecommendationAPI.getItems()
      if (response.data?.length) {
        // Keep the original full menu and only enrich with backend items if any new IDs exist.
        setMenuData((prev) => {
          const existingIds = new Set(prev.map((item) => item.id))
          const additionalItems = response.data.filter((item) => !existingIds.has(item.id))
          return additionalItems.length ? [...prev, ...additionalItems] : prev
        })
      }
    } catch (error) {
      console.error('Failed to load SQL-backed food items. Using local menu fallback.', error)
    }
  }

  const loadRecommendations = async (preference) => {
    if (!preference || preference === 'all') {
      setRecommendedIds(new Set())
      return
    }
    try {
      const response = await foodRecommendationAPI.recommend(preference)
      setRecommendedIds(new Set((response.data || []).map((item) => item.id)))
    } catch (error) {
      console.error('Failed to load recommendations:', error)
      setRecommendedIds(new Set())
    }
  }

  const loadRewardPoints = async () => {
    try {
      const response = await rewardsAPI.getBalance(user.id)
      setRewardPoints(response.data)
    } catch (error) {
      console.error('Failed to load reward points:', error)
    }
  }

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id)
    if (existingItem) {
      setCart(cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
      }
      return item
    }).filter(Boolean))
  }

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = applyDiscount ? Math.min(rewardPoints * 0.1, subtotal * 0.2) : 0
    const totalCalories = cart.reduce(
      (sum, item) => sum + (item.calories || 0) * item.quantity,
      0
    )
    return {
      subtotal,
      discount,
      total: subtotal - discount,
      totalCalories,
    }
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    setCheckoutStep('payment')
  }

  const { subtotal, discount, total, totalCalories } = calculateTotal()

  const matchesInterest = (item, category) => {
    if (category === 'all') return true
    const text = `${item.name} ${item.description}`.toLowerCase()
    const tags = (item.tags || []).map((tag) => tag.toLowerCase())
    if (category === 'healthy') {
      return item.calories <= 320 || text.includes('salad') || text.includes('soup') || text.includes('tofu') || tags.includes('healthy')
    }
    if (category === 'low-calorie') {
      return item.calories <= 220 || tags.includes('low-calorie')
    }
    if (category === 'vegan') {
      return text.includes('veg') || text.includes('vegetable') || text.includes('tofu') || tags.includes('vegan')
    }
    if (category === 'protein') {
      return text.includes('chicken') || text.includes('paneer') || text.includes('tofu') || tags.includes('protein')
    }
    if (category === 'spicy') {
      return text.includes('spicy') || text.includes('chilli') || text.includes('chili') || tags.includes('spicy')
    }
    return true
  }

  const filteredMenu =
    selectedCuisine === 'all'
      ? menuData
      : menuData.filter((item) => item.cuisine === selectedCuisine)

  useEffect(() => {
    if (interest !== 'all') {
      loadRecommendations(interest)
    } else {
      setRecommendedIds(new Set())
    }
  }, [interest, menuData.length])

  const visibleMenu = filteredMenu.filter((item) => {
    const matchesCategory = matchesInterest(item, interest)
    const matchesSearch = `${item.name} ${item.description}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
    return matchesCategory && matchesSearch
  })

  const confirmPaymentAndPlaceOrder = async () => {
    if (!paymentMethod) {
      alert('Please choose a payment option.')
      return
    }
    setLoading(true)
    try {
      const itemsDescription = cart.map((item) => `${item.name} x${item.quantity}`).join(', ')
      const resolvedUserId =
        user?.id != null ? Number(user.id) : user?.userId != null ? Number(user.userId) : null
      await foodOrderAPI.placeOrder({
        userId: Number.isFinite(resolvedUserId) ? resolvedUserId : null,
        itemsDescription,
        totalAmount: total,
      })

      const randomPrep = Math.floor(Math.random() * 16) + 15
      setPrepTime(randomPrep)

      if (orderMode === 'online') {
        const eta = randomPrep + Math.floor(Math.random() * 15) + 10
        setEtaTime(eta)
        setDeliveryPartner({
          name: ['Rahul', 'Arjun', 'Priya', 'Karan'][Math.floor(Math.random() * 4)],
          vehicle: ['Bike', 'Scooter'][Math.floor(Math.random() * 2)],
        })
        setOrderTimeline([
          'Order Confirmed',
          `Preparing your order in ${randomPrep} minutes`,
          'Delivery partner assigned',
          'Out for delivery',
          `Arriving in around ${eta} minutes`,
        ])
      } else {
        setOrderTimeline([
          'Order Assigned',
          `Preparing your order (${randomPrep} minutes)`,
          'Ready for pickup/serving',
        ])
      }
      setActiveStatus(0)
      setCheckoutStep('tracking')
      setCart([])
      setApplyDiscount(false)
      loadRewardPoints()
    } catch (error) {
      const serverMessage = error?.response?.data?.message
      const isNetworkIssue = !error?.response
      alert(
        serverMessage
          || (isNetworkIssue
            ? 'Cannot reach backend server. Please start Spring Boot backend on port 8080 and try again.'
            : 'Failed to place order. Please try again.')
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (checkoutStep !== 'tracking' || orderTimeline.length <= 1) return
    const interval = setInterval(() => {
      setActiveStatus((prev) => {
        if (prev >= orderTimeline.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [checkoutStep, orderTimeline])

  const restaurantPaymentOptions = [
    { value: 'upi_gpay', label: 'UPI - GPay' },
    { value: 'upi_phonepe', label: 'UPI - PhonePe' },
    { value: 'card', label: 'Credit / Debit Card' },
    { value: 'net_banking', label: 'Net Banking' },
    { value: 'cash_counter', label: 'Cash at Counter' },
  ]

  const onlinePaymentOptions = [
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'upi_delivery', label: 'UPI on Delivery' },
  ]

  const renderPaymentInterface = () => {
    if (!paymentMethod) {
      return <div className="payment-placeholder">Select a payment method to continue.</div>
    }

    if (paymentMethod.startsWith('upi')) {
      return (
        <div className="payment-dynamic">
          <h4>Scan & Pay with UPI</h4>
          <div className="qr-panel">
            <div className="qr-code-box">
              <div className="qr-grid" />
            </div>
            <div className="qr-meta">
              <p>Merchant: EcoFest Kitchen</p>
              <p>Amount: ₹{total.toFixed(2)}</p>
              <p>UPI ID: ecofest@upi</p>
            </div>
          </div>
          <p className="payment-help">Open GPay / PhonePe / any UPI app and scan this code to complete payment.</p>
        </div>
      )
    }

    if (paymentMethod === 'card') {
      return (
        <div className="payment-dynamic">
          <h4>Enter Card Details</h4>
          <div className="payment-input-grid">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Name on Card" />
            <input type="text" placeholder="MM/YY" />
            <input type="password" placeholder="CVV" />
          </div>
        </div>
      )
    }

    if (paymentMethod === 'net_banking') {
      return (
        <div className="payment-dynamic">
          <h4>Choose Bank</h4>
          <select className="payment-select" defaultValue="">
            <option value="" disabled>Select your bank</option>
            <option>State Bank of India</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
          </select>
          <p className="payment-help">You will be redirected to the secure bank page after confirmation.</p>
        </div>
      )
    }

    if (paymentMethod === 'cod') {
      return (
        <div className="cash-note">
          Cash on Delivery selected. Keep exact change ready for a faster handover.
        </div>
      )
    }

    if (paymentMethod === 'cash_counter') {
      return (
        <div className="cash-note">
          Please proceed to the counter, pay the amount, and collect your receipt.
        </div>
      )
    }

    return null
  }

  if (!orderMode || (orderMode === 'restaurant' && !restaurantMode)) {
    return (
      <div className="food-ordering">
        <div className="page-header">
          <h1>Food Ordering</h1>
          <p>Choose how you want to place your order</p>
        </div>
        <div className="mode-selection-card">
          <h3>Select Order Type</h3>
          <div className="mode-selection-grid">
            <button type="button" onClick={() => setOrderMode('restaurant')} className="mode-btn">Order from Restaurant</button>
            <button type="button" onClick={() => setOrderMode('online')} className="mode-btn">Order Online Delivery</button>
          </div>
          {orderMode === 'restaurant' && (
            <div className="restaurant-submode">
              <p>Choose service type:</p>
              <button type="button" onClick={() => setRestaurantMode('dine-in')} className={restaurantMode === 'dine-in' ? 'active' : ''}>Dine-In</button>
              <button type="button" onClick={() => setRestaurantMode('takeaway')} className={restaurantMode === 'takeaway' ? 'active' : ''}>Takeaway</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="food-ordering">
      <div className="page-header">
        <h1>Food Ordering</h1>
        <p>
          {orderMode === 'online'
            ? 'Online delivery flow enabled'
            : `Restaurant order flow${restaurantMode ? ` - ${restaurantMode}` : ''}`}
        </p>
      </div>

      <div className="food-ordering-container">
        <div className="menu-section">
          <h2>Menu</h2>
          <input
            className="menu-search-input"
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="recommend-bar">
            <span>Category filters:</span>
            {['all', 'healthy', 'low-calorie', 'vegan', 'protein', 'spicy'].map((value) => (
              <button
                key={value}
                type="button"
                className={`pref-btn ${interest === value ? 'active' : ''}`}
                onClick={() => setInterest(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="cuisine-filters">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                className={`cuisine-filter-btn${
                  selectedCuisine === cuisine ? ' active' : ''
                }`}
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine === 'all' ? 'All' : cuisine}
              </button>
            ))}
          </div>
          <div className="menu-items">
            {visibleMenu.map((item) => (
              <div key={item.id} className={`menu-item ${recommendedIds.has(item.id) ? 'recommended' : ''}`}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="item-meta">
                    <span className="item-price">₹{item.price}</span>
                    <span className="item-calories">{item.calories} kcal</span>
                  </div>
                </div>
                <button onClick={() => addToCart(item)} className="add-btn">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <h2>Your Order</h2>
          <div className="flow-badge">
            {orderMode === 'online' ? 'Online Delivery' : `Restaurant - ${restaurantMode || 'select dine-in/takeaway'}`}
          </div>
          <div className="reward-info">
            <span>⭐ Your Eco Points: {rewardPoints}</span>
            {rewardPoints > 0 && (
              <label className="discount-toggle">
                <input
                  type="checkbox"
                  checked={applyDiscount}
                  onChange={(e) => setApplyDiscount(e.target.checked)}
                />
                Apply Eco Rewards (10% of points, max 20% off)
              </label>
            )}
          </div>

          {checkoutStep === 'tracking' ? (
            <div className="tracking-panel">
              <h3>Order Status</h3>
              {orderMode === 'online' && deliveryPartner && (
                <div className="delivery-partner">
                  <span className="partner-avatar">🛵</span>
                  <div>
                    <strong>{deliveryPartner.name}</strong>
                    <p>{deliveryPartner.vehicle} partner assigned</p>
                    {etaTime && <p>Estimated delivery: {etaTime} min</p>}
                  </div>
                </div>
              )}
              {orderMode !== 'online' && prepTime && (
                <div className="cash-note">Estimated preparation time: {prepTime} minutes</div>
              )}
              <div className="timeline-list">
                {orderTimeline.map((status, index) => (
                  <div key={status} className={`timeline-item ${index <= activeStatus ? 'done' : ''}`}>
                    <span className="dot" />
                    <p>{status}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price} each</p>
                      <p>{item.calories} kcal each</p>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">×</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row calories-row">
                  <span>Total Calories:</span>
                  <span>{totalCalories} kcal</span>
                </div>
                {applyDiscount && (
                  <div className="summary-row discount-row">
                    <span>Eco Rewards Discount:</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button onClick={handleCheckout} className="checkout-btn" disabled={loading}>
                  Continue to Payment
                </button>
              ) : (
                <div className="payment-panel">
                  <h3>Select Payment Method</h3>
                  <div className="payment-options">
                    {(orderMode === 'online' ? onlinePaymentOptions : restaurantPaymentOptions).map((option) => (
                      <label key={option.value} className="payment-option">
                        <input
                          type="radio"
                          name="payment-method"
                          checked={paymentMethod === option.value}
                          onChange={() => setPaymentMethod(option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {renderPaymentInterface()}
                  <button onClick={confirmPaymentAndPlaceOrder} className="checkout-btn" disabled={loading}>
                    {loading ? 'Confirming...' : 'Confirm Order'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodOrdering
