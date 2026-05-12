const page = document.body.dataset.page;
const storageKey = 'gikundiro_customers';
const currentUserKey = 'gikundiro_current_customer';
const adminFlag = 'gikundiro_admin_logged_in';
const rememberedEmailKey = 'gikundiro_remembered_email';

const alertBox = document.getElementById('alert-box');
const logoutBtn = document.getElementById('logout-btn');

const adminEmail = 'admin@gikundiro.com';
const adminPassword = 'admin123';

function getCustomers() {
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function saveCustomers(customers) {
  localStorage.setItem(storageKey, JSON.stringify(customers));
}

function setCurrentCustomer(customer) {
  localStorage.setItem(currentUserKey, JSON.stringify(customer));
}

function clearCurrentCustomer() {
  localStorage.removeItem(currentUserKey);
}

function getCurrentCustomer() {
  return JSON.parse(localStorage.getItem(currentUserKey) || 'null');
}

function setAdminLoggedIn(value) {
  localStorage.setItem(adminFlag, JSON.stringify(value));
}

function isAdminLoggedIn() {
  return JSON.parse(localStorage.getItem(adminFlag) || 'false');
}

function showAlert(message, type = 'error') {
  if (!alertBox) return;
  alertBox.textContent = message;
  alertBox.className = `alert-box show ${type}`;
}

function clearAlert() {
  if (!alertBox) return;
  alertBox.textContent = '';
  alertBox.className = 'alert-box';
}

function setLoading(button, isLoading) {
  if (!button) return;
  button.disabled = isLoading;
  button.classList.toggle('btn-loading', isLoading);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function togglePassword(event) {
  const button = event.currentTarget;
  const targetId = button.dataset.target;
  const input = document.getElementById(targetId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  button.innerHTML = `<i class="fa-solid ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
}

function redirect(path) {
  window.location.href = path;
}

const currencySelect = document.getElementById('currency-select');
const currencyIcon = document.getElementById('currency-icon');
const themeButton = document.getElementById('theme-btn');

const currencyIcons = {
  RWF: 'fa-money-bill',
  USD: 'fa-dollar-sign',
  EUR: 'fa-euro-sign'
};

function updateCurrencyIcon(value) {
  if (!currencyIcon) return;
  const iconClass = currencyIcons[value] || 'fa-money-bill';
  currencyIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
}

function updateThemeButton(theme) {
  if (!themeButton) return;
  const iconClass = theme === 'white' ? 'fa-sun' : 'fa-moon';
  themeButton.innerHTML = `<i class="fas ${iconClass}"></i>`;
  themeButton.title = theme === 'white' ? 'Switch to dark background' : 'Switch to white background';
}

function applyTheme(theme) {
  const selectedTheme = theme === 'white' ? 'white' : 'black';
  document.body.dataset.theme = selectedTheme;
  localStorage.setItem('site-theme', selectedTheme);
  updateThemeButton(selectedTheme);
}

function toggleTheme() {
  const currentTheme = document.body.dataset.theme === 'white' ? 'white' : 'black';
  applyTheme(currentTheme === 'white' ? 'black' : 'white');
}

function initializeCurrencyAndTheme() {
  const savedTheme = localStorage.getItem('site-theme') || 'black';
  applyTheme(savedTheme);

  if (currencySelect) {
    updateCurrencyIcon(currencySelect.value);
    currencySelect.addEventListener('change', () => updateCurrencyIcon(currencySelect.value));
  }

  if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
  }
}

function loadRememberedEmail() {
  const saved = localStorage.getItem(rememberedEmailKey);
  if (!saved) return;
  const emailInput = document.getElementById('login-email');
  if (emailInput) {
    emailInput.value = saved;
    document.getElementById('remember-me').checked = true;
  }
}

function saveRememberedEmail(email) {
  localStorage.setItem(rememberedEmailKey, email);
}

function clearAllData() {
  localStorage.removeItem(storageKey);
  localStorage.removeItem(currentUserKey);
  localStorage.removeItem(adminFlag);
  localStorage.removeItem(rememberedEmailKey);
  console.log('All localStorage data cleared');
}

// Uncomment the line below to clear all data on page load (for testing)
// clearAllData();

function attachPasswordToggles() {
  document.querySelectorAll('.eye-toggle').forEach(button => {
    button.addEventListener('click', togglePassword);
  });
}

function customerLoginPage() {
  loadRememberedEmail();
  const form = document.getElementById('login-form');
  const button = document.getElementById('login-button');

  form?.addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const remember = document.getElementById('remember-me').checked;

    if (!email || !password) {
      return showAlert('Please fill in all fields.');
    }

    if (!validateEmail(email)) {
      return showAlert('Please enter a valid email address.');
    }

    setLoading(button, true);
    setTimeout(() => {
      const customers = getCustomers();
      console.log('Stored customers:', customers);
      console.log('Login attempt:', { email: email.toLowerCase(), password });

      const user = customers.find(item => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
      console.log('Found user:', user);

      setLoading(button, false);
      if (!user) {
        return showAlert('Invalid email or password.');
      }

      if (remember) {
        saveRememberedEmail(email);
      } else {
        clearRememberedEmail();
      }

      setCurrentCustomer({ name: user.name, email: user.email });
      showAlert('Login successfully.', 'success');
      setTimeout(() => redirect('customer-dashboard.html'), 900);
    }, 900);
  });
}

function customerSignupPage() {
  const form = document.getElementById('signup-form');
  const button = document.getElementById('signup-button');

  form?.addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirm = document.getElementById('signup-confirm').value.trim();

    if (!name || !email || !password || !confirm) {
      return showAlert('All fields are required.');
    }

    if (!validateEmail(email)) {
      return showAlert('Enter a valid email address.');
    }

    if (password.length < 6) {
      return showAlert('Password must be at least 6 characters long.');
    }

    if (password !== confirm) {
      return showAlert('Passwords do not match.');
    }

    const customers = getCustomers();
    if (customers.some(item => item.email.toLowerCase() === email.toLowerCase())) {
      return showAlert('Email is already registered.');
    }

    setLoading(button, true);
    setTimeout(() => {
      customers.push({ name, email, password });
      saveCustomers(customers);
      console.log('User signed up:', { name, email, password });
      console.log('All customers after signup:', getCustomers());
      setLoading(button, false);
      showAlert('Your account was created successfully.', 'success');
      form.reset();
      setTimeout(() => redirect('customer-login.html'), 1200);
    }, 1000);
  });
}

function adminLoginPage() {
  const form = document.getElementById('admin-form');
  const button = document.getElementById('admin-button');

  form?.addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();

    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;

    if (!email || !password) {
      return showAlert('Fill in both fields to continue.');
    }

    if (!validateEmail(email)) {
      return showAlert('Enter a valid email address.');
    }

    setLoading(button, true);
    setTimeout(() => {
      setLoading(button, false);
      if (email.toLowerCase() !== adminEmail || password !== adminPassword) {
        return showAlert('Invalid admin credentials.');
      }
      setAdminLoggedIn(true);
      showAlert('Admin login successfully.', 'success');
      setTimeout(() => redirect('admin-dashboard.html'), 900);
    }, 900);
  });
}

function customerDashboardPage() {
  const user = getCurrentCustomer();
  if (!user) {
    redirect('customer-login.html');
    return;
  }

  const title = document.getElementById('dashboard-title');
  const message = document.getElementById('dashboard-message');

  if (title) title.textContent = `${user.name}`;
  if (message) message.textContent = `Welcome back, ${user.name}. Your customer dashboard is ready to review bookings and premium offers.`;

  logoutBtn?.addEventListener('click', () => {
    clearCurrentCustomer();
    redirect('customer-login.html');
  });
}

function adminDashboardPage() {
  if (!isAdminLoggedIn()) {
    redirect('admin-login.html');
    return;
  }

  logoutBtn?.addEventListener('click', () => {
    setAdminLoggedIn(false);
    redirect('admin-login.html');
  });
}

attachPasswordToggles();
initializeCurrencyAndTheme();

if (page === 'customer-login') {
  customerLoginPage();
}

if (page === 'customer-signup') {
  customerSignupPage();
}

if (page === 'admin-login') {
  adminLoginPage();
}

if (page === 'customer-dashboard') {
  customerDashboardPage();
}

if (page === 'admin-dashboard') {
  adminDashboardPage();
}
