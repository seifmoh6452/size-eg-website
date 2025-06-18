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

    // Embedded products data (fallback for hosting platforms)
    const EMBEDDED_PRODUCTS = [
        {
            "id": 1,
            "name": "Astro World T-shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Exclusive Astro World design t-shirt",
            "imageFront": "products/Astro World T-shirt .jpg",
            "imageBack": "products/Astro World T-shirt Back .jpg",
            "image": "products/Astro World T-shirt .jpg",
            "stock": 25,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 2,
            "name": "Cactus Jack T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Official Cactus Jack design t-shirt",
            "imageFront": "products/Cactus Jack T-Shirt.jpg",
            "imageBack": null,
            "image": "products/Cactus Jack T-Shirt.jpg",
            "stock": 30,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 3,
            "name": "Regret Nothing T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Motivational Regret Nothing design",
            "imageFront": "products/Regret Nothing T- Shirt.jpg",
            "imageBack": "products/Regret Nothing T- Shirt back .jpg",
            "image": "products/Regret Nothing T- Shirt.jpg",
            "stock": 20,
            "featured": false,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 4,
            "name": "Sniper T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Cool Sniper design t-shirt",
            "imageFront": "products/Sniper T-Shirt.jpg",
            "imageBack": "products/Sniper T-Shirt Back.jpg",
            "image": "products/Sniper T-Shirt.jpg",
            "stock": 15,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 5,
            "name": "Space Travis T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Space Travis design t-shirt",
            "imageFront": "products/Space Travis T-Shirt.jpg",
            "imageBack": null,
            "image": "products/Space Travis T-Shirt.jpg",
            "stock": 18,
            "featured": false,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 6,
            "name": "Classic Shorts",
            "price": 450,
            "category": "shorts",
            "description": "Comfortable classic shorts",
            "imageFront": "products/classic shorts.jpg",
            "imageBack": null,
            "image": "products/classic shorts.jpg",
            "stock": 35,
            "featured": false,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 7,
            "name": "The Pink King Shorts",
            "price": 450,
            "category": "shorts",
            "description": "Stylish Pink King design shorts",
            "imageFront": "products/The Pink King Shorts.jpg",
            "imageBack": "products/The Pink King Shorts back.jpg",
            "image": "products/The Pink King Shorts.jpg",
            "stock": 22,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 8,
            "name": "Classic Size Cap",
            "price": 450,
            "category": "cap",
            "description": "Classic Size.eg cap with premium design",
            "imageFront": "products/Classic Size.jpg",
            "imageBack": null,
            "image": "products/Classic Size.jpg",
            "stock": 30,
            "featured": true,
            "sizes": ["One Size"],
            "hasSize": true
        },
        {
            "id": 9,
            "name": "Liberty T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Liberty design t-shirt with premium quality",
            "imageFront": "products/liberty-tshirt.jpg",
            "imageBack": "products/liberty-tshirt-back.jpg",
            "image": "products/liberty-tshirt.jpg",
            "stock": 25,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 10,
            "name": "Timeless T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Timeless design t-shirt with premium quality",
            "imageFront": "products/Time less-Tshirt.jpg",
            "imageBack": "products/Time less-Tshirt Back.jpg",
            "image": "products/Time less-Tshirt.jpg",
            "stock": 25,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 11,
            "name": "Old Money T-Shirt",
            "price": 450,
            "category": "t-shirt",
            "description": "Old Money aesthetic t-shirt with premium quality",
            "imageFront": "products/old money-tshirt.jpg",
            "imageBack": "products/old money-tshirt back.jpg",
            "image": "products/old money-tshirt.jpg",
            "stock": 25,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        },
        {
            "id": 12,
            "name": "Old Money T-Shirt Pink",
            "price": 450,
            "category": "t-shirt",
            "description": "Old Money aesthetic t-shirt in pink with premium quality",
            "imageFront": "products/old money-tshirt pink.jpg",
            "imageBack": "products/old money-tshirt pink back.jpg",
            "image": "products/old money-tshirt pink.jpg",
            "stock": 25,
            "featured": true,
            "sizes": ["S", "M", "L", "XL"],
            "hasSize": true
        }
    ];

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
            console.log('Sample product from manager:', products[0]);

            // Force add sizes to all products
            products = products.map(product => ({
                ...product,
                hasSize: true,
                sizes: product.category === 'cap' ? ["One Size"] : ["S", "M", "L", "XL"]
            }));
            console.log('Added sizes to all products');

            // Force add cap if not present
            const hasCapProduct = products.some(p => p.category === 'cap');
            if (!hasCapProduct) {
                console.log('Cap not found, adding it manually');
                products.push({
                    "id": 8,
                    "name": "Classic Size Cap",
                    "price": 450,
                    "category": "cap",
                    "description": "Classic Size.eg cap with premium design",
                    "imageFront": "products/Classic Size.jpg",
                    "imageBack": null,
                    "image": "products/Classic Size.jpg",
                    "stock": 30,
                    "featured": true,
                    "sizes": ["One Size"],
                    "hasSize": true
                });
                console.log('Cap added, total products now:', products.length);
            }

            // Force add Liberty T-Shirt if not present
            const hasLibertyProduct = products.some(p => p.name === 'Liberty T-Shirt');
            if (!hasLibertyProduct) {
                console.log('Liberty T-Shirt not found, adding it manually');
                products.push({
                    "id": 9,
                    "name": "Liberty T-Shirt",
                    "price": 450,
                    "category": "t-shirt",
                    "description": "Liberty design t-shirt with premium quality",
                    "imageFront": "products/liberty-tshirt.jpg",
                    "imageBack": "products/liberty-tshirt-back.jpg",
                    "image": "products/liberty-tshirt.jpg",
                    "stock": 25,
                    "featured": true,
                    "sizes": ["S", "M", "L", "XL"],
                    "hasSize": true
                });
                console.log('Liberty T-Shirt added, total products now:', products.length);
            }

            // Force add Timeless T-Shirt if not present
            const hasTimelessProduct = products.some(p => p.name === 'Timeless T-Shirt');
            if (!hasTimelessProduct) {
                console.log('Timeless T-Shirt not found, adding it manually');
                products.push({
                    "id": 10,
                    "name": "Timeless T-Shirt",
                    "price": 450,
                    "category": "t-shirt",
                    "description": "Timeless design t-shirt with premium quality",
                    "imageFront": "products/Time less-Tshirt.jpg",
                    "imageBack": "products/Time less-Tshirt Back.jpg",
                    "image": "products/Time less-Tshirt.jpg",
                    "stock": 25,
                    "featured": true,
                    "sizes": ["S", "M", "L", "XL"],
                    "hasSize": true
                });
                console.log('Timeless T-Shirt added, total products now:', products.length);
            }

            // Force add Old Money T-Shirt if not present
            const hasOldMoneyProduct = products.some(p => p.name === 'Old Money T-Shirt');
            if (!hasOldMoneyProduct) {
                console.log('Old Money T-Shirt not found, adding it manually');
                products.push({
                    "id": 11,
                    "name": "Old Money T-Shirt",
                    "price": 450,
                    "category": "t-shirt",
                    "description": "Old Money aesthetic t-shirt with premium quality",
                    "imageFront": "products/old money-tshirt.jpg",
                    "imageBack": "products/old money-tshirt back.jpg",
                    "image": "products/old money-tshirt.jpg",
                    "stock": 25,
                    "featured": true,
                    "sizes": ["S", "M", "L", "XL"],
                    "hasSize": true
                });
                console.log('Old Money T-Shirt added, total products now:', products.length);
            }

            // Force add Old Money Pink T-Shirt if not present
            const hasOldMoneyPinkProduct = products.some(p => p.name === 'Old Money T-Shirt Pink');
            if (!hasOldMoneyPinkProduct) {
                console.log('Old Money T-Shirt Pink not found, adding it manually');
                products.push({
                    "id": 12,
                    "name": "Old Money T-Shirt Pink",
                    "price": 450,
                    "category": "t-shirt",
                    "description": "Old Money aesthetic t-shirt in pink with premium quality",
                    "imageFront": "products/old money-tshirt pink.jpg",
                    "imageBack": "products/old money-tshirt pink back.jpg",
                    "image": "products/old money-tshirt pink.jpg",
                    "stock": 25,
                    "featured": true,
                    "sizes": ["S", "M", "L", "XL"],
                    "hasSize": true
                });
                console.log('Old Money T-Shirt Pink added, total products now:', products.length);
            }

            if (products.length === 0) {
                showEmptyState();
            }
        } catch (error) {
            console.log('Error loading products, falling back to localStorage:', error);
            loadProductsFromLocalStorage();
        }
    }

    // Fallback: Load products from localStorage or embedded data
    function loadProductsFromLocalStorage() {
        try {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                products = JSON.parse(storedProducts);
                console.log('Loaded products from localStorage:', products.length);

                // Force add sizes to all products
                products = products.map(product => ({
                    ...product,
                    hasSize: true,
                    sizes: product.category === 'cap' ? ["One Size"] : ["S", "M", "L", "XL"]
                }));
                console.log('Added sizes to localStorage products');

                // Force add cap if not present
                const hasCapProduct = products.some(p => p.category === 'cap');
                if (!hasCapProduct) {
                    console.log('Cap not found in localStorage, adding it manually');
                    products.push({
                        "id": 8,
                        "name": "Classic Size Cap",
                        "price": 450,
                        "category": "cap",
                        "description": "Classic Size.eg cap with premium design",
                        "imageFront": "products/Classic Size.jpg",
                        "imageBack": null,
                        "image": "products/Classic Size.jpg",
                        "stock": 30,
                        "featured": true,
                        "sizes": ["One Size"],
                        "hasSize": true
                    });
                    console.log('Cap added to localStorage products, total now:', products.length);
                }

                // Force add Liberty T-Shirt if not present
                const hasLibertyProduct = products.some(p => p.name === 'Liberty T-Shirt');
                if (!hasLibertyProduct) {
                    console.log('Liberty T-Shirt not found in localStorage, adding it manually');
                    products.push({
                        "id": 9,
                        "name": "Liberty T-Shirt",
                        "price": 450,
                        "category": "t-shirt",
                        "description": "Liberty design t-shirt with premium quality",
                        "imageFront": "products/liberty-tshirt.jpg",
                        "imageBack": "products/liberty-tshirt-back.jpg",
                        "image": "products/liberty-tshirt.jpg",
                        "stock": 25,
                        "featured": true,
                        "sizes": ["S", "M", "L", "XL"],
                        "hasSize": true
                    });
                    console.log('Liberty T-Shirt added to localStorage products, total now:', products.length);
                }

                // Force add Timeless T-Shirt if not present
                const hasTimelessProduct = products.some(p => p.name === 'Timeless T-Shirt');
                if (!hasTimelessProduct) {
                    console.log('Timeless T-Shirt not found in localStorage, adding it manually');
                    products.push({
                        "id": 10,
                        "name": "Timeless T-Shirt",
                        "price": 450,
                        "category": "t-shirt",
                        "description": "Timeless design t-shirt with premium quality",
                        "imageFront": "products/Time less-Tshirt.jpg",
                        "imageBack": "products/Time less-Tshirt Back.jpg",
                        "image": "products/Time less-Tshirt.jpg",
                        "stock": 25,
                        "featured": true,
                        "sizes": ["S", "M", "L", "XL"],
                        "hasSize": true
                    });
                    console.log('Timeless T-Shirt added to localStorage products, total now:', products.length);
                }

                // Force add Old Money T-Shirt if not present
                const hasOldMoneyProduct = products.some(p => p.name === 'Old Money T-Shirt');
                if (!hasOldMoneyProduct) {
                    console.log('Old Money T-Shirt not found in localStorage, adding it manually');
                    products.push({
                        "id": 11,
                        "name": "Old Money T-Shirt",
                        "price": 450,
                        "category": "t-shirt",
                        "description": "Old Money aesthetic t-shirt with premium quality",
                        "imageFront": "products/old money-tshirt.jpg",
                        "imageBack": "products/old money-tshirt back.jpg",
                        "image": "products/old money-tshirt.jpg",
                        "stock": 25,
                        "featured": true,
                        "sizes": ["S", "M", "L", "XL"],
                        "hasSize": true
                    });
                    console.log('Old Money T-Shirt added to localStorage products, total now:', products.length);
                }

                // Force add Old Money Pink T-Shirt if not present
                const hasOldMoneyPinkProduct = products.some(p => p.name === 'Old Money T-Shirt Pink');
                if (!hasOldMoneyPinkProduct) {
                    console.log('Old Money T-Shirt Pink not found in localStorage, adding it manually');
                    products.push({
                        "id": 12,
                        "name": "Old Money T-Shirt Pink",
                        "price": 450,
                        "category": "t-shirt",
                        "description": "Old Money aesthetic t-shirt in pink with premium quality",
                        "imageFront": "products/old money-tshirt pink.jpg",
                        "imageBack": "products/old money-tshirt pink back.jpg",
                        "image": "products/old money-tshirt pink.jpg",
                        "stock": 25,
                        "featured": true,
                        "sizes": ["S", "M", "L", "XL"],
                        "hasSize": true
                    });
                    console.log('Old Money T-Shirt Pink added to localStorage products, total now:', products.length);
                }
                return;
            }
        } catch (error) {
            console.log('Error loading products from localStorage:', error);
        }

        // Final fallback: Use embedded products data
        console.log('Using embedded products data as fallback');
        products = EMBEDDED_PRODUCTS;
        console.log('Loaded embedded products:', products.length);
        console.log('First product details:', products[0]);
        console.log('Last product details (should be cap):', products[products.length - 1]);

        if (products.length === 0) {
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

        // Clear any old cached products to ensure fresh load
        console.log('Clearing cached products for fresh load...');
        localStorage.removeItem('products');

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
            shorts: products.filter(p => p.category === 'shorts').length,
            cap: products.filter(p => p.category === 'cap').length
        };

        console.log('Product counts:', counts);
        console.log('Cap products found:', products.filter(p => p.category === 'cap').map(p => p.name));
        console.log('T-shirt products found:', products.filter(p => p.category === 't-shirt').map(p => p.name));
        console.log('All products loaded:', products.map(p => `${p.name} (${p.category})`));

        document.getElementById('count-all').textContent = counts.all;
        document.getElementById('count-tshirt').textContent = counts['t-shirt'];
        document.getElementById('count-shorts').textContent = counts.shorts;
        document.getElementById('count-caps').textContent = counts.cap;

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
            console.log('Filtering by category:', currentFilter);
            console.log('Products before filter:', filteredProducts.map(p => `${p.name} (${p.category})`));
            filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
            console.log('After category filter:', filteredProducts.length);
            console.log('Filtered products:', filteredProducts.map(p => `${p.name} (${p.category})`));
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
        console.log('Creating card for product:', product.name, 'category:', product.category, 'hasSize:', product.hasSize, 'sizes:', product.sizes);

        if (product.category === 'cap') {
            console.log('Creating CAP card for:', product.name, 'image:', product.imageFront);
        }

        const card = document.createElement('div');
        card.className = 'product-card-2025';
        card.style.setProperty('--card-index', index);

        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        // Handle front and back images
        const frontImage = product.imageFront || product.image;
        const backImage = product.imageBack;

        console.log(`Product: ${product.name}, Front Image: ${frontImage}, Back Image: ${backImage}`);

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
                <div class="size-selector">
                    <label class="size-label">Size:</label>
                    <select class="size-select" id="size-${product.id}" required>
                        <option value="">Select Size</option>
                        ${product.category === 'cap' ?
                            '<option value="One Size">One Size</option>' :
                            '<option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option>'
                        }
                    </select>
                </div>
                <button class="product-cta-2025" onclick="addToCartWithSize(${product.id})">
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
    window.addToCartWithSize = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        let selectedSize = null;

        // Always require size selection for clothing
        const sizeSelect = document.getElementById(`size-${productId}`);
        if (sizeSelect) {
            selectedSize = sizeSelect.value;
            if (!selectedSize) {
                showNotification('Please select a size first!', 'error');
                sizeSelect.focus();
                return;
            }
        }

        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Create unique item key (id + size for items with sizes)
        const itemKey = product.hasSize ? `${product.id}-${selectedSize}` : product.id;

        // Check if item already exists in cart (same product + same size)
        const existingItem = cart.find(item => {
            return item.id === product.id && item.size === selectedSize;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.imageFront || product.image,
                category: product.category,
                quantity: 1
            };

            // Always add size for clothing
            cartItem.size = selectedSize;
            cartItem.displayName = `${product.name} (${selectedSize})`;

            cart.push(cartItem);
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
        const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
        showNotification(`${product.name}${sizeText} added to cart!`, 'success');

        // Reset size selection
        const sizeSelectReset = document.getElementById(`size-${productId}`);
        if (sizeSelectReset) {
            sizeSelectReset.value = '';
        }

        // Trigger storage event for other pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'cart',
            newValue: JSON.stringify(cart)
        }));
    };

    // Backward compatibility
    window.addToCart = window.addToCartWithSize;

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
