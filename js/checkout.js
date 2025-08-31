// Checkout page JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the checkout page
  initCheckout();
});

function initCheckout() {
  // Load cart items for checkout
  loadCheckoutItems();

  // Setup form validation
  setupFormValidation();

  // Setup place order button
  setupPlaceOrderButton();

  // Update cart count display
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();

  // Setup newsletter subscription functionality
  setupNewsletterSubscription();

  // Setup main search functionality
  setupMainSearch();
}

function loadCheckoutItems() {
  const cart = getCart();
  const checkoutItemsContainer = document.getElementById('checkout-items');

  if (!checkoutItemsContainer) return;

  if (cart.length === 0) {
    // Redirect to cart if empty
    window.location.href = 'cart.html';
    return;
  }

  // Clear existing content
  checkoutItemsContainer.innerHTML = '';

  // Create checkout item elements
  cart.forEach((item) => {
    const checkoutItem = createCheckoutItemElement(item);
    checkoutItemsContainer.appendChild(checkoutItem);
  });

  // Update checkout summary
  updateCheckoutSummary();
}

function createCheckoutItemElement(item) {
  const checkoutItem = document.createElement('div');
  checkoutItem.className = 'checkout-item';
  checkoutItem.innerHTML = `
        <div class="checkout-item-details">
            <h4>${item.name}</h4>
            <span class="checkout-item-quantity">Qty: ${item.quantity}</span>
        </div>
        <div class="checkout-item-price">
            ${formatPrice(item.price * item.quantity)}
        </div>
    `;

  return checkoutItem;
}

function updateCheckoutSummary() {
  const cart = getCart();

  if (cart.length === 0) return;

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Update summary display
  const subtotalElement = document.getElementById('checkout-subtotal');
  const shippingElement = document.getElementById('shipping-cost');
  const taxElement = document.getElementById('checkout-tax');
  const totalElement = document.getElementById('checkout-total');

  if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
  if (shippingElement) shippingElement.textContent = formatPrice(shipping);
  if (taxElement) taxElement.textContent = formatPrice(tax);
  if (totalElement) totalElement.textContent = formatPrice(total);
}

function setupFormValidation() {
  const forms = ['shipping-form', 'payment-form'];

  forms.forEach((formId) => {
    const form = document.getElementById(formId);
    if (form) {
      const inputs = form.querySelectorAll('input[required]');

      inputs.forEach((input) => {
        input.addEventListener('blur', function () {
          validateField(this);
        });

        input.addEventListener('input', function () {
          clearFieldError(this);
        });
      });
    }
  });
}

function validateField(field) {
  const value = field.value.trim();
  const formGroup = field.closest('.form-group');

  // Clear previous error
  clearFieldError(field);

  // Check if field is empty
  if (!value) {
    showFieldError(field, 'This field is required');
    return false;
  }

  // Email validation
  if (field.type === 'email' && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email address');
    return false;
  }

  // Card number validation (basic)
  if (field.id === 'card-number' && !isValidCardNumber(value)) {
    showFieldError(field, 'Please enter a valid card number');
    return false;
  }

  // CVV validation
  if (field.id === 'cvv' && !isValidCVV(value)) {
    showFieldError(field, 'Please enter a valid CVV');
    return false;
  }

  // Expiry date validation
  if (field.id === 'expiry' && !isValidExpiry(value)) {
    showFieldError(field, 'Please enter a valid expiry date (MM/YY)');
    return false;
  }

  // Mark as valid
  formGroup.classList.add('success');
  return true;
}

function showFieldError(field, message) {
  const formGroup = field.closest('.form-group');
  formGroup.classList.add('error');

  // Remove existing error message
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Add new error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = message;
  formGroup.appendChild(errorMessage);
}

function clearFieldError(field) {
  const formGroup = field.closest('.form-group');
  formGroup.classList.remove('error', 'success');

  const errorMessage = formGroup.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidCardNumber(cardNumber) {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return cleanNumber.length >= 13 && cleanNumber.length <= 19;
}

function isValidCVV(cvv) {
  return cvv.length >= 3 && cvv.length <= 4;
}

function isValidExpiry(expiry) {
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiry)) return false;

  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expYear = parseInt(year);
  const expMonth = parseInt(month);

  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return true;
}

function setupPlaceOrderButton() {
  const placeOrderBtn = document.getElementById('place-order-btn');

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function () {
      if (validateAllFields()) {
        processOrder();
      }
    });
  }
}

function validateAllFields() {
  const forms = ['shipping-form', 'payment-form'];
  let isValid = true;

  forms.forEach((formId) => {
    const form = document.getElementById(formId);
    if (form) {
      const inputs = form.querySelectorAll('input[required]');

      inputs.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
    }
  });

  return isValid;
}

function processOrder() {
  const placeOrderBtn = document.getElementById('place-order-btn');

  // Disable button and show loading
  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = 'Processing...';

  // Show loading overlay
  showLoadingOverlay();

  // Simulate order processing
  setTimeout(() => {
    // Hide loading overlay
    hideLoadingOverlay();

    // Show success message
    showOrderSuccess();

    // Clear cart
    clearCart();

    // Re-enable button
    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = 'Place Order';
  }, 2000);
}

function showLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(overlay);
}

function hideLoadingOverlay() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) {
    overlay.remove();
  }
}

function showOrderSuccess() {
  const checkoutSection = document.querySelector('.checkout-section');

  if (checkoutSection) {
    checkoutSection.innerHTML = `
            <div class="success-message">
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
                <a href="index.html" class="cta-button">Continue Shopping</a>
            </div>
        `;
  }
}

function clearCart() {
  localStorage.removeItem('cart');
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

// Main search functionality
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
        showCheckoutNotification(
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

function showCheckoutNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification to match ShopSphere theme
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
