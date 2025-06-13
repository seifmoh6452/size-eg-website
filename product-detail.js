document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainProductImage');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');

    const defaultProducts = [];

    let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        mainImage.src = product.image;
        productName.textContent = product.name;
        productPrice.textContent = `EGP ${product.price}`;
        productDescription.textContent = product.description || 'No description available.';
    } else {
        // Handle product not found
        productName.textContent = 'Product not found';
        productPrice.textContent = '';
        productDescription.textContent = '';
    }
});