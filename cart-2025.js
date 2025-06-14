document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartContainer = document.getElementById('empty-cart');
    const cartCountElement = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart');
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoBtn = document.getElementById('apply-promo');

    // Cart data
    let cart = [];
    let promoDiscount = 0;

    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        updateCartDisplay();
        updateCartCount();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Trigger storage event for other pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cart',
            newValue: JSON.stringify(cart)
        }));
    }

    // Update cart count in navigation
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Create cart item HTML
    function createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-category">${item.category}</p>
                    <p class="item-price">EGP ${item.price}</p>
                </div>
                <div class="item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="qty-btn plus" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Update cart display
    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsContainer.style.display = 'none';
            emptyCartContainer.style.display = 'block';
            document.querySelector('.cart-summary-section').style.display = 'none';
        } else {
            cartItemsContainer.style.display = 'block';
            emptyCartContainer.style.display = 'none';
            document.querySelector('.cart-summary-section').style.display = 'block';
            
            cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
            setupCartItemEvents();
        }
        updateCartSummary();
    }

    // Setup event listeners for cart items
    function setupCartItemEvents() {
        // Quantity controls
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                updateQuantity(id, 1);
            });
        });

        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                updateQuantity(id, -1);
            });
        });

        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', () => {
                const id = parseInt(input.dataset.id);
                const newQuantity = parseInt(input.value);
                if (newQuantity > 0) {
                    setQuantity(id, newQuantity);
                }
            });
        });

        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                removeFromCart(id);
            });
        });
    }

    // Update item quantity
    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
                updateCartDisplay();
            }
        }
    }

    // Set item quantity
    function setQuantity(id, quantity) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
        }
    }

    // Remove item from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        updateCartDisplay();
        
        // Show notification
        showNotification('Item removed from cart', 'success');
    }

    // Clear entire cart
    function clearCart() {
        if (cart.length > 0 && confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            updateCartDisplay();
            showNotification('Cart cleared', 'success');
        }
    }

    // Update cart summary
    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 50; // Fixed delivery fee: 50 EGP
        const donation = subtotal * 0.05; // 5% donation to the poor
        const discount = subtotal * (promoDiscount / 100);
        const total = subtotal + shipping + donation - discount;

        if (subtotalElement) subtotalElement.textContent = `EGP ${subtotal.toFixed(0)}`;
        const shippingElement = document.getElementById('shipping');
        if (shippingElement) shippingElement.textContent = `EGP ${shipping.toFixed(0)}`;
        if (taxElement) taxElement.textContent = `EGP ${donation.toFixed(0)}`;
        if (totalElement) totalElement.textContent = `EGP ${total.toFixed(0)}`;
    }

    // Apply promo code
    function applyPromoCode() {
        const code = promoCodeInput.value.trim().toLowerCase();
        const promoCodes = {
            'welcome10': 10,
            'save20': 20,
            'student15': 15,
            'first25': 25
        };

        if (promoCodes[code]) {
            promoDiscount = promoCodes[code];
            updateCartSummary();
            showNotification(`Promo code applied! ${promoDiscount}% discount`, 'success');
            promoCodeInput.value = '';
        } else {
            showNotification('Invalid promo code', 'error');
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Checkout function
    function checkout() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }
        
        // Here you would integrate with your payment system
        showNotification('Redirecting to checkout...', 'info');
        
        // For demo purposes, redirect to checkout page
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 1500);
    }

    // Event listeners
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }

    if (promoCodeInput) {
        promoCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
    }

    // Listen for cart updates from other pages
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            loadCart();
        }
    });

    // Initialize cart
    loadCart();

    // Mobile cart optimizations
    if (window.innerWidth <= 768) {
        // Add mobile-specific cart optimizations
        document.body.classList.add('mobile-cart');

        // Optimize cart for mobile
        const cartContainer = document.querySelector('.cart-content');
        if (cartContainer) {
            cartContainer.style.gridTemplateColumns = '1fr';
            cartContainer.style.gap = '1rem';
            cartContainer.style.padding = '1rem';
        }

        // Make cart items more touch-friendly
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            item.style.padding = '1.5rem 1rem';
            item.style.borderRadius = '12px';
            item.style.marginBottom = '1rem';
            item.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });

        // Optimize quantity controls for touch
        const quantityBtns = document.querySelectorAll('.qty-btn');
        quantityBtns.forEach(btn => {
            btn.style.minWidth = '44px';
            btn.style.minHeight = '44px';
            btn.style.fontSize = '1.2rem';
            btn.style.borderRadius = '8px';
        });

        // Optimize checkout button for mobile
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.style.width = '100%';
            checkoutBtn.style.padding = '1rem';
            checkoutBtn.style.fontSize = '1.2rem';
            checkoutBtn.style.minHeight = '56px';
            checkoutBtn.style.borderRadius = '8px';
            checkoutBtn.style.position = 'sticky';
            checkoutBtn.style.bottom = '1rem';
            checkoutBtn.style.zIndex = '10';
        }

        // Improve scrolling on mobile
        const cartItemsContainer = document.querySelector('.cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.style.webkitOverflowScrolling = 'touch';
            cartItemsContainer.style.maxHeight = 'calc(100vh - 300px)';
            cartItemsContainer.style.overflowY = 'auto';
        }

        // Add touch feedback
        document.addEventListener('touchstart', function(e) {
            if (e.target.classList.contains('qty-btn') ||
                e.target.classList.contains('remove-item') ||
                e.target.classList.contains('checkout-btn')) {
                e.target.style.transform = 'scale(0.95)';
            }
        });

        document.addEventListener('touchend', function(e) {
            if (e.target.classList.contains('qty-btn') ||
                e.target.classList.contains('remove-item') ||
                e.target.classList.contains('checkout-btn')) {
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 100);
            }
        });
    }

    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});

// Global function to add items to cart (called from product pages)
window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count if on cart page
    if (window.location.pathname.includes('cart.html')) {
        window.location.reload();
    }
    
    return cart;
};
