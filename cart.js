const cartContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

function displayCart() {
  updateCartCount();

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartSummary.innerHTML = "";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartContainer.innerHTML += `
      <div class="product cart-item">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  cartSummary.innerHTML = `
    <div class="cart-summary-box">
      <h3>Total: ₹${total}</h3>
      <a href="checkout.html" class="btn">Proceed to Checkout</a>
      <button class="btn" onclick="clearCart()">Clear Cart</button>
    </div>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
}

displayCart();