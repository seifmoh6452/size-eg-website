# Size.eg - Modern Egyptian Streetwear

A modern, responsive e-commerce website for Egyptian streetwear brand Size.eg, featuring contemporary design and seamless shopping experience.

## 🌟 Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse t-shirts and streetwear
- **Shopping Cart** - Add, remove, and manage items
- **Secure Checkout** - Complete order process
- **Automatic WhatsApp Notifications** - Order confirmations via WhatsApp

### 🎨 Modern Design (2025)
- **Egyptian-themed Color Palette** - Elegant and culturally inspired
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, professional interface
- **Smooth Animations** - Enhanced user experience

### 📱 Product Features
- **Dual Image Support** - Front and back views for t-shirts
- **Interactive Image Toggle** - Switch between product views
- **Category Filtering** - Easy product discovery
- **Search Functionality** - Find products quickly

### 💳 Payment & Delivery
- **Cash on Delivery (COD)** - Pay when you receive
- **Egyptian Locations** - Comprehensive city/governorate selection
- **Donation Integration** - 5% donation to the poor with each order
- **Fixed Delivery Fee** - 50 EGP delivery charge

### 📞 Business Integration
- **CallMeBot WhatsApp API** - Automatic order notifications
- **Admin Panel** - Manage products and orders
- **Order Management** - Track and process orders

## 🚀 Technologies Used

- **HTML5** - Modern semantic markup
- **CSS3** - Advanced styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Professional icons
- **Google Fonts** - Typography (Poppins)
- **CallMeBot API** - WhatsApp integration

## 📁 Project Structure

```
size-eg-website/
├── index.html              # Main collection page
├── cart.html               # Shopping cart page
├── checkout.html           # Checkout process
├── style.css               # Main stylesheet
├── script.js               # Core JavaScript
├── products-2025.js        # Product management
├── cart-2025.js           # Cart functionality
├── checkout-2025.js       # Checkout process
├── whatsapp-test.html     # WhatsApp testing tool
├── admin/                 # Admin panel
│   ├── index.html         # Admin login
│   ├── dashboard.html     # Admin dashboard
│   ├── products.html      # Product management
│   └── admin-style.css    # Admin styling
└── assets/               # Images and media
```

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/size-eg-website.git
cd size-eg-website
```

### 2. WhatsApp Integration Setup
1. Add CallMeBot to WhatsApp: `+34 644 59 71 67`
2. Send: "I allow callmebot to send me messages"
3. Get your API key from the response
4. Update `checkout-2025.js`:
```javascript
const WHATSAPP_CONFIG = {
    businessNumber: "YOUR_WHATSAPP_NUMBER", // e.g., "201234567890"
    apiKey: "YOUR_API_KEY", // From CallMeBot
    autoSendEnabled: true
};
```

### 3. Launch the Website
- Open `index.html` in a web browser
- Or use a local server for best experience

## 📱 WhatsApp Integration

The website automatically sends order details to your WhatsApp when customers place orders:

1. **Business Notification** - Complete order details for processing
2. **Customer Thank You Message** - Ready-to-forward customer confirmation

## 🎯 Key Features Explained

### Dual Image System
- Products support front and back images
- Interactive toggle buttons on hover
- Smooth transitions between views

### Modern Checkout
- Egyptian cities and governorates
- Cash on Delivery payment
- 5% charitable donation
- Automatic WhatsApp notifications

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface

## 🔧 Customization

### Colors
Update CSS custom properties in `style.css`:
```css
:root {
    --primary-color: #your-color;
    --accent-color: #your-accent;
    --background-primary: #your-bg;
}
```

### Products
Add products through the admin panel at `admin/products.html`

### WhatsApp Messages
Customize message format in `checkout-2025.js` function `formatOrderMessage()`

## 📞 Support

For setup assistance or customization:
- Check the setup guides in the project
- Test WhatsApp integration with `whatsapp-test.html`
- Review the admin panel documentation

## 📄 License

This project is created for Size.eg brand. All rights reserved.

---

**Size.eg - Modern Egyptian Streetwear** 🇪🇬
*Authentic. Bold. Egyptian.*
