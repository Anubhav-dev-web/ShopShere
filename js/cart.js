// Cart page JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the cart page
  initCart();
});

function initCart() {
  // Load cart items
  loadCartItems();

  // Setup checkout button
  setupCheckoutButton();

  // Update cart count display
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();
}

function loadCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cart = getCart();

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '';
    if (emptyCartMessage) emptyCartMessage.style.display = 'block';
    // Hide cart summary when empty
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) {
      cartSummary.style.display = 'none';
    }
    return;
  }

  if (emptyCartMessage) emptyCartMessage.style.display = 'none';
  // Show cart summary
  const cartSummary = document.querySelector('.cart-summary');
  if (cartSummary) {
    cartSummary.style.display = 'block';
  }

  // Clear existing content
  cartItemsContainer.innerHTML = '';

  // Create cart item elements
  cart.forEach((item) => {
    const cartItem = createCartItemElement(item);
    cartItemsContainer.appendChild(cartItem);
  });

  // Update cart summary
  updateCartSummary();
}

function createCartItemElement(item) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${
    item.name
  }" loading="lazy" onload="this.classList.add('loaded')" onerror="this.style.display='none'">
        </div>
        <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">${formatPrice(item.price)}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="decreaseQuantity(${
              item.productId
            })">-</button>
            <input type="number" class="quantity-input" value="${
              item.quantity
            }" min="1" 
                   onchange="updateQuantity(${item.productId}, this.value)">
            <button class="quantity-btn" onclick="increaseQuantity(${
              item.productId
            })">+</button>
        </div>
        <div class="cart-item-total">
            ${formatPrice(item.price * item.quantity)}
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${
          item.productId
        })">
            Remove
        </button>
    `;

  return cartItem;
}

function updateCartSummary() {
  const cart = getCart();

  if (cart.length === 0) return;

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Update summary display
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');

  if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
  if (taxElement) taxElement.textContent = formatPrice(tax);
  if (totalElement) totalElement.textContent = formatPrice(total);
}

function increaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Reload to update display
    updateCartCountDisplay(); // Update cart count in navigation
  }
}

function decreaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find((item) => item.productId === productId);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Reload to update display
    updateCartCountDisplay(); // Update cart count in navigation
  }
}

function updateQuantity(productId, newQuantity) {
  const cart = getCart();
  const item = cart.find((item) => item.productId === productId);

  if (item && newQuantity > 0) {
    item.quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Reload to update display
    updateCartCountDisplay(); // Update cart count in navigation
  }
}

function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.productId !== productId);

  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // Show removal notification
  showCartNotification('Item removed from cart', 'success');

  // Update cart count in navigation
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();

  // Reload cart display
  loadCartItems();
}

function setupCheckoutButton() {
  const checkoutBtn = document.getElementById('checkout-btn');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      const cart = getCart();

      if (cart.length === 0) {
        showCartNotification('Your cart is empty', 'error');
        return;
      }

      // Navigate to checkout page
      window.location.href = 'checkout.html';
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

function showCartNotification(message, type = 'info') {
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

// Cart functions (shared across pages)
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Utility function to format currency
function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}
