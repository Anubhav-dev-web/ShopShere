// Main JavaScript file for homepage functionality

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the homepage
  initHomepage();
});

function initHomepage() {
  // Load featured products on the homepage
  loadFeaturedProducts();

  // Load best selling products on the homepage
  loadBestSellingProducts();

  // Add event listeners for navigation
  setupNavigation();

  // Setup main search functionality
  setupMainSearch();

  // Update cart count display
  updateCartCountDisplay();

  // Setup newsletter subscription functionality
  setupNewsletterSubscription();
}

function loadFeaturedProducts() {
  const featuredProductsContainer =
    document.getElementById('featured-products');

  if (!featuredProductsContainer) return;

  // Get featured products (mix of categories)
  const featuredProducts = getFeaturedProducts(3);

  if (featuredProducts.length === 0) {
    featuredProductsContainer.innerHTML =
      '<p>No products available at the moment.</p>';
    return;
  }

  // Clear existing content
  featuredProductsContainer.innerHTML = '';

  // Create product cards
  featuredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    featuredProductsContainer.appendChild(productCard);
  });
}

function loadBestSellingProducts() {
  const bestSellingProductsContainer = document.getElementById(
    'best-selling-products'
  );

  if (!bestSellingProductsContainer) return;

  // Get best selling products (mix of categories)
  const bestSellingProducts = getBestSellingProducts(3);

  if (bestSellingProducts.length === 0) {
    bestSellingProductsContainer.innerHTML =
      '<p>No best selling products available at the moment.</p>';
    return;
  }

  // Clear existing content
  bestSellingProductsContainer.innerHTML = '';

  // Create product cards
  bestSellingProducts.forEach((product) => {
    const productCard = createProductCard(product);
    bestSellingProductsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  // Check if product is in wishlist
  const isWishlisted = isInWishlist(product.id);

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${
    product.name
  }" loading="lazy" onload="this.classList.add('loaded')" onerror="this.style.display='none'">
            <button class="wishlist-btn ${
              isWishlisted ? 'active' : ''
            }" onclick="toggleWishlist(${product.id}, this)">
                <i class="bx bx-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;

  // Add click event to navigate to product detail
  card.addEventListener('click', function (e) {
    if (
      !e.target.classList.contains('add-to-cart-btn') &&
      !e.target.classList.contains('wishlist-btn') &&
      !e.target.closest('.wishlist-btn')
    ) {
      window.location.href = `product.html?id=${product.id}`;
    }
  });

  return card;
}

function setupNavigation() {
  // Add cart count to navigation if cart exists
  updateCartCount();
}

function setupMainSearch() {
  const mainSearch = document.getElementById('main-search');

  if (mainSearch) {
    mainSearch.addEventListener('input', function () {
      const query = this.value.trim();
      if (query.length > 2) {
        // Store search query for shop page
        localStorage.setItem('mainSearchQuery', query);
      }
    });

    mainSearch.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          localStorage.setItem('mainSearchQuery', query);
          window.location.href = 'shop.html';
        }
      }
    });
  }
}

function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update cart count display
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();

  // You can add a cart count badge to the navigation here
  if (cartCount > 0) {
    console.log(`Cart has ${cartCount} items`);
  }
}

function updateCartCountDisplay() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
    if (cartCount === 0) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }
  });
}

function updateWishlistCountDisplay() {
  const wishlistCountElements = document.querySelectorAll('#wishlist-count');
  const wishlist = getWishlist();
  const wishlistCount = wishlist.length;

  wishlistCountElements.forEach((element) => {
    element.textContent = wishlistCount;
    if (wishlistCount === 0) {
      element.style.display = 'none';
    } else {
      element.style.display = 'flex';
    }
  });
}

function toggleWishlist(productId, button) {
  const isWishlisted = isInWishlist(productId);

  if (isWishlisted) {
    // Remove from wishlist
    removeFromWishlist(productId);
    button.classList.remove('active');
    showNotification('Removed from wishlist', 'info');
  } else {
    // Add to wishlist
    addToWishlist(productId);
    button.classList.add('active');
    showNotification('Added to wishlist', 'success');
  }

  // Update wishlist count display
  updateWishlistCountDisplay();
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  const bgColor =
    type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3';

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${bgColor};
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 500;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Cart functions (shared across pages)
function getCart() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return [];
  const userData = getUserData(currentUser.email);
  return userData.cart || [];
}

function addToCart(productId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const key = 'user_' + currentUser.email;
  const userData = JSON.parse(localStorage.getItem(key) || '{}');
  userData.cart = userData.cart || [];
  const cart = userData.cart;
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = getProductById(productId);
    if (product) {
      cart.push({
        productId: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
  }

  userData.cart = cart;
  localStorage.setItem(key, JSON.stringify(userData));
  localStorage.setItem('cart', JSON.stringify(cart)); // for compatibility

  // Show success message
  showNotification('Product added to cart!', 'success');

  // Update cart count
  updateCartCount();
}

function getWishlist() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return [];
  const userData = getUserData(currentUser.email);
  return userData.wishlist || [];
}

function addToWishlist(productId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const key = 'user_' + currentUser.email;
  const userData = JSON.parse(localStorage.getItem(key) || '{}');
  userData.wishlist = userData.wishlist || [];
  if (!userData.wishlist.includes(productId)) {
    userData.wishlist.push(productId);
    localStorage.setItem(key, JSON.stringify(userData));
    localStorage.setItem('wishlist', JSON.stringify(userData.wishlist)); // for compatibility
  }
}

function removeFromWishlist(productId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const key = 'user_' + currentUser.email;
  const userData = JSON.parse(localStorage.getItem(key) || '{}');
  userData.wishlist = userData.wishlist || [];
  userData.wishlist = userData.wishlist.filter((id) => id !== productId);
  localStorage.setItem(key, JSON.stringify(userData));
  localStorage.setItem('wishlist', JSON.stringify(userData.wishlist)); // for compatibility
}

// Debug: Notify when order is saved
function saveOrder(cart) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const key = 'user_' + currentUser.email;
  let userData = JSON.parse(localStorage.getItem(key) || '{}');
  userData.orders = userData.orders || [];
  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: 'Placed',
  };
  userData.orders.push(newOrder);
  userData.cart = [];
  localStorage.setItem(key, JSON.stringify(userData));
  localStorage.setItem('orders', JSON.stringify(userData.orders)); // for legacy code
  localStorage.setItem('cart', JSON.stringify([])); // clear global cart
  showNotification(
    'Order placed and saved for user: ' + currentUser.email,
    'success'
  );
}

// Patch order placement logic in checkout
if (window.location.pathname.includes('checkout.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', function () {
        // Always use per-user cart
        const currentUser = JSON.parse(
          localStorage.getItem('currentUser') || 'null'
        );
        let cart = [];
        if (currentUser && currentUser.email) {
          const key = 'user_' + currentUser.email;
          const userData = JSON.parse(localStorage.getItem(key) || '{}');
          cart = userData.cart || [];
        }
        if (cart.length) {
          saveOrder(cart);
        }
      });
    }
  });
}

function autofillShippingInfo() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) return;
  const fields = [
    { id: 'full-name', value: currentUser.username },
    { id: 'email', value: currentUser.email },
    { id: 'address', value: currentUser.address },
    { id: 'city', value: currentUser.city },
    { id: 'zip-code', value: currentUser.zip },
  ];
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (input && field.value) input.value = field.value;
  });
}

if (window.location.pathname.includes('checkout.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    autofillShippingInfo();
  });
}

function getUserKey(email) {
  return `user_${email}`;
}

function initializeUserData(email) {
  const key = getUserKey(email);
  const userData = {
    cart: [],
    wishlist: [],
    personalInfo: {},
    orders: [],
  };
  localStorage.setItem(key, JSON.stringify(userData));
}

function getUserData(email) {
  const key = getUserKey(email);
  return JSON.parse(localStorage.getItem(key) || '{}');
}

function setUserData(email, data) {
  const key = getUserKey(email);
  localStorage.setItem(key, JSON.stringify(data));
}

// Patch account creation to initialize user data
function setupSignUpForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    if (!username || !email || !password) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }
    if (password.length < 6) {
      showMessage('Password must be at least 6 characters long.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === email)) {
      showMessage('An account with this email already exists.', 'error');
      return;
    }
    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    initializeUserData(email); // Initialize fresh components for new user
    showMessage(
      'Account created successfully! Welcome to ShopSphere!',
      'success'
    );
    setTimeout(() => {
      renderProfilePage();
    }, 1500);
  });
}

// Patch sign-in to fetch and populate user data
function signInUser(email) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u) => u.email === email);
  if (!user) return false;
  localStorage.setItem('currentUser', JSON.stringify(user));
  // Fetch user data and populate global/localStorage for app usage
  const userData = getUserData(email);
  localStorage.setItem('cart', JSON.stringify(userData.cart || []));
  localStorage.setItem('wishlist', JSON.stringify(userData.wishlist || []));
  localStorage.setItem('orders', JSON.stringify(userData.orders || []));
  localStorage.setItem(
    'personalInfo',
    JSON.stringify(userData.personalInfo || {})
  );
  return true;
}

// On sign-in, load cart and wishlist from user data and update global keys for compatibility
function syncUserDataToGlobal() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const userData = getUserData(currentUser.email);
  localStorage.setItem('cart', JSON.stringify(userData.cart || []));
  localStorage.setItem('wishlist', JSON.stringify(userData.wishlist || []));
}

// Call this after sign-in
if (
  window.location.pathname.includes('login.html') ||
  window.location.pathname.includes('profile.html')
) {
  document.addEventListener('DOMContentLoaded', function () {
    syncUserDataToGlobal();
  });
}

// When cart or wishlist is updated, also update user data
function setCart(cart) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const userData = getUserData(currentUser.email);
  userData.cart = cart;
  setUserData(currentUser.email, userData);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function setWishlist(wishlist) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.email) return;
  const userData = getUserData(currentUser.email);
  userData.wishlist = wishlist;
  setUserData(currentUser.email, userData);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
