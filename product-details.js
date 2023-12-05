document.addEventListener("DOMContentLoaded", function() {

    const getProductInfo = () => {
        // Retrieve the selected product information from localStorage
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

        // Display product details on the product details page
        document.getElementById('productTitle').textContent = selectedProduct.title;
        document.getElementById('productPrice').textContent = `Price: ${selectedProduct.price}`;
        document.getElementById('productDiscount').textContent = `Discount: ${selectedProduct.discount}%`;
        document.getElementById('productCategory').textContent = `Category: ${selectedProduct.category}`;
        document.getElementById('productStock').textContent = `Stock: ${selectedProduct.stock}`;

        // Display product gallery images
        const productGalleryContainer = document.getElementById('productGalleryContainer');
        selectedProduct.gallery.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = selectedProduct.title;
            productGalleryContainer.appendChild(img);
        });
    };

    const goBack = () => {
        window.history.back();
    };

    getProductInfo();

});
