# UrbanFashion - E-Commerce Store

A modern, responsive e-commerce website built with HTML, CSS, and JavaScript, featuring a sleek black and white theme with urban fashion aesthetics and high-quality stock images.

## Features

- **Modern Black & White Theme**: Sleek, minimalist design with high contrast aesthetics
- **UrbanFashion Branding**: Professional urban fashion store identity
- **Advanced Navigation**: Dual-level navigation with search bar and icon-based shortcuts
- **High-Quality Stock Images**: Professional product photography from Unsplash
- **Enhanced Product Catalog**: 16 products across Electronics, Clothing, and Books categories
- **Homepage**: Featured products showcase with hero section
- **Shop Page**: Product listing with category filters and search functionality
- **Product Details**: Individual product pages with quantity selection
- **Shopping Cart**: Add/remove items, quantity management, and price calculations
- **Checkout Process**: Complete checkout flow with form validation
- **Wishlist**: Save products for later (coming soon)
- **User Profile**: Account management and preferences
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **BoxIcons Integration**: Modern icon library for enhanced UI

## File Structure

```
ecommerce-store/
│── index.html          # Homepage with hero section and featured products
│── shop.html           # Product listing with filters and search
│── product.html        # Individual product detail pages
│── cart.html           # Shopping cart management
│── checkout.html       # Complete checkout process
│── wishlist.html       # Wishlist page (placeholder)
│── profile.html        # User profile page (placeholder)
│
├── css/
│   ├── style.css       # Main styles and common components (Black/White theme)
│   ├── shop.css        # Shop page specific styles
│   ├── cart.css        # Cart page specific styles
│   ├── checkout.css    # Checkout page specific styles
│   └── product.css     # Product detail page styles
│
├── js/
│   ├── products.js     # Product data with 16 real products and stock images
│   ├── main.js         # Homepage functionality with search and cart count
│   ├── shop.js         # Shop page functionality with enhanced search
│   ├── cart.js         # Cart management
│   ├── product.js      # Product page functionality
│   └── checkout.js     # Checkout process
│
└── assets/
    └── icons/          # Directory for UI icons
```

## Design Features

### Navigation Structure
- **Top Bar**: Logo (UrbanFashion) + Search Bar + Icon Navigation
- **Icon Navigation**: Home, Shop, Cart (with count badge), Wishlist, Profile
- **Main Navigation**: Home, Shop, Categories Dropdown, Cart
- **Categories**: Electronics, Clothing, Books with hover dropdown

### Color Scheme
- **Primary Background**: #000000 (Pure Black)
- **Secondary Background**: #111 (Dark Gray)
- **Accent**: #ffffff (Pure White)
- **Borders**: #333 (Medium Gray)
- **Text**: #ffffff (White) on dark backgrounds, #000000 (Black) on white elements

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Logo**: Uppercase with letter spacing
- **Navigation**: Uppercase with letter spacing
- **Headings**: Uppercase with letter spacing for modern look

## Product Catalog

### Electronics (6 products)
- Wireless Bluetooth Headphones - $89.99
- Smart Fitness Watch - $199.99
- Portable Bluetooth Speaker - $59.99
- Wireless Earbuds - $129.99
- Gaming Laptop - $1,299.99
- Smartphone - $699.99

### Clothing (6 products)
- Premium Cotton T-Shirt - $29.99
- Designer Denim Jeans - $79.99
- Casual Hoodie - $45.99
- Leather Jacket - $149.99
- Formal Business Shirt - $64.99
- Summer Dress - $54.99

### Books (4 products)
- Programming Fundamentals Book - $39.99
- Business Strategy Guide - $49.99
- Web Development Guide - $34.99
- Digital Marketing Book - $44.99

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser to start
3. **Navigate** through the different pages using the navigation menu
4. **Use the search bar** to find products quickly
5. **Browse categories** with the dropdown menu
6. **Add products** to cart from homepage, shop, or product pages
7. **Manage cart** quantities and remove items
8. **Complete checkout** with form validation

## Pages Overview

### Homepage (`index.html`)
- Hero section with UrbanFashion branding
- Featured products display (mix of categories)
- Main search bar functionality
- Navigation to other pages

### Shop (`shop.html`)
- Product grid with filtering options
- Category-based filtering
- Search functionality (with main search integration)
- Add to cart functionality

### Product Details (`product.html`)
- Detailed product information
- Quantity selection
- Add to cart with quantity

### Shopping Cart (`cart.html`)
- Cart item management
- Quantity adjustments
- Price calculations
- Proceed to checkout

### Checkout (`checkout.html`)
- Shipping information form
- Payment information form
- Order summary
- Form validation

### Wishlist (`wishlist.html`)
- Placeholder page for future wishlist functionality
- Consistent with overall theme

### Profile (`profile.html`)
- Placeholder page for future user account functionality
- Sign in/Sign up buttons (coming soon)

## Features

### Product Management
- **16 real products** with high-quality stock images
- **Categories**: Electronics, Clothing, Books
- **Professional photography** from Unsplash
- **Detailed descriptions** for each product
- **Realistic pricing** for urban fashion market

### Shopping Cart
- Local storage-based cart persistence
- Add/remove items
- Quantity management
- Real-time price calculations
- Cart count badge in navigation

### Search & Navigation
- Main search bar in header
- Search integration between pages
- Category filtering
- Responsive navigation with dropdowns
- Enhanced search with category matching

### User Experience
- Responsive design for all screen sizes
- Smooth animations and transitions
- Form validation with error messages
- Success notifications with black/white theme
- Loading states for images
- Hover effects and micro-interactions
- Lazy loading for better performance

### Technical Features
- Vanilla JavaScript (no frameworks)
- CSS Grid and Flexbox layouts
- Local storage for cart data
- URL parameter handling
- Form validation
- BoxIcons CDN integration
- Image optimization and loading states

## Image Sources

All product images are sourced from **Unsplash**, a free stock photo platform:
- **High-quality photography** from professional photographers
- **Optimized for web** with consistent 400x400 dimensions
- **Free to use** for commercial and non-commercial projects
- **Professional appearance** that enhances the shopping experience

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Branding
- Change "UrbanFashion" to your brand name in all HTML files
- Modify colors in CSS files to match your brand palette
- Update logo styling in `css/style.css`

### Adding Products
Edit `js/products.js` to add, modify, or remove products from the catalog. Each product includes:
- Unique ID
- Product name
- Price
- Category
- Unsplash image URL
- Detailed description

### Styling
Modify the CSS files to customize:
- Colors and themes
- Typography and fonts
- Layouts and spacing
- Animations and transitions

### Functionality
Extend the JavaScript files to add new features like:
- User authentication system
- Real payment gateway integration
- Product reviews and ratings
- Advanced wishlist functionality
- Order history and tracking
- Email notifications

## Future Enhancements

- User authentication system
- Real payment gateway integration
- Product reviews and ratings
- Advanced wishlist functionality
- Order history and tracking
- Email notifications
- Product recommendations
- Advanced filtering and sorting
- Mobile app development
- Product image gallery
- Social media integration

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please refer to the code comments or create an issue in the project repository.

## Credits

- **Icons**: [BoxIcons](https://boxicons.com/) - Beautiful open source icons
- **Images**: [Unsplash](https://unsplash.com/) - Free high-quality stock photos
- **Design**: Modern black and white theme with urban fashion aesthetics
- **Framework**: Vanilla JavaScript for maximum compatibility and performance
