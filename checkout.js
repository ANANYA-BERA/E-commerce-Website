const form = document.getElementById("checkout-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !email || !address) {
    alert("Please fill in all required fields!");
    return;
  }

  // Clear cart after checkout
  localStorage.removeItem("cart");

  // Simulate confirmation
  alert(`Thank you, ${name}! Your order has been placed successfully via ${payment.toUpperCase()}.`);

  // Redirect to home page
  window.location.href = "index.html";
});