// Get the UI Elements 
// Product & Shopping Cart Related 
let products = document.querySelectorAll("#add-product");
let shoppingCart = document.getElementById("shopping-cart");
let shoppingCartItem = document.getElementById("shopping-cart-items");

// Calling all Function 
// Add to Cart will Add Item in Shopping Cart
products.forEach(function (addProduct) {
    addProduct.addEventListener("click", addToShoppingCart);
});

shoppingCartItem.addEventListener("click", removeShoppingItem);
document.addEventListener("DOMContentLoaded", getShoppingCart);


function addToShoppingCart(e) {
    // Creating LI Element 
    let li = document.createElement("li");

    // Extracting product details from the clicked button's parent element
    let productName = e.target.parentElement.querySelector('.card-title').textContent;
    let productDescription = e.target.parentElement.querySelector('.card-text').textContent;
    let productPrice = e.target.parentElement.querySelector('.card-price').textContent;

    // Setting the text of the LI element
    li.innerHTML = `Product detail: <i>${productName}, ${productDescription}, ${productPrice}</i> <button class="badge text-bg-danger remove-item">Remove</button>`;

    // Appending the LI element to the shopping cart
    shoppingCartItem.appendChild(li);

    // Adding the product to local storage
    addToLocalStorage(li);

    // Preventing the default behavior of the click event
    e.preventDefault();
}

// Remove Shopping Item
function removeShoppingItem(e) {
    if (e.target.classList.contains("badge")) {
        if (confirm("Are you sure you want to remove this item from your cart?")) {
            let ele = e.target.parentElement;

            // Get the List of All List Items
            let items = document.querySelectorAll("#shopping-cart-items li");

            let itemsArray = Array.from(items);
            // Get the Index of the Removed Element in the Array
            var order = itemsArray.indexOf(ele);
            ele.remove();
            removeFromLocalStorage(order);
        }
    }
    e.preventDefault();
}

// Add To Local Storage 
function addToLocalStorage(product) {
    let products;
    if (localStorage.getItem("products") === null) {
        products = [];
    }
    else {
        products = JSON.parse(localStorage.getItem("products"));
    }

    products.push(product.textContent);

    localStorage.setItem("products", JSON.stringify(products));
}

// Getproducts // When the Page Reload
function getShoppingCart() {
    let products;
    if (localStorage.getItem("products") === null) {
        products = [];
    }
    else {
        products = JSON.parse(localStorage.getItem("products"));
    }
    shoppingCartItem.innerHTML = "";
    products.forEach(product => {
        let text = product;
     
        let li = document.createElement("li");
        li.innerHTML = `<i>${text}</i> <button class= "badge text-bg-danger">Remove</button>`;

        shoppingCartItem.appendChild(li);

    });
}

// RemoveFromLocalStorage
function removeFromLocalStorage(lsCartList) {
    let products;
    if (localStorage.getItem("products") === null) {
        products = [];
    }
    else {
        // Get the Array of Products from the Local Storage
        products = JSON.parse(localStorage.getItem("products"));
    }
    // Check if the Array is not Empty
    if (products.length > 0) {
        // Remove the Element at the Given Index from the Array
        products.splice(lsCartList, 1);
        // Update the Local Storage with the Modified Array
        localStorage.setItem("products", JSON.stringify(products));
    }
}