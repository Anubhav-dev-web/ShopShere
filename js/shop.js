// Shop page JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the shop page
  initShop();
});

function initShop() {
  // Load all products initially
  if (typeof getProductsByCategory === 'function') {
    loadProducts(getProductsByCategory(''));
  } else if (typeof products !== 'undefined') {
    loadProducts(products);
  } else {
    loadProducts([]);
  }

  // Setup filters and search
  setupFilters();
  setupSearch();

  // Setup main search functionality
  setupMainSearch();

  // Update cart count display
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();

  // Check for main search query from homepage
  checkMainSearchQuery();
  setupNewsletterSubscription();
}

function loadProducts(productsToShow) {
  const productsGrid = document.getElementById('products-grid');

  if (!productsGrid) return;

  // Clear existing content
  productsGrid.innerHTML = '';

  if (productsToShow.length === 0) {
    productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
    return;
  }

  // Create product cards
  productsToShow.forEach((product) => {
    const productCard = createShopProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

function createShopProductCard(product) {
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

function setupFilters() {
  const categoryFilter = document.getElementById('category-filter');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', function () {
      filterAndSearchProducts();
    });
  }
}

function filterAndSearchProducts() {
  const categoryFilter = document.getElementById('category-filter');
  const searchInput = document.getElementById('search-input');
  let selectedCategory = categoryFilter ? categoryFilter.value : '';
  let searchQuery = searchInput ? searchInput.value.trim() : '';

  let filteredProducts = getProductsByCategory(selectedCategory);
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  loadProducts(filteredProducts);
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');

  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);

      // Debounce search to avoid too many calls
      searchTimeout = setTimeout(() => {
        filterAndSearchProducts();
      }, 300);
    });
  }
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
          performSearch(query);
        }
      }
    });
  }
}

function checkMainSearchQuery() {
  const mainSearchQuery = localStorage.getItem('mainSearchQuery');
  if (mainSearchQuery) {
    // Clear the stored query
    localStorage.removeItem('mainSearchQuery');

    // Set the search input value
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = mainSearchQuery;
    }

    // Perform the search
    performSearch(mainSearchQuery);
  }
}

function performSearch(query) {
  const searchResults = searchProducts(query);
  loadProducts(searchResults);

  // Update the search input if it exists
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = query;
  }
}

// Enhanced cart functions for shop page
function addToCart(productId) {
  const cart = getCart();
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

  localStorage.setItem('cart', JSON.stringify(cart));

  // Show success message
  showShopNotification('Product added to cart!', 'success');

  // Update cart count in navigation
  updateCartCount();
}

function showShopNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  const bgColor =
    type === 'error' ? '#ffffff' : type === 'success' ? '#ffffff' : '#cccccc';

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${bgColor};
        color: #000000;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(255,255,255,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        border: 1px solid #333;
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

function updateCartCount() {
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update cart count display
  updateCartCountDisplay();

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

// Cart functions (shared across pages)
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Utility function to format currency
function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

// Wishlist functions
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
    showShopNotification('Removed from wishlist', 'info');
  } else {
    // Add to wishlist
    addToWishlist(productId);
    button.classList.add('active');
    showShopNotification('Added to wishlist', 'success');
  }

  // Update wishlist count display
  updateWishlistCountDisplay();
}

// Newsletter subscription functionality
function setupNewsletterSubscription() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email) {
        // Simulate newsletter subscription
        showShopNotification(
          'Thank you for subscribing to our newsletter!',
          'success'
        );
        emailInput.value = '';

        // Store subscription in localStorage (in a real app, this would go to a server)
        const subscriptions = JSON.parse(
          localStorage.getItem('newsletterSubscriptions') || '[]'
        );
        if (!subscriptions.includes(email)) {
          subscriptions.push(email);
          localStorage.setItem(
            'newsletterSubscriptions',
            JSON.stringify(subscriptions)
          );
        }
      }
    });
  }
}
