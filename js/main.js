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
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

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
  showNotification('Product added to cart!', 'success');

  // Update cart count
  updateCartCount();
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#ffffff' : '#cccccc'};
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
        showNotification(
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

// Utility function to format currency
function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}
