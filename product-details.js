const goBack = () => {
    window.location.href = 'index.html';
};

document.addEventListener("DOMContentLoaded", function () {

    const getProductInfo = () => {
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

        document.getElementById('productTitle').textContent = selectedProduct.title;
        document.getElementById('productPrice').textContent = `Price: ${selectedProduct.price} $`;
        document.getElementById('productDiscount').textContent = `Discount: ${selectedProduct.discountPercentage}%`;
        document.getElementById('productCategory').textContent = `Category: ${selectedProduct.category}`;
        document.getElementById('productStock').textContent = `Stock: ${selectedProduct.stock}`;
        document.getElementById('')
        const productGalleryContainer = document.getElementById('productGalleryContainer');
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = selectedProduct.thumbnail;

        thumbnailImg.alt = selectedProduct.title;
       productGalleryContainer.appendChild(thumbnailImg);
    };

    getProductInfo();

});
