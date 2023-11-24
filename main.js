// main.js

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

    // Extract product data
    const { thumbnail, title, price, discount, category, stock } = product;

    // Create thumbnail cell
    const thumbnailCell = document.createElement("td");
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = thumbnail; // Assuming the 'thumbnail' property is the URL of the image
    thumbnailImg.alt = title; // Set alt text for accessibility
    thumbnailImg.width = 1000;
    thumbnailImg.height = 1000;
    thumbnailCell.appendChild(thumbnailImg);
    tr.appendChild(thumbnailCell);

    // Create other table cells
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

        // Clear existing table rows
        tableBody.innerHTML = "";

        // Create table rows for each product
        products.forEach((product) => {
            createTableRow(product);
        });
    } catch (error) {
        console.error('Error displaying data:', error);
    }
};

// ... (existing code) ...

const showLargerImage = (imageUrl) => {
    const largerImageContainer = document.createElement("div");
    largerImageContainer.className = "larger-image-container";

    const largerImage = document.createElement("img");
    largerImage.src = imageUrl;
    largerImage.alt = "Larger Image";

    // Add a click event listener to close the larger image when clicked
    largerImage.addEventListener("click", () => {
        largerImageContainer.remove();
    });

    largerImageContainer.appendChild(largerImage);
    document.body.appendChild(largerImageContainer);
};

// ... (existing code) ...


window.onload = displayData;
