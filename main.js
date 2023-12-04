const apiUrl = 'https://dummyjson.com/products';
const tableBody = document.getElementById("products-table-body");

const getData = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const result = data.products;
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const createTableRow = (product) => {
    const tr = document.createElement("tr");
    const { thumbnail, title, price, discount, category, stock } = product;

    const thumbnailCell = document.createElement("td");
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = thumbnail; 
    thumbnailImg.alt = title; 
    thumbnailImg.width = 1000;
    thumbnailImg.height = 1000;
    thumbnailCell.appendChild(thumbnailImg);
    tr.appendChild(thumbnailCell);

    const cells = [title, price, discount, category, stock];
    cells.forEach((cellData) => {
        const td = document.createElement("td");
        td.textContent = cellData;
        tr.appendChild(td);
    });

    tableBody.appendChild(tr);
};

const displayData = async () => {
    try {
        const products = await getData();

        tableBody.innerHTML = "";

        products.forEach((product) => {
            createTableRow(product);
        });
    } catch (error) {
        console.error('Error displaying data:', error);
    }
};


const showLargerImage = (imageUrl) => {
    const largerImageContainer = document.createElement("div");
    largerImageContainer.className = "larger-image-container";

    const largerImage = document.createElement("img");
    largerImage.src = imageUrl;
    largerImage.alt = "Larger Image";

    largerImage.addEventListener("click", () => {
        largerImageContainer.remove();
    });

    largerImageContainer.appendChild(largerImage);
    document.body.appendChild(largerImageContainer);
};


const showModal = (product) => {
    const modal = document.getElementById("productModal");
    const productInfoContainer = document.getElementById("productInfo");
    const productGalleryContainer = document.getElementById("productGallery");

    productInfoContainer.innerHTML = `
        <h2>${product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Discount: ${product.discount}</p>
        <p>Category: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
    `;

    productGalleryContainer.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" />
        <!-- Add additional images or information as needed -->
    `;

    modal.style.display = "block";
};

const closeModal = () => {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
};

const closeBtn = document.getElementById("closeModal");
closeBtn.addEventListener("click", closeModal);

const thumbnailImgs = document.querySelectorAll("#products-table tbody img");
thumbnailImgs.forEach((img, index) => {
    img.addEventListener("click", () => {
        const selectedProduct = products[index]; 
        showModal(selectedProduct);
    });
});


window.onload = displayData;


