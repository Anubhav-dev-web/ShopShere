// Product data and utility functions
const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Advanced fitness tracking with heart rate monitor and GPS capabilities. Track your workouts and stay connected.',
  },
  {
    id: 3,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Comfortable and stylish cotton t-shirt available in multiple colors. Perfect for everyday wear and casual outings.',
  },
  {
    id: 4,
    name: 'Designer Denim Jeans',
    price: 79.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Premium denim jeans with perfect fit and modern styling. Classic design that never goes out of style.',
  },
  {
    id: 5,
    name: 'Programming Fundamentals Book',
    price: 39.99,
    category: 'books',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Comprehensive guide to programming basics and best practices. Essential reading for aspiring developers.',
  },
  {
    id: 6,
    name: 'Business Strategy Guide',
    price: 49.99,
    category: 'books',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Essential strategies for building and growing successful businesses. Learn from industry experts and proven methods.',
  },
  {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Compact and powerful portable speaker with 20-hour battery life. Take your music anywhere with crystal clear sound.',
  },
  {
    id: 8,
    name: 'Casual Hoodie',
    price: 45.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Warm and comfortable hoodie perfect for casual wear. Soft fabric with a relaxed fit for ultimate comfort.',
  },
  {
    id: 9,
    name: 'Wireless Earbuds',
    price: 129.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'True wireless earbuds with premium sound quality and active noise cancellation. Perfect for workouts and daily use.',
  },
  {
    id: 10,
    name: 'Leather Jacket',
    price: 149.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Classic leather jacket with modern styling. Durable and stylish for any occasion.',
  },
  {
    id: 11,
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'High-performance wireless gaming mouse with precision tracking and customizable RGB lighting.',
  },
  {
    id: 12,
    name: 'Running Shoes',
    price: 89.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Comfortable running shoes with advanced cushioning technology. Perfect for athletes and fitness enthusiasts.',
  },
  {
    id: 13,
    name: 'Formal Business Shirt',
    price: 64.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Professional business shirt perfect for office wear and formal occasions. Crisp and clean design.',
  },
  {
    id: 14,
    name: 'Digital Marketing Book',
    price: 44.99,
    category: 'books',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Comprehensive guide to digital marketing strategies. Learn SEO, social media, and online advertising techniques.',
  },
  {
    id: 15,
    name: 'Smartphone',
    price: 699.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Latest smartphone with advanced camera system and powerful processor. Stay connected with cutting-edge technology.',
  },
  {
    id: 16,
    name: 'Summer Dress',
    price: 54.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Lightweight summer dress perfect for warm weather. Flowy design with comfortable fit for casual elegance.',
  },
  {
    id: 17,
    name: 'Gaming Laptop',
    price: 1299.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'High-performance gaming laptop with RTX graphics and fast processor. Perfect for gamers and content creators.',
  },
  {
    id: 18,
    name: 'Designer Handbag',
    price: 199.99,
    category: 'clothing',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Elegant designer handbag with premium leather and spacious interior. Perfect for professional and casual use.',
  },
  {
    id: 19,
    name: 'Cookbook Collection',
    price: 34.99,
    category: 'books',
    image:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Comprehensive cookbook with 100+ delicious recipes from around the world. Perfect for home chefs.',
  },
  {
    id: 20,
    name: 'Smart Home Hub',
    price: 89.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&crop=center&auto=format&q=80',
    description:
      'Central hub for controlling all your smart home devices. Easy setup and voice control compatibility.',
  },
];

// Utility functions
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (!category) return products;
  return products.filter((product) => product.category === category);
}

function searchProducts(query) {
  if (!query) return products;
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}

function getFeaturedProducts(limit = 3) {
  // Return a mix of different categories for featured products
  const featured = [];
  const categories = ['electronics', 'clothing', 'books'];

  categories.forEach((category) => {
    const categoryProducts = getProductsByCategory(category);
    if (categoryProducts.length > 0) {
      featured.push(categoryProducts[0]);
    }
  });

  // Add one more product to reach the limit
  if (featured.length < limit) {
    const remaining = products.filter((p) => !featured.includes(p));
    if (remaining.length > 0) {
      featured.push(remaining[0]);
    }
  }

  return featured.slice(0, limit);
}

function getBestSellingProducts(limit = 3) {
  // Return a mix of different categories for best selling products
  const bestSelling = [];
  const categories = ['electronics', 'clothing', 'books'];

  categories.forEach((category) => {
    const categoryProducts = getProductsByCategory(category);
    if (categoryProducts.length > 1) {
      bestSelling.push(categoryProducts[1]);
    }
  });

  // Add one more product to reach the limit
  if (bestSelling.length < limit) {
    const remaining = products.filter((p) => !bestSelling.includes(p));
    if (remaining.length > 0) {
      bestSelling.push(remaining[0]);
    }
  }

  return bestSelling.slice(0, limit);
}

// Wishlist functionality
function getWishlist() {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function addToWishlist(productId) {
  const wishlist = getWishlist();
  const product = getProductById(productId);

  if (!product) return false;

  // Check if product is already in wishlist
  if (wishlist.find((item) => item.productId === parseInt(productId))) {
    return false; // Already in wishlist
  }

  // Add product to wishlist
  wishlist.push({
    productId: parseInt(productId),
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    addedAt: new Date().toISOString(),
  });

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  return true;
}

function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(
    (item) => item.productId !== parseInt(productId)
  );
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  return true;
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.productId === parseInt(productId));
}

function moveFromWishlistToCart(productId) {
  const wishlist = getWishlist();
  const product = getProductById(productId);

  if (!product) return false;

  // Add to cart
  const cart = getCart();
  const existingItem = cart.find(
    (item) => item.productId === parseInt(productId)
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: parseInt(productId),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Remove from wishlist
  removeFromWishlist(productId);

  return true;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    products,
    formatPrice,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getFeaturedProducts,
    getBestSellingProducts,
  };
}
