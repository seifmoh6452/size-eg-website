// Modern Checkout Page 2025 - Enhanced Functionality

// ===== CALLMEBOT CONFIGURATION (EASIEST & FREE) =====
const WHATSAPP_CONFIG = {
    businessNumber: "201111034229", // ✅ Your WhatsApp number
    apiKey: "8625233", // ✅ Your CallMeBot API key
    businessName: "Size.eg",
    autoSendEnabled: true // Automatic sending only
};

// 📱 SETUP INSTRUCTIONS:
// 1. Add +34 644 59 71 67 to WhatsApp
// 2. Send: "I allow callmebot to send me messages"
// 3. Get your API key from the reply
// 4. Update businessNumber and apiKey above
// 5. Done! Orders will be sent automatically
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Checkout elements
    const orderItemsContainer = document.getElementById('order-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutShipping = document.getElementById('checkout-shipping');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');
    const btnTotal = document.getElementById('btn-total');
    const checkoutForm = document.getElementById('checkout-form');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const cartCountElement = document.getElementById('cart-count');

    // Cart data
    let cart = [];
    let orderSummary = {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    };

    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        
        if (cart.length === 0) {
            // Redirect to cart if empty
            showNotification('Your cart is empty. Redirecting to cart page...', 'info');
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 2000);
            return;
        }
        
        displayOrderSummary();
        updateCartCount();
    }

    // Update cart count in navigation
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Create order item HTML
    function createOrderItemHTML(item) {
        return `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div class="order-item-details">
                    <h4 class="order-item-name">${item.name}</h4>
                    <p class="order-item-category">${item.category}</p>
                    <div class="order-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="order-item-price">
                    EGP ${(item.price * item.quantity).toFixed(0)}
                </div>
            </div>
        `;
    }

    // Display order summary
    function displayOrderSummary() {
        if (orderItemsContainer) {
            orderItemsContainer.innerHTML = cart.map(item => createOrderItemHTML(item)).join('');
        }
        
        calculateTotals();
        updateTotalDisplays();
    }

    // Calculate order totals
    function calculateTotals() {
        orderSummary.subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderSummary.shipping = 50; // Fixed delivery fee: 50 EGP
        orderSummary.donation = orderSummary.subtotal * 0.05; // 5% donation to the poor
        orderSummary.total = orderSummary.subtotal + orderSummary.shipping + orderSummary.donation;
    }

    // Update total displays
    function updateTotalDisplays() {
        if (checkoutSubtotal) checkoutSubtotal.textContent = `EGP ${orderSummary.subtotal.toFixed(0)}`;
        if (checkoutShipping) checkoutShipping.textContent = `EGP ${orderSummary.shipping.toFixed(0)}`;
        if (checkoutTax) checkoutTax.textContent = `EGP ${orderSummary.donation.toFixed(0)}`;
        if (checkoutTotal) checkoutTotal.textContent = `EGP ${orderSummary.total.toFixed(0)}`;
        if (btnTotal) btnTotal.textContent = `EGP ${orderSummary.total.toFixed(0)}`;
    }

    // Form validation
    function validateForm() {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone', 
            'address', 'city', 'governorate'
        ];
        
        let isValid = true;
        const errors = [];

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !field.value.trim()) {
                isValid = false;
                errors.push(`${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
                field.style.borderColor = '#dc3545';
            } else if (field) {
                field.style.borderColor = '';
            }
        });

        // Email validation
        const email = document.getElementById('email');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                isValid = false;
                errors.push('Please enter a valid email address');
                email.style.borderColor = '#dc3545';
            }
        }

        // Phone validation
        const phone = document.getElementById('phone');
        if (phone && phone.value) {
            const phoneRegex = /^(\+20|0)?[0-9]{10,11}$/;
            if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
                isValid = false;
                errors.push('Please enter a valid Egyptian phone number');
                phone.style.borderColor = '#dc3545';
            }
        }

        // Terms checkbox
        const terms = document.getElementById('terms');
        if (terms && !terms.checked) {
            isValid = false;
            errors.push('You must agree to the terms and conditions');
        }

        if (!isValid) {
            showNotification(errors[0], 'error');
        }

        return isValid;
    }

    // Collect form data
    function collectFormData() {
        const formData = new FormData(checkoutForm);
        const orderData = {
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            shipping: {
                address: formData.get('address'),
                city: formData.get('city'),
                governorate: formData.get('governorate'),
                postalCode: formData.get('postalCode')
            },
            payment: {
                method: formData.get('paymentMethod')
            },
            orderNotes: formData.get('orderNotes'),
            newsletter: formData.get('newsletter') === 'on',
            items: cart,
            totals: orderSummary,
            orderDate: new Date().toISOString(),
            orderId: 'ORD-' + Date.now()
        };

        return orderData;
    }

    // Send order automatically via CallMeBot
    async function sendOrderAutomatically(orderData) {
        try {
            // Format order message for business
            const orderMessage = formatOrderMessage(orderData);

            // Send order details to business
            const orderApiUrl = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_CONFIG.businessNumber}&text=${encodeURIComponent(orderMessage)}&apikey=${WHATSAPP_CONFIG.apiKey}`;

            const orderResponse = await fetch(orderApiUrl, {
                method: 'GET'
            });

            if (orderResponse.ok) {
                showNotification('Order details sent! ✅', 'success');

                // Wait 3 seconds then send customer thank you message
                setTimeout(async () => {
                    await sendCustomerThankYouMessage(orderData);
                }, 3000);

                return true;
            } else {
                throw new Error(`CallMeBot failed: ${orderResponse.status}`);
            }
        } catch (error) {
            console.error('CallMeBot error:', error);
            return false;
        }
    }

    // Send customer thank you message (for you to forward)
    async function sendCustomerThankYouMessage(orderData) {
        try {
            // Format customer thank you message
            const thankYouMessage = formatCustomerThankYouMessage(orderData);

            // Send thank you message to your WhatsApp (for you to forward)
            const thankYouApiUrl = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_CONFIG.businessNumber}&text=${encodeURIComponent(thankYouMessage)}&apikey=${WHATSAPP_CONFIG.apiKey}`;

            const thankYouResponse = await fetch(thankYouApiUrl, {
                method: 'GET'
            });

            if (thankYouResponse.ok) {
                showNotification('Thank you message ready to forward! 📱', 'info');
                return true;
            } else {
                throw new Error(`Thank you message failed: ${thankYouResponse.status}`);
            }
        } catch (error) {
            console.error('Thank you message error:', error);
            return false;
        }
    }



    // Format order message for WhatsApp
    function formatOrderMessage(orderData) {
        const { customer, shipping, items, totals, orderId, orderDate } = orderData;

        let message = `🛍️ *NEW ORDER RECEIVED* 🛍️\n\n`;
        message += `📋 *Order ID:* ${orderId}\n`;
        message += `📅 *Date:* ${new Date(orderDate).toLocaleString('en-GB', {
            timeZone: 'Africa/Cairo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}\n\n`;

        message += `👤 *Customer Information:*\n`;
        message += `• Name: ${customer.firstName} ${customer.lastName}\n`;
        message += `• Email: ${customer.email}\n`;
        message += `• Phone: ${customer.phone}\n\n`;

        message += `📍 *Shipping Address:*\n`;
        message += `• Address: ${shipping.address}\n`;
        message += `• City: ${shipping.city}\n`;
        message += `• Governorate: ${shipping.governorate}\n`;
        if (shipping.postalCode) {
            message += `• Postal Code: ${shipping.postalCode}\n`;
        }
        message += `\n`;

        message += `🛒 *Order Items:*\n`;
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   • Category: ${item.category}\n`;
            message += `   • Price: EGP ${item.price}\n`;
            message += `   • Quantity: ${item.quantity}\n`;
            message += `   • Subtotal: EGP ${(item.price * item.quantity).toFixed(0)}\n\n`;
        });

        message += `💰 *Order Summary:*\n`;
        message += `• Subtotal: EGP ${totals.subtotal.toFixed(0)}\n`;
        message += `• Delivery: EGP ${totals.shipping.toFixed(0)}\n`;
        message += `• Donation to the Poor (5%): EGP ${totals.donation.toFixed(0)}\n`;
        message += `• *Total: EGP ${totals.total.toFixed(0)}*\n\n`;

        message += `💳 *Payment Method:* Cash on Delivery 💵\n\n`;

        if (orderData.orderNotes) {
            message += `📝 *Order Notes:*\n${orderData.orderNotes}\n\n`;
        }

        message += `🏪 *Size.eg - Modern Egyptian Streetwear*\n`;
        message += `Please confirm this order and provide delivery timeline. Thank you! 🙏`;

        return message;
    }

    // Format customer thank you message (for you to forward)
    function formatCustomerThankYouMessage(orderData) {
        const { customer, items, totals, orderId } = orderData;

        let message = `🎉 *Thank you for your order!* 🎉\n\n`;
        message += `Dear ${customer.firstName},\n\n`;
        message += `Your order has been received and confirmed! ✅\n\n`;

        message += `📋 *Order Summary:*\n`;
        message += `• Order ID: ${orderId}\n`;
        message += `• Total: EGP ${totals.total.toFixed(0)}\n`;
        message += `• Payment: Cash on Delivery 💵\n\n`;

        message += `🛒 *Your Items:*\n`;
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (Qty: ${item.quantity})\n`;
        });
        message += `\n`;

        message += `📦 *What's Next?*\n`;
        message += `• Order confirmation within 2 hours ⏰\n`;
        message += `• Delivery within 2-3 business days 🚚\n`;
        message += `• We'll keep you updated! 📱\n\n`;

        message += `💬 *Questions?*\n`;
        message += `Feel free to reply to this message anytime!\n\n`;

        message += `🏪 *Size.eg - Modern Egyptian Streetwear*\n`;
        message += `Thank you for choosing us! 🙏\n\n`;

        message += `---\n`;
        message += `👆 *Forward this message to customer:* ${customer.phone}`;

        return message;
    }

    // Process order
    async function processOrder(orderData) {
        // Save order to localStorage (in a real app, this would be sent to a server)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cart');

        // Show initial success message
        showNotification('Order placed successfully! Sending to WhatsApp...', 'success');

        // Send order automatically to WhatsApp via CallMeBot
        if (WHATSAPP_CONFIG.autoSendEnabled) {
            try {
                await sendOrderAutomatically(orderData);
            } catch (error) {
                console.error('Error sending order:', error);
                showNotification('Order placed successfully! (WhatsApp notification may have failed)', 'success');
            }
        }

        // Show order confirmation
        setTimeout(() => {
            showOrderConfirmation(orderData);
        }, 2000);
    }

    // Show order confirmation
    function showOrderConfirmation(orderData) {
        const confirmationHTML = `
            <div class="order-confirmation">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your order, ${orderData.customer.firstName}!</p>
                <div class="order-details">
                    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                    <p><strong>Total:</strong> EGP ${orderData.totals.total.toFixed(0)}</p>
                    <p><strong>Payment Method:</strong> Cash on Delivery</p>
                </div>

                <div class="confirmation-actions">
                    <button onclick="window.location.href='index.html'" class="continue-shopping-btn">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;

        document.querySelector('.checkout-main-2025').innerHTML = confirmationHTML;
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    // Form submission handler
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            // Disable submit button
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Simulate processing delay
            setTimeout(() => {
                const orderData = collectFormData();
                processOrder(orderData);
            }, 1500);
        });
    }

    // Listen for cart updates from other pages
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            loadCart();
        }
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .order-confirmation {
            text-align: center;
            padding: 4rem 2rem;
            background: var(--background-card);
            border-radius: 20px;
            box-shadow: var(--shadow-subtle);
            max-width: 600px;
            margin: 0 auto;
        }
        
        .confirmation-icon {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 2rem;
        }
        
        .order-confirmation h2 {
            font-size: 2rem;
            color: var(--text-primary);
            margin-bottom: 1rem;
        }
        
        .order-details {
            background: var(--background-primary);
            padding: 1.5rem;
            border-radius: 12px;
            margin: 2rem 0;
        }
        
        .continue-shopping-btn {
            background: var(--accent-color);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .continue-shopping-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-medium);
        }

        .confirmation-info {
            background: var(--background-primary);
            padding: 1.5rem;
            border-radius: 12px;
            margin: 2rem 0;
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1rem;
            color: var(--text-secondary);
        }

        .info-item:last-child {
            margin-bottom: 0;
        }

        .info-item i {
            color: var(--accent-color);
            font-size: 1.1rem;
            width: 20px;
        }

        .info-item span {
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .whatsapp-info {
            background: #e8f5e8;
            border: 1px solid #25d366;
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .whatsapp-icon {
            width: 50px;
            height: 50px;
            background: #25d366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
        }

        .whatsapp-text h4 {
            color: #25d366;
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }

        .whatsapp-text p {
            color: #2d5a2d;
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.4;
        }

        .confirmation-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .resend-whatsapp-btn {
            background: #25d366;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .resend-whatsapp-btn:hover {
            background: #1ea952;
            transform: translateY(-2px);
            box-shadow: var(--shadow-medium);
        }
    `;
    document.head.appendChild(style);

    // Initialize checkout
    loadCart();
});
