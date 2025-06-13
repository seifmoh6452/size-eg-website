document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const productGrid = document.querySelector('.product-grid');
    const productTotal = document.getElementById('product-total');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('sort-products');
    const loadMoreBtn = document.getElementById('load-more');

    const defaultProducts = [];
    let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;
    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'default';
    let visibleProducts = 6; // Number of products to show initially

    function renderProducts() {
        productGrid.innerHTML = '';
        
        // Filter products
        let filteredProducts = products;
        
        if (currentFilter !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
        }
        
        // Search products
        if (currentSearch) {
            const searchLower = currentSearch.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchLower) || 
                p.category.toLowerCase().includes(searchLower)
            );
        }
        
        // Sort products
        switch(currentSort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // Keep default order
                break;
        }
        
        // Update product count
        productTotal.textContent = filteredProducts.length;
        
        // Limit visible products
        const productsToShow = filteredProducts.slice(0, visibleProducts);
        
        // Show/hide load more button
        if (filteredProducts.length > visibleProducts) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
        
        // Render products
        productsToShow.forEach((product, index) => {
            // Calculate random discount for demo purposes
            const hasDiscount = Math.random() > 0.7;
            const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
            const originalPrice = hasDiscount ? Math.floor(product.price * (100 / (100 - discountPercent))) : null;
            
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.category = product.category;
            productCard.style.setProperty('--card-index', index);
            
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-quick-actions">
                        <div class="quick-action-btn"><i class="far fa-heart"></i></div>
                        <div class="quick-action-btn"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <div class="product-info-card">
                    <div class="product-category">${product.category}</div>
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">EGP ${product.price}</span>
                        ${hasDiscount ? `<span class="original-price">EGP ${originalPrice}</span>` : ''}
                        ${hasDiscount ? `<span class="discount">-${discountPercent}%</span>` : ''}
                    </div>
                    <a href="product-detail.html?id=${product.id}" class="cta-button">View Product</a>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderProducts();
        });
    });

    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value;
        renderProducts();
    });

    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderProducts();
    });

    loadMoreBtn.addEventListener('click', () => {
        visibleProducts += 6; // Load 6 more products
        renderProducts();
    });

    renderProducts();
});
