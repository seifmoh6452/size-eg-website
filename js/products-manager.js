// Simple Products Manager - No Database Needed
class ProductsManager {
    constructor() {
        this.productsFile = 'products.json';
        this.ordersFile = 'orders.json';
        this.products = [];
        this.orders = [];
        
        console.log('Products Manager initialized');
    }

    // Load products from JSON file
    async loadProducts() {
        try {
            const response = await fetch(this.productsFile);
            if (response.ok) {
                this.products = await response.json();
                console.log('Loaded products from JSON:', this.products.length);
                return this.products;
            }
        } catch (error) {
            console.log('Error loading products.json, trying fallbacks:', error);
        }

        // Fallback to localStorage or embedded data
        return this.loadFromLocalStorage();
    }

    // Embedded products data (works on all hosting platforms)
    getEmbeddedProducts() {
        return [
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
    }

    // Fallback to localStorage or embedded data
    loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem('products');
            if (stored) {
                this.products = JSON.parse(stored);
                console.log('Loaded products from localStorage:', this.products.length);
                return this.products;
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }

        // Final fallback: Use embedded products
        console.log('Using embedded products as final fallback');
        this.products = this.getEmbeddedProducts();
        console.log('Loaded embedded products:', this.products.length);
        return this.products;
    }

    // Save products to localStorage (since we can't write to JSON file from browser)
    saveProducts() {
        try {
            localStorage.setItem('products', JSON.stringify(this.products));
            console.log('Products saved to localStorage');
            return true;
        } catch (error) {
            console.error('Error saving products:', error);
            return false;
        }
    }

    // Add new product
    addProduct(product) {
        const newProduct = {
            id: Date.now(),
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description || '',
            imageFront: product.imageFront,
            imageBack: product.imageBack,
            image: product.imageFront, // Backward compatibility
            stock: product.stock || 0,
            featured: product.featured || false,
            created: new Date().toISOString()
        };
        
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    // Update product
    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id == id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
            this.saveProducts();
            return this.products[index];
        }
        return null;
    }

    // Delete product
    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id == id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get product by ID
    getProduct(id) {
        return this.products.find(p => p.id == id);
    }

    // Load orders for income tracking
    async loadOrders() {
        try {
            const stored = localStorage.getItem('orders');
            if (stored) {
                this.orders = JSON.parse(stored);
            } else {
                this.orders = [];
            }
            return this.orders;
        } catch (error) {
            console.error('Error loading orders:', error);
            this.orders = [];
            return [];
        }
    }

    // Add order (for income tracking)
    addOrder(order) {
        const newOrder = {
            id: Date.now(),
            items: order.items,
            total: order.total,
            customer: order.customer,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        this.orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(this.orders));
        return newOrder;
    }

    // Get income statistics
    getIncomeStats() {
        const today = new Date();
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const thisYear = new Date(today.getFullYear(), 0, 1);

        const stats = {
            totalIncome: 0,
            todayIncome: 0,
            monthIncome: 0,
            yearIncome: 0,
            totalOrders: this.orders.length,
            todayOrders: 0,
            monthOrders: 0,
            yearOrders: 0
        };

        this.orders.forEach(order => {
            const orderDate = new Date(order.date);
            const orderTotal = parseFloat(order.total) || 0;

            stats.totalIncome += orderTotal;

            // Today
            if (orderDate.toDateString() === today.toDateString()) {
                stats.todayIncome += orderTotal;
                stats.todayOrders++;
            }

            // This month
            if (orderDate >= thisMonth) {
                stats.monthIncome += orderTotal;
                stats.monthOrders++;
            }

            // This year
            if (orderDate >= thisYear) {
                stats.yearIncome += orderTotal;
                stats.yearOrders++;
            }
        });

        return stats;
    }

    // Generate downloadable products.json file
    downloadProductsJSON() {
        const dataStr = JSON.stringify(this.products, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'products.json';
        link.click();
    }

    // Generate downloadable orders.json file
    downloadOrdersJSON() {
        const dataStr = JSON.stringify(this.orders, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'orders.json';
        link.click();
    }

    // Import products from uploaded JSON file
    async importProductsFromFile(file) {
        try {
            const text = await file.text();
            const importedProducts = JSON.parse(text);
            
            if (Array.isArray(importedProducts)) {
                this.products = importedProducts;
                this.saveProducts();
                console.log('Products imported successfully:', this.products.length);
                return true;
            } else {
                throw new Error('Invalid JSON format');
            }
        } catch (error) {
            console.error('Error importing products:', error);
            return false;
        }
    }

    // Create product from image file name
    createProductFromImage(imageName, price = 299, category = 't-shirt') {
        // Extract product name from image filename
        const name = imageName
            .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '') // Remove extension
            .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
            .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

        return {
            name: name,
            price: price,
            category: category,
            description: `High quality ${name.toLowerCase()}`,
            imageFront: `images/products/${imageName}`,
            imageBack: null,
            stock: 10,
            featured: false
        };
    }
}

// Create global instance
window.productsManager = new ProductsManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsManager;
}
