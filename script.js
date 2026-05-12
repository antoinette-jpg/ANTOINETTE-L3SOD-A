const vipData = [
  { 
    name: 'Royal Suite', 
    description: 'Ultra-private suite with premium service.', 
    price: 104000, 
    capacity: 12,
    amenities: ['Private bar', 'Bottle service', 'Sound system'],
    image: './images/vip rooms.png'
  },
  { 
    name: 'Gold Lounge', 
    description: 'Elegant space with lounge seating and drinks.', 
    price: 71300, 
    capacity: 8,
    amenities: ['Velvet seating', 'Dedicated waiter', 'Mood lighting'],
    image: './images/vip rooms.png'
  },
  { 
    name: 'Skybar Booth', 
    description: 'Exclusive room with custom catering and city views.', 
    price: 58500, 
    capacity: 6,
    amenities: ['Open-air view', 'City skyline', 'Premium drinks'],
    image: './images/vip rooms.png'
  }
];
let menuData = JSON.parse(localStorage.getItem('gikundiroMenu')) || [
  { name: 'Grilled Chicken', desc: 'Tender chicken marinated in herbs and grilled over open flame.', price: 18200, category: 'FOODS', image: './images/JUNGLE GRILL.jfif' },
  { name: 'Beef Brochettes', desc: 'Skewered beef cubes marinated in African spices, grilled to perfection.', price: 13000, category: 'FOODS', image: './images/"The JUICIEST BBQ Kebabs Ever! 🤤🔥 _ Perfect Grill Shots!".jfif' },
  { name: 'Goat Brochettes', desc: 'Tender goat skewers with peppers — a local Rwandan favorite.', price: 14300, category: 'FOODS', image: './images/"The JUICIEST BBQ Kebabs Ever! 🤤🔥 _ Perfect Grill Shots!".jfif' },
  { name: 'Fish Fillet', desc: 'Fresh Nile perch fillet grilled with lemon and herbs.', price: 21500, category: 'FOODS', image: './images/Easy Saucy Ramen Noodles (Vegan Recipe).jfif' },
  { name: 'Ugali & Sukuma Wiki', desc: 'Traditional maize meal with sautéed collard greens.', price: 8500, category: 'FOODS', image: './images/america-vibes.jfif' },
  { name: 'Chicken Wings', desc: 'Crispy fried wings with spicy buffalo sauce.', price: 12500, category: 'FOODS', image: './images/download (20).jfif' },
  { name: 'French Fries', desc: 'Golden crispy fries with sea salt.', price: 6500, category: 'FOODS', image: './images/download (22).jfif' },
  { name: 'Caesar Salad', desc: 'Fresh romaine lettuce with parmesan and croutons.', price: 9500, category: 'FOODS', image: './images/download (23).jfif' },
  { name: 'Gold Cocktail', desc: 'Signature drink with citrus notes and premium spirits.', price: 3200, category: 'DRINKS', image: './images/download (12).jfif' },
  { name: 'Red Wine', desc: 'Fine selection of red wine from renowned vineyards.', price: 3800, category: 'DRINKS', image: './images/download (13).jfif' },
  { name: 'White Wine', desc: 'Chilled white wine with crisp, fruity notes.', price: 4200, category: 'DRINKS', image: './images/download (14).jfif' },
  { name: 'Beer (Local)', desc: 'Premium Rwandan beer, cold and refreshing.', price: 2500, category: 'DRINKS', image: './images/download (24).jfif' },
  { name: 'Imported Beer', desc: 'International beer selection from around the world.', price: 3500, category: 'DRINKS', image: './images/download (25).jfif' },
  { name: 'Mojito', desc: 'Classic Cuban cocktail with mint, lime, and rum.', price: 4500, category: 'DRINKS', image: './images/download (20).jfif' },
  { name: 'Margarita', desc: 'Tequila-based cocktail with lime and triple sec.', price: 4800, category: 'DRINKS', image: './images/download (22).jfif' },
  { name: 'Fanta', desc: 'Chilled citrus soda to refresh your palate.', price: 900, category: 'BEVERAGES', image: './images/download (23).jfif' },
  { name: 'Coca Cola', desc: 'Classic cola drink, ice cold.', price: 900, category: 'BEVERAGES', image: './images/download (24).jfif' },
  { name: 'Fresh Juice', desc: 'Freshly squeezed orange or pineapple juice.', price: 1800, category: 'BEVERAGES', image: './images/download (25).jfif' },
  { name: 'Mineral Water', desc: 'Sparkling or still mineral water.', price: 800, category: 'BEVERAGES', image: './images/Easy Saucy Ramen Noodles (Vegan Recipe).jfif' },
  { name: 'Coffee', desc: 'Freshly brewed Arabica coffee from Rwandan highlands.', price: 1200, category: 'BEVERAGES', image: './images/america-vibes.jfif' }
];
const eventData = [
  { name: 'Live DJ Night', date: 'May 25', desc: 'Dance with world-class DJs until dawn.' },
  { name: 'Champagne Party', date: 'June 12', desc: 'Premium bubbles and VIP atmosphere.' },
  { name: 'Supper Lounge', date: 'July 3', desc: 'Gourmet menu with live music.' }
];
const currencyRates = { RWF: 1, USD: 0.0010, EUR: 0.00095 };
const currencySymbols = { RWF: 'RWF', USD: '$', EUR: '€' };
let currentCurrency = 'RWF';
let cart = [];

const vipGrid = document.getElementById('vip-grid');
const menuGrid = document.getElementById('menu-grid');
const eventGrid = document.getElementById('event-grid');
const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const languageSelect = document.getElementById('language-select');
const currencySelect = document.getElementById('currency-select');
const themeBtn = document.getElementById('theme-btn');
const loginBtn = document.getElementById('login-btn');
const loginIcon = document.getElementById('login-icon');
const userStatus = document.getElementById('user-status');
const userDot = document.getElementById('user-dot');
const authModal = document.getElementById('auth-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const loginTab = document.getElementById('modal-login-tab');
const signupTab = document.getElementById('modal-signup-tab');
const authTitle = document.getElementById('modal-title');
const authForm = document.getElementById('auth-form');
const authName = document.getElementById('auth-name');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authConfirm = document.getElementById('auth-confirm');
const authSubmit = document.getElementById('auth-submit');
const authMessage = document.getElementById('auth-message');
const authNameField = document.querySelector('.auth-name');
const authConfirmField = document.querySelector('.auth-confirm');
const reserveForm = document.getElementById('reserve-form');
const reserveMessage = document.getElementById('reserve-message');
const topBtn = document.getElementById('top-btn');
const authToggleBtn = document.getElementById('auth-toggle-btn');
const authTogglePrompt = document.getElementById('auth-toggle-prompt');

const users = JSON.parse(localStorage.getItem('gikundiroUsers')) || [];
let authMode = 'login';
let currentUser = JSON.parse(localStorage.getItem('gikundiroCurrent')) || null;

function formatPrice(amount) {
  const rate = currencyRates[currentCurrency];
  return `${currencySymbols[currentCurrency]}${Math.round(amount * rate).toLocaleString()}`;
}

function renderVIP() {
  vipGrid.innerHTML = vipData.map(room => `
    <article class="vip-card">
      ${room.image ? `<div class="vip-image" style="background-image: url('${room.image}')"></div>` : ''}
      <div class="vip-content">
        <h3>${room.name}</h3>
        <div class="vip-info">
          <span class="vip-capacity"><i class="fas fa-users"></i>${room.capacity}</span>
          <span class="vip-price"><i class="fas fa-crown"></i>${formatPrice(room.price)}/hour</span>
        </div>
        <div class="vip-amenities">
          ${room.amenities.map(amenity => `<div class="amenity"><i class="fas fa-check-circle"></i>${amenity}</div>`).join('')}
        </div>
        <button class="btn-book-now" data-vip="${room.name}" data-price="${room.price}">Book Now</button>
      </div>
    </article>
  `).join('');
}

function renderMenu() {
  menuGrid.innerHTML = menuData.map(item => `
    <article class="menu-card">
      ${item.image ? `<div class="menu-image" style="background-image: url('${item.image}')"></div>` : ''}
      <div class="menu-content">
        <h3>${item.name}</h3>
        <span class="menu-price">${formatPrice(item.price)}</span>
        <span class="menu-category">${item.category}</span>
        <p>${item.desc}</p>
        <div class="menu-actions">
          <a href="#" class="view-details">VIEW DETAILS →</a>
          <button class="btn-add-cart" data-menu="${item.name}" data-price="${item.price}">+ ADD TO CART</button>
        </div>
      </div>
    </article>
  `).join('');
  
  // Add event listeners for cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.dataset.menu;
      const price = parseFloat(btn.dataset.price);
      addToCart(name, price);
    });
  });
}

function renderEvents() {
  eventGrid.innerHTML = eventData.map(event => `
    <article class="event-card">
      <div class="event-meta"><span>${event.date}</span><span>${event.name}</span></div>
      <p>${event.desc}</p>
      <button class="btn btn-secondary" data-event="${event.name}">Reserve Spot</button>
    </article>
  `).join('');
}

function updateCart() {
  cartItems.innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>${item.quantity} x ${formatPrice(item.price)}</p>
      </div>
      <button class="icon-button remove-btn" data-name="${item.name}"><i class="fas fa-trash"></i></button>
    </div>
  `).join('') : '<p>Your cart is empty.</p>';
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatPrice(total);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  updateCart();
}

function toggleAuthModal(show) {
  authModal.classList.toggle('active', show);
}

const themeModes = ['dark', 'white', 'gold-black', 'gold-white'];
let currentTheme = localStorage.getItem('gikundiroTheme') || 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  document.body.dataset.theme = theme;
  if (themeBtn) {
    themeBtn.title = `Change theme (current: ${theme.replace('-', ' ')})`;
  }
  localStorage.setItem('gikundiroTheme', theme);
}

function cycleTheme() {
  const currentIndex = themeModes.indexOf(currentTheme);
  const nextTheme = themeModes[(currentIndex + 1) % themeModes.length];
  applyTheme(nextTheme);
}

function setAuthMode(mode) {
  authMode = mode;
  loginTab.classList.toggle('active', mode === 'login');
  signupTab.classList.toggle('active', mode === 'signup');
  authTitle.textContent = mode === 'login' ? 'Customer Login' : 'Customer Sign Up';
  authSubmit.textContent = mode === 'login' ? 'Login' : 'Sign Up';
  authNameField.style.display = mode === 'signup' ? 'block' : 'none';
  authConfirmField.style.display = mode === 'signup' ? 'block' : 'none';
  authName.required = mode === 'signup';
  authConfirm.required = mode === 'signup';
  authEmail.placeholder = 'Email';
  authMessage.textContent = '';
  authTogglePrompt.innerHTML = mode === 'login' ? 'Don\'t have an account? <button type="button" id="auth-toggle-btn" class="toggle-link">Sign up here</button>' : 'Already have an account? <button type="button" id="auth-toggle-btn" class="toggle-link">Login here</button>';
  authForm.reset();
}

function showMessage(message) {
  authMessage.textContent = message;
}

function loginUser(user) {
  currentUser = user;
  localStorage.setItem('gikundiroCurrent', JSON.stringify(user));
  updateAuthHeader();
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('gikundiroCurrent');
  updateAuthHeader();
  showMessage('Logged out successfully.');
}

function updateAuthHeader() {
  const loggedIn = Boolean(currentUser);
  loginBtn.title = loggedIn ? 'Logout' : 'Login';
  loginIcon.className = loggedIn ? 'fas fa-user-check' : 'fas fa-user-circle';
  userStatus.textContent = loggedIn ? `Logged in as ${currentUser.name || currentUser.email}` : 'Logged out';
  userStatus.classList.toggle('logged-in', loggedIn);
  userStatus.classList.toggle('logged-out', !loggedIn);
  userDot.classList.toggle('online', loggedIn);
}

function changeLanguage(lang) {
  const labels = {
    en: { home: 'Home', vip: 'VIP Rooms', menu: 'Menu', services: 'Services', gallery: 'Gallery', events: 'Events', reserve: 'Reserve' },
    sw: { home: 'Nyumbani', vip: 'Chumba VIP', menu: 'Chakula', services: 'Huduma', gallery: 'Matukio', events: 'Matukio', reserve: 'Hifadhi' },
    rw: { home: 'Mukuru', vip: 'Icyumba VIP', menu: 'Imenu', services: 'Serivisi', gallery: 'Ishusho', events: 'Ibirori', reserve: 'Bika' }
  }[lang];
  document.querySelectorAll('.nav-links a').forEach((link, idx) => {
    const keys = ['home','vip','menu','services','gallery','events','reserve'];
    link.textContent = labels[keys[idx]];
  });
}

function changeCurrency(currency) {
  currentCurrency = currency;
  renderVIP();
  renderMenu();
  updateCart();
}

document.addEventListener('click', event => {
  if (event.target.matches('[data-menu]')) {
    addToCart(event.target.dataset.menu, Number(event.target.dataset.price));
  }
  if (event.target.matches('[data-vip]')) {
    addToCart(event.target.dataset.vip, Number(event.target.dataset.price));
  }
  if (event.target.matches('[data-event]')) {
    showMessage(`Reserved spot for ${event.target.dataset.event}.`);
  }
  if (event.target.matches('.remove-btn')) {
    const name = event.target.dataset.name;
    cart = cart.filter(item => item.name !== name);
    updateCart();
  }
});

cartBtn.addEventListener('click', () => cartPanel.classList.toggle('active'));
cartClose.addEventListener('click', () => cartPanel.classList.remove('active'));

// Checkout functionality
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showMessage('Your cart is empty. Add items before checkout.');
      return;
    }
    
    // Get current user or use guest
    const user = currentUser || { name: 'Guest Customer', email: 'guest@example.com' };
    
    // Create order data
    const orderData = {
      orderId: generateOrderId(),
      customerName: user.name,
      customerEmail: user.email,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: getItemCategory(item.name)
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString()
    };
    
    // Clear cart after checkout
    cart = [];
    updateCart();
    cartPanel.classList.remove('active');
    
    // Redirect to receipt page with order data
    const orderParams = encodeURIComponent(JSON.stringify(orderData));
    window.location.href = `receipt.html?order=${orderParams}`;
  });
}

// Generate unique order ID
function generateOrderId() {
  const date = new Date();
  const timestamp = date.getTime();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

// Get item category from menu data
function getItemCategory(itemName) {
  const menuItem = menuData.find(item => item.name === itemName);
  return menuItem ? menuItem.category : '';
}
loginBtn.addEventListener('click', () => {
  if (currentUser) {
    logoutUser();
    return;
  }
  setAuthMode('login');
  toggleAuthModal(true);
});
modalCloseBtn.addEventListener('click', () => toggleAuthModal(false));
loginTab.addEventListener('click', () => setAuthMode('login'));
signupTab.addEventListener('click', () => setAuthMode('signup'));

authForm.addEventListener('click', (e) => {
  if (e.target.id === 'auth-toggle-btn') {
    e.preventDefault();
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  }
});

authForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = authName.value.trim();
  const email = authEmail.value.trim();
  const password = authPassword.value.trim();
  const confirm = authConfirm.value.trim();
  if (authMode === 'login') {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      loginUser(user);
      toggleAuthModal(false);
      showMessage('Login successfully.');
      return;
    }
    showMessage('Incorrect credentials.');
    return;
  }
  if (!name || !email || !password || !confirm) { showMessage('Complete all fields.'); return; }
  if (password !== confirm) { showMessage('Passwords must match.'); return; }
  if (users.some(u => u.email === email)) { showMessage('Email already registered.'); return; }
  users.push({ name, email, password });
  localStorage.setItem('gikundiroUsers', JSON.stringify(users));
  showMessage('Your account was created successfully.');
  setAuthMode('login');
  authForm.reset();
});

updateAuthHeader();

reserveForm.addEventListener('submit', event => {
  event.preventDefault();
  reserveMessage.textContent = 'Reservation confirmed. We will contact you shortly.';
  reserveForm.reset();
});

languageSelect.addEventListener('change', e => changeLanguage(e.target.value));
currencySelect.addEventListener('change', e => changeCurrency(e.target.value));
if (themeBtn) {
  themeBtn.addEventListener('click', cycleTheme);
}

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

renderVIP();
renderMenu();
renderEvents();
updateCart();
changeLanguage('en');
setAuthMode('login');
applyTheme(currentTheme);
