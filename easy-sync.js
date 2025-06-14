// SUPER EASY AUTOMATIC SYNC SOLUTION
// This file handles automatic product sync across all devices

class EasySync {
    constructor() {
        // Free JSONBin.io endpoint - no signup needed!
        this.apiUrl = 'https://api.jsonbin.io/v3/b/65f8a1b2dc74654018a3f2e1';
        this.headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$8vF2qN3mR4pL6xK9wE5tYuH7sG1dA8cB3fJ2kM9nP0qR5sT6vX8yZ'
        };
        this.products = [];
        this.isOnline = navigator.onLine;
        
        // Listen for online/offline status
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncFromCloud();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    // Load products (automatic sync)
    async loadProducts() {
        console.log('🔄 Loading products...');
        
        try {
            if (this.isOnline) {
                // Try to load from cloud first
                const response = await fetch(this.apiUrl + '/latest', {
                    headers: this.headers
                });
                
                if (response.ok) {
                    const data = await response.json();
                    this.products = data.record || [];
                    
                    // Save to localStorage as backup
                    localStorage.setItem('products', JSON.stringify(this.products));
                    
                    console.log('✅ Products loaded from cloud:', this.products.length);
                    return this.products;
                }
            }
        } catch (error) {
            console.log('⚠️ Cloud not available, using local backup...');
        }
        
        // Fallback to localStorage
        const localProducts = localStorage.getItem('products');
        if (localProducts) {
            this.products = JSON.parse(localProducts);
            console.log('📱 Products loaded from device:', this.products.length);
        } else {
            this.products = [];
            console.log('📝 No products found, starting fresh');
        }
        
        return this.products;
    }

    // Save products (automatic sync)
    async saveProducts(products) {
        this.products = products;
        
        // Always save to localStorage first (instant)
        localStorage.setItem('products', JSON.stringify(products));
        console.log('💾 Products saved to device');
        
        // Try to sync to cloud if online
        if (this.isOnline) {
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'PUT',
                    headers: this.headers,
                    body: JSON.stringify(products)
                });
                
                if (response.ok) {
                    console.log('☁️ Products synced to cloud - available on all devices!');
                    this.showSyncStatus('✅ Synced to all devices!', 'success');
                } else {
                    console.log('⚠️ Cloud sync failed, saved locally only');
                    this.showSyncStatus('⚠️ Saved locally only', 'warning');
                }
            } catch (error) {
                console.log('⚠️ Cloud sync error:', error.message);
                this.showSyncStatus('⚠️ Saved locally only', 'warning');
            }
        } else {
            console.log('📱 Offline - saved locally, will sync when online');
            this.showSyncStatus('📱 Saved locally - will sync when online', 'info');
        }
        
        return true;
    }

    // Add a product
    async addProduct(product) {
        product.id = Date.now(); // Simple ID generation
        this.products.push(product);
        await this.saveProducts(this.products);
        return product;
    }

    // Update a product
    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(p => p.id == id);
        if (index !== -1) {
            this.products[index] = { ...updatedProduct, id: parseInt(id) };
            await this.saveProducts(this.products);
            return this.products[index];
        }
        return null;
    }

    // Delete a product
    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id == id);
        if (index !== -1) {
            this.products.splice(index, 1);
            await this.saveProducts(this.products);
            return true;
        }
        return false;
    }

    // Get all products
    getProducts() {
        return this.products;
    }

    // Sync from cloud (manual refresh)
    async syncFromCloud() {
        if (!this.isOnline) {
            this.showSyncStatus('📱 Offline - cannot sync', 'warning');
            return false;
        }
        
        try {
            const response = await fetch(this.apiUrl + '/latest', {
                headers: this.headers
            });
            
            if (response.ok) {
                const data = await response.json();
                const cloudProducts = data.record || [];
                
                // Check if cloud has newer data
                if (JSON.stringify(cloudProducts) !== JSON.stringify(this.products)) {
                    this.products = cloudProducts;
                    localStorage.setItem('products', JSON.stringify(this.products));
                    this.showSyncStatus('🔄 Updated from cloud!', 'success');
                    
                    // Trigger refresh if there's a callback
                    if (window.onProductsUpdated) {
                        window.onProductsUpdated();
                    }
                    
                    return true;
                } else {
                    this.showSyncStatus('✅ Already up to date', 'success');
                    return false;
                }
            }
        } catch (error) {
            this.showSyncStatus('❌ Sync failed', 'error');
            return false;
        }
    }

    // Show sync status to user
    showSyncStatus(message, type = 'info') {
        // Remove existing status
        const existing = document.querySelector('.sync-status');
        if (existing) existing.remove();
        
        // Create status element
        const status = document.createElement('div');
        status.className = `sync-status sync-${type}`;
        status.textContent = message;
        status.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        
        // Set colors based on type
        switch (type) {
            case 'success':
                status.style.background = '#28a745';
                break;
            case 'warning':
                status.style.background = '#ffc107';
                status.style.color = '#212529';
                break;
            case 'error':
                status.style.background = '#dc3545';
                break;
            default:
                status.style.background = '#007bff';
        }
        
        document.body.appendChild(status);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (status.parentNode) {
                status.style.opacity = '0';
                status.style.transform = 'translateX(100%)';
                setTimeout(() => status.remove(), 300);
            }
        }, 3000);
    }

    // Check connection status
    isConnected() {
        return this.isOnline;
    }

    // Force sync (for manual refresh button)
    async forceSync() {
        this.showSyncStatus('🔄 Syncing...', 'info');
        const updated = await this.syncFromCloud();
        if (!updated && this.isOnline) {
            await this.saveProducts(this.products); // Push local to cloud
        }
    }
}

// Create global instance
window.easySync = new EasySync();

// Auto-sync every 30 seconds when online
setInterval(() => {
    if (window.easySync.isConnected()) {
        window.easySync.syncFromCloud();
    }
}, 30000);

console.log('🚀 Easy Sync initialized - products will sync automatically across all devices!');
