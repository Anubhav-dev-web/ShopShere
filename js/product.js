// Product detail page JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the product page
  initProductPage();
});

function initProductPage() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    showError('Product not found');
    return;
  }

  // Load product details
  loadProductDetails(productId);

  // Setup quantity controls
  setupQuantityControls();

  // Setup add to cart button
  setupAddToCartButton(productId);

  // Update cart count
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();
}

function loadProductDetails(productId) {
  const product = getProductById(productId);

  if (!product) {
    showError('Product not found');
    return;
  }

  // Update page title
  document.title = `${product.name} - ShopSphere`;

  // Update product image with simple but reliable loading
  const productImage = document.getElementById('product-image');
  if (productImage) {
    // Set loading state
    productImage.style.opacity = '0.7';

    // Set the image source
    productImage.src = product.image;
    productImage.alt = product.name;

    // Handle successful load
    productImage.onload = function () {
      this.style.opacity = '1';
    };

    // Handle load error with fallback
    productImage.onerror = function () {
      // Create a simple placeholder with product name
      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');

      // Draw background
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, 500, 500);

      // Draw pattern
      ctx.fillStyle = '#333';
      for (let i = 0; i < 500; i += 20) {
        for (let j = 0; j < 500; j += 20) {
          if ((i + j) % 40 === 0) {
            ctx.fillRect(i, j, 10, 10);
          }
        }
      }

      // Draw text
      ctx.fillStyle = '#666';
      ctx.font = '16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Image Loading...', 250, 240);
      ctx.fillText(product.name, 250, 260);

      // Set the canvas as image source
      this.src = canvas.toDataURL();
      this.style.opacity = '1';
    };
  }

  // Update product title
  const productTitle = document.getElementById('product-title');
  if (productTitle) {
    productTitle.textContent = product.name;
  }

  // Update product price
  const productPrice = document.getElementById('product-price');
  if (productPrice) {
    productPrice.textContent = formatPrice(product.price);
  }

  // Update product description
  const productDescription = document.getElementById('product-description');
  if (productDescription) {
    productDescription.textContent = product.description;
  }
}

function setupQuantityControls() {
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('quantity');

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', function () {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    increaseBtn.addEventListener('click', function () {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });

    // Ensure quantity is always at least 1
    quantityInput.addEventListener('change', function () {
      if (this.value < 1) {
        this.value = 1;
      }
    });
  }
}

function setupAddToCartButton(productId) {
  const addToCartBtn = document.getElementById('add-to-cart');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function () {
      const quantity = parseInt(document.getElementById('quantity').value) || 1;
      addProductToCart(productId, quantity);
    });
  }
}

function addProductToCart(productId, quantity) {
  const cart = getCart();
  const existingItem = cart.find(
    (item) => item.productId === parseInt(productId)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const product = getProductById(productId);
    if (product) {
      cart.push({
        productId: parseInt(productId),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Show success message
  showProductNotification(`Added ${quantity} item(s) to cart!`, 'success');

  // Update cart count in navigation
  updateCartCountDisplay();

  // Update wishlist count display
  updateWishlistCountDisplay();
}

function showProductNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  const bgColor =
    type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff';

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

function showError(message) {
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = `
            <div class="error-message">
                <h2>Error</h2>
                <p>${message}</p>
                <a href="shop.html" class="cta-button">Back to Shop</a>
            </div>
        `;
  }
}

function updateCartCountDisplay() {
  const cart = getCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById('cart-count');

  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
  }
}

function updateWishlistCountDisplay() {
  const wishlist = getWishlist();
  const wishlistCount = wishlist.length;
  const wishlistBadge = document.getElementById('wishlist-count');

  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  }
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
