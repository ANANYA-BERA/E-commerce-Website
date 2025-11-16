// Sample product data
const products = [
  { id: 1, name: "Men's T-Shirt", category: "men", price: 649, image: "images/men's shirt01.jpg" },
  { id: 2, name: "Women's Dress", category: "women", price: 899, image: "images/women_black dress.jpg" },
  { id: 3, name: "Men's T-Shirt", category: "men", price: 799, image: "images/men's shirt02.jpg" },
  { id: 4, name: "Women's Dress", category: "women", price: 999, image: "images/white floral dress.jpg" },
  { id: 5, name: "Men's T-Shirt", category: "men", price: 499, image: "images/men's shirt03.jpg" },
  { id: 6, name: "Men's T-Shirt", category: "men", price: 499, image: "images/men's shirt04.jpg" },
  { id: 7, name: "Women's Dress", category: "women", price: 749, image: "images/green short dress.jpg" },
  { id: 8, name: "Women's Dress", category: "women", price: 1199, image: "images/blue two piece set.jpg" },
  { id: 9, name: "Women's Dress", category: "women", price: 599, image: "images/blue denim dress.jpg" },
  { id: 10, name: "women's Accessories ", category: "accessories", price: 549, image: "images/womenAccessories01.jpg" },
  { id: 11, name: "women's Accessories ", category: "accessories", price: 499, image: "images/womenAccessories02.jpg" },
  { id: 12, name: "women's Accessories ", category: "accessories", price: 349, image: "images/womenAccessories03.jpg" },
  { id: 13, name: "women's Accessories ", category: "accessories", price: 499, image: "images/womenAccessories04.jpg" },
  { id: 14, name: "men's Accessories ", category: "accessories", price: 9549, image: "images/men's watch.jpeg" },
  { id: 15, name: "men's Accessories ", category: "accessories", price: 449, image: "images/belt.jpeg" },
  { id: 16, name: "men's Accessories ", category: "accessories", price: 899, image: "images/belt02.jpeg" },
  
  
  
];

const productList = document.getElementById("product-list");
const featuredProducts = document.getElementById("trending");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products dynamically
function displayProducts(items, target) {
  if (!target) return;
  target.innerHTML = "";
  items.forEach(item => {
    target.innerHTML += `
      <div class="product">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

// Filtering & Sorting
if (productList) {
  const categorySelect = document.getElementById("category");
  const sortSelect = document.getElementById("sort");

  function updateDisplay() {
    let filtered = [...products];
    const category = categorySelect.value;
    const sort = sortSelect.value;

    if (category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

    displayProducts(filtered, productList);
  }

  categorySelect.addEventListener("change", updateDisplay);
  sortSelect.addEventListener("change", updateDisplay);

  updateDisplay();
}

// Featured Products on Home Page
if (featuredProducts) {
  displayProducts(products.slice(0, 3), featuredProducts);
  updateCartCount();
}

// === DARK/LIGHT MODE TOGGLE ===
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀" : "🌙";
  });
}