// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

// Load cart from session storage or initialize empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to buttons
  const addBtns = document.querySelectorAll(".add-to-cart-btn");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  if (product) {
    cart.push(product);
    updateCart();
  }
}

// Update cart UI and sessionStorage
function updateCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
clearBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Initial render
renderProducts();
renderCart();
