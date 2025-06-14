// Modern Products Page 2025 - Enhanced Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const nav = document.querySelector('.modern-nav-2025');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.querySelector('.search-input');

    // Products page elements
    const productGrid = document.getElementById('product-grid-2025');
    const searchInput2025 = document.getElementById('product-search-2025');
    const searchClear = document.getElementById('search-clear');
    const filterTabs = document.querySelectorAll('.filter-tab-2025');
    const sortSelect = document.getElementById('sort-products-2025');
    const viewBtns = document.querySelectorAll('.view-btn');
    const loadMoreBtn = document.getElementById('load-more-2025');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Counter elements
    const totalProductsEl = document.getElementById('total-products');
    const visibleCountEl = document.getElementById('visible-count');
    const totalCountEl = document.getElementById('total-count');
    const activeFiltersEl = document.getElementById('active-filters');

    // Products data - loaded from admin/database
    let products = [];

    // State management
    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'default';
    let currentView = 'grid';
    let visibleProducts = 6;
    let filteredProducts = [...products];

    // Load products from JSON/localStorage
    async function loadProducts() {
        try {
            // Check if products manager is available
            if (!window.productsManager) {
                console.log('Products manager not available, falling back to localStorage');
                loadProductsFromLocalStorage();
                return;
            }

            products = await window.productsManager.loadProducts();
            console.log('Loaded products:', products.length);

            if (products.length === 0) {
                showEmptyState();
            }
        } catch (error) {
            console.log('Error loading products, falling back to localStorage:', error);
            loadProductsFromLocalStorage();
        }
    }

    // Fallback: Load products from localStorage
    function loadProductsFromLocalStorage() {
        try {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                products = JSON.parse(storedProducts);
                console.log('Loaded products from localStorage:', products.length);
            } else {
                products = [];
                showEmptyState();
            }
        } catch (error) {
            console.log('Error loading products from localStorage:', error);
            products = [];
            showEmptyState();
        }
    }

    // Show empty state when no products
    function showEmptyState() {
        if (productGrid) {
            productGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-tshirt"></i>
                    </div>
                    <h3>No Products Yet</h3>
                    <p>Products will appear here when you add them through the admin panel.</p>
                </div>
            `;
        }
    }

    // Refresh products
    async function refreshProducts() {
        await loadProducts();
        updateProductCounts();
        filterProducts();
        renderProducts();
        updateResultsInfo();
    }

    // Listen for storage changes (when admin adds/removes products)
    window.addEventListener('storage', function(e) {
        if (e.key === 'products') {
            console.log('Products updated in admin, refreshing...');
            refreshProducts();
        }
    });

    // Listen for focus events (when switching back from admin tab)
    window.addEventListener('focus', function() {
        const currentProductsString = localStorage.getItem('products');
        const currentProducts = currentProductsString ? JSON.parse(currentProductsString) : [];

        // Only refresh if products actually changed
        if (JSON.stringify(products) !== JSON.stringify(currentProducts)) {
            console.log('Products changed while away, refreshing...');
            refreshProducts();
        }
    });

    // Check if all required elements are available
    function checkElements() {
        const requiredElements = {
            productGrid: document.getElementById('product-grid-2025'),
            searchInput2025: document.getElementById('product-search-2025'),
            searchClear: document.getElementById('search-clear'),
            filterTabs: document.querySelectorAll('.filter-tab-2025'),
            sortSelect: document.getElementById('sort-products-2025'),
            scrollIndicator: document.querySelector('.scroll-indicator'),
            loadMoreBtn: document.getElementById('load-more-2025')
        };

        console.log('Element check results:');
        Object.entries(requiredElements).forEach(([name, element]) => {
            const found = element && (element.length !== undefined ? element.length > 0 : true);
            console.log(`${name}: ${found ? '✓' : '✗'}`);
        });

        return requiredElements;
    }

    // Load and display cart count
    function loadCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            if (totalItems > 0) {
                cartBadge.classList.add('show');
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.classList.remove('show');
                cartBadge.style.display = 'none';
            }
        }
    }

    // Initialize page
    async function init() {
        console.log('Initializing products page...');

        // Check elements first
        checkElements();

        await loadProducts();
        loadCartCount(); // Load cart count on page load
        updateProductCounts();
        filterProducts(); // Apply filters first
        renderProducts(); // Then render
        updateResultsSummary(); // Update counts
        setupEventListeners();
        setupScrollEffects();
        animateHeroStats();

        console.log('Products page initialization complete');
    }

    // Update product counts in tabs
    function updateProductCounts() {
        const counts = {
            all: products.length,
            't-shirt': products.filter(p => p.category === 't-shirt').length,
            shorts: products.filter(p => p.category === 'shorts').length
        };

        document.getElementById('count-all').textContent = counts.all;
        document.getElementById('count-tshirt').textContent = counts['t-shirt'];
        document.getElementById('count-shorts').textContent = counts.shorts;

        if (totalProductsEl) {
            totalProductsEl.textContent = counts.all;
        }
    }

    // Filter products
    function filterProducts() {
        console.log('Filtering products...');
        console.log('Total products:', products.length);
        console.log('Current filter:', currentFilter);
        console.log('Current search:', currentSearch);
        console.log('Current sort:', currentSort);

        filteredProducts = [...products];

        // Apply category filter
        if (currentFilter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
            console.log('After category filter:', filteredProducts.length);
        }

        // Apply search filter
        if (currentSearch) {
            const searchLower = currentSearch.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower)
            );
            console.log('After search filter:', filteredProducts.length);
        }

        // Apply sorting
        switch(currentSort) {
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'default':
                filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        console.log('Final filtered products:', filteredProducts.length);
        updateResultsSummary();
        renderProducts();
    }

    // Update results summary
    function updateResultsSummary() {
        const showing = Math.min(visibleProducts, filteredProducts.length);
        const total = filteredProducts.length;

        if (visibleCountEl) visibleCountEl.textContent = showing;
        if (totalCountEl) totalCountEl.textContent = total;

        // Update active filters
        const activeFilters = [];
        if (currentFilter !== 'all') {
            activeFilters.push(currentFilter);
        }
        if (currentSearch) {
            activeFilters.push(`"${currentSearch}"`);
        }

        if (activeFiltersEl) {
            if (activeFilters.length > 0) {
                activeFiltersEl.innerHTML = activeFilters.map(filter => 
                    `<span class="filter-tag">${filter} <span class="remove" onclick="removeFilter('${filter}')">×</span></span>`
                ).join('');
            } else {
                activeFiltersEl.innerHTML = '';
            }
        }

        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredProducts.length > visibleProducts ? 'inline-flex' : 'none';
        }
    }

    // Render products
    function renderProducts() {
        if (!productGrid) return;

        const productsToShow = filteredProducts.slice(0, visibleProducts);
        productGrid.innerHTML = '';

        productsToShow.forEach((product, index) => {
            const productCard = createProductCard(product, index);
            productGrid.appendChild(productCard);
        });

        // Apply view mode
        productGrid.className = `product-grid-2025 ${currentView}-view`;
    }

    // Create product card
    function createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card-2025';
        card.style.setProperty('--card-index', index);

        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        // Handle front and back images
        const frontImage = product.imageFront || product.image;
        const backImage = product.imageBack;

        card.innerHTML = `
            <div class="product-image-container-2025">
                <div class="product-images-wrapper">
                    <img src="${frontImage}" alt="${product.name} Front" class="product-image-2025 front-image active" data-view="front">
                    ${backImage ? `<img src="${backImage}" alt="${product.name} Back" class="product-image-2025 back-image" data-view="back">` : ''}
                </div>
                ${backImage ? `
                    <div class="image-toggle-buttons">
                        <button class="image-toggle-btn active" data-view="front" title="Front View">
                            <span>Front</span>
                        </button>
                        <button class="image-toggle-btn" data-view="back" title="Back View">
                            <span>Back</span>
                        </button>
                    </div>
                ` : ''}
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : ''}
                <div class="product-actions-2025">
                    <button class="action-btn-2025" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn-2025" title="Quick View">
                        <i class="fas fa-search"></i>
                    </button>
                    <button class="action-btn-2025" title="Compare">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
            </div>
            <div class="product-info-2025">
                <div class="product-category-2025">${product.category.replace('-', ' ')}</div>
                <h3 class="product-title-2025">${product.name}</h3>
                <div class="product-price-2025">
                    <span class="current-price-2025">EGP ${product.price}</span>
                    ${hasDiscount ? `<span class="original-price-2025">EGP ${product.originalPrice}</span>` : ''}
                    ${hasDiscount ? `<span class="discount-badge-2025">-${discountPercent}%</span>` : ''}
                </div>
                <button class="product-cta-2025" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;

        return card;
    }

    // Setup event listeners
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        console.log('Filter tabs found:', filterTabs.length);
        console.log('Scroll indicator found:', !!scrollIndicator);
        console.log('Search input found:', !!searchInput2025);
        console.log('Sort select found:', !!sortSelect);

        // Search functionality
        if (searchInput2025) {
            console.log('Setting up search input listener');
            searchInput2025.addEventListener('input', (e) => {
                console.log('Search input changed:', e.target.value);
                currentSearch = e.target.value;
                if (currentSearch) {
                    if (searchClear) searchClear.classList.add('show');
                } else {
                    if (searchClear) searchClear.classList.remove('show');
                }
                filterProducts();
            });
        } else {
            console.error('Search input not found!');
        }

        if (searchClear) {
            console.log('Setting up search clear button');
            searchClear.addEventListener('click', () => {
                console.log('Search clear clicked');
                if (searchInput2025) {
                    searchInput2025.value = '';
                    currentSearch = '';
                    searchClear.classList.remove('show');
                    filterProducts();
                }
            });
        }

        // Filter tabs - Enhanced with better error handling
        if (filterTabs && filterTabs.length > 0) {
            filterTabs.forEach((tab, index) => {
                console.log(`Setting up filter tab ${index}:`, tab.dataset.filter);
                if (tab && tab.dataset && tab.dataset.filter) {
                    tab.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('Filter tab clicked:', tab.dataset.filter);

                        // Remove active class from all tabs
                        filterTabs.forEach(t => {
                            if (t && t.classList) {
                                t.classList.remove('active');
                            }
                        });

                        // Add active class to clicked tab
                        tab.classList.add('active');
                        currentFilter = tab.dataset.filter;
                        visibleProducts = 6; // Reset visible products

                        console.log('Current filter set to:', currentFilter);
                        filterProducts();
                    });
                } else {
                    console.error('Invalid filter tab:', tab);
                }
            });
        } else {
            console.error('No filter tabs found!');
        }

        // Sort dropdown
        if (sortSelect) {
            console.log('Setting up sort dropdown');
            sortSelect.addEventListener('change', (e) => {
                console.log('Sort changed to:', e.target.value);
                currentSort = sortSelect.value;
                filterProducts();
            });
        } else {
            console.error('Sort select not found!');
        }

        // View toggle
        if (viewBtns && viewBtns.length > 0) {
            viewBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('View button clicked:', btn.dataset.view);
                    viewBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentView = btn.dataset.view;
                    renderProducts();
                });
            });
        }

        // Load more button
        if (loadMoreBtn) {
            console.log('Setting up load more button');
            loadMoreBtn.addEventListener('click', () => {
                console.log('Load more clicked');
                visibleProducts += 6;
                filterProducts();
            });
        }

        // Scroll indicator - Enhanced with better targeting
        if (scrollIndicator) {
            console.log('Setting up scroll indicator...');
            scrollIndicator.addEventListener('click', (e) => {
                console.log('Scroll indicator clicked!');
                e.preventDefault();
                e.stopPropagation();

                // Try multiple target selectors
                const targets = [
                    '.products-controls-2025',
                    '.advanced-search',
                    '.filter-tabs-2025',
                    '#product-search-2025'
                ];

                let targetFound = false;
                for (const selector of targets) {
                    const target = document.querySelector(selector);
                    if (target) {
                        console.log('Scrolling to:', selector);
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        targetFound = true;
                        break;
                    }
                }

                if (!targetFound) {
                    console.error('No scroll target found!');
                    // Fallback: scroll to a fixed position
                    window.scrollTo({
                        top: 600,
                        behavior: 'smooth'
                    });
                }
            });
        } else {
            console.error('Scroll indicator not found!');
        }

        // Setup image toggle functionality
        setupImageToggle();
    }

    // Setup image toggle functionality for front/back views
    function setupImageToggle() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.image-toggle-btn')) {
                const button = e.target.closest('.image-toggle-btn');
                const view = button.dataset.view;
                const container = button.closest('.product-image-container-2025');

                if (container) {
                    // Update button states
                    const buttons = container.querySelectorAll('.image-toggle-btn');
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    // Update image visibility
                    const images = container.querySelectorAll('.product-image-2025');
                    images.forEach(img => {
                        img.classList.remove('active');
                        if (img.dataset.view === view) {
                            img.classList.add('active');
                        }
                    });
                }
            }
        });
    }

    // Setup scroll effects
    function setupScrollEffects() {
        // Header scroll effect
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }

        // Simple parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.products-hero-2025');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Animate hero stats
    function animateHeroStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    if (!isNaN(finalValue)) {
                        animateNumber(target, 0, parseInt(finalValue), 2000);
                    }
                    
                    observer.unobserve(target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Animate number counting
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Global functions
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            // Get current cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.imageFront || product.image,
                    category: product.category,
                    quantity: 1
                });
            }

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart badge
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartBadge = document.querySelector('.cart-badge');
            if (cartBadge) {
                cartBadge.textContent = totalItems;
                if (totalItems > 0) {
                    cartBadge.classList.add('show');
                    cartBadge.style.display = 'flex';
                } else {
                    cartBadge.classList.remove('show');
                    cartBadge.style.display = 'none';
                }
            }

            // Show success notification
            showNotification(`${product.name} added to cart!`, 'success');

            // Trigger storage event for other pages
            window.dispatchEvent(new StorageEvent('storage', {
                key: 'cart',
                newValue: JSON.stringify(cart)
            }));
        }
    };

    // Show notification function
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
        }, 3000);
    }

    window.removeFilter = function(filter) {
        if (filter.startsWith('"') && filter.endsWith('"')) {
            // It's a search filter
            searchInput2025.value = '';
            currentSearch = '';
            searchClear.classList.remove('show');
        } else {
            // It's a category filter
            currentFilter = 'all';
            filterTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.filter === 'all') {
                    tab.classList.add('active');
                }
            });
        }
        filterProducts();
    };

    // Listen for cart updates from other pages
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            loadCartCount();
        }
    });

    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Initialize the page
    init();

    // Mobile optimizations
    if (window.innerWidth <= 768) {
        // Optimize for mobile
        document.body.classList.add('mobile-device');

        // Improve touch scrolling
        document.body.style.webkitOverflowScrolling = 'touch';

        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (window.innerWidth <= 768) {
                    document.querySelector('meta[name=viewport]').setAttribute('content',
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            });

            input.addEventListener('blur', () => {
                if (window.innerWidth <= 768) {
                    document.querySelector('meta[name=viewport]').setAttribute('content',
                        'width=device-width, initial-scale=1.0');
                }
            });
        });

        // Optimize image loading for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
});
