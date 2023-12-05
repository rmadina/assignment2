const apiUrl = 'https://dummyjson.com/products';
const tableBody = document.getElementById("products-table-body");
let products; 

const getData = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        products = data.products; 
        return products;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const createTableRow = (product, index) => {
    const tr = document.createElement("tr");
    tr.id = `product-row-${index}`; 
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
        await getData();

        tableBody.innerHTML = "";

        products.forEach((product) => {
            createTableRow(product);
        });
    } catch (error) {
        console.error('Error displaying data:', error);
    }
    const displayData = async () => {
        try {
            await getData(); 
    
            const categoryFilter = document.getElementById('categoryFilter');
            const categories = Array.from(new Set(products.map(product => product.category)));
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
    
            tableBody.innerHTML = "";
            products.forEach((product, index) => {
                createTableRow(product);
                const productRow = document.getElementById(`product-row-${index}`);
                productRow.addEventListener("click", () => {
                    const selectedProduct = products[index];
                    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
                    window.location.href = 'product-details.html';
                });
            });
        } catch (error) {
            console.error('Error displaying data:', error);
        }
    };
const productRows = document.querySelectorAll("#products-table-body tr");
productRows.forEach((row, index) => {
    row.addEventListener("click", () => {
        const selectedProduct = products[index];
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        window.location.href = 'product-details.html'; 
    });
});



const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    filterProducts(selectedCategory);
});

const filterProducts = (category) => {
    tableBody.innerHTML = "";
    if (category === "") {
        products.forEach((product) => {
            createTableRow(product);
        });
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        filteredProducts.forEach((product) => {
            createTableRow(product);
        });
    }
};

}
const productRows = document.querySelectorAll("#products-table-body tr");
productRows.forEach((row, index) => {
    row.addEventListener("click", () => {
        const selectedProduct = products[index];
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        window.location.href = 'product-details.html'; 
    });
});

window.onload = () => {
    displayData();

    const thumbnailImgs = document.querySelectorAll("#products-table tbody img");
    thumbnailImgs.forEach((img, index) => {
        img.addEventListener("click", () => {
            const selectedProduct = products[index]; 
            showModal(selectedProduct);
        });
    });
};
