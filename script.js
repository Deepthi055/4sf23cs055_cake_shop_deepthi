const sliderContainer = document.querySelector('.slider-container');
let isSliding = true;

function startSliding() {
    sliderContainer.style.animationPlayState = 'running';
}

function stopSliding() {
    sliderContainer.style.animationPlayState = 'paused';
}

document.querySelector('.slider').addEventListener('mouseenter', stopSliding);
document.querySelector('.slider').addEventListener('mouseleave', startSliding);
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartTableBody = document.querySelector('.cart-table tbody');
  cartTableBody.innerHTML = ''; // Clear the cart table

  let totalPrice = 0;

  cart.forEach((item, index) => {
      let itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      cartTableBody.innerHTML += `
          <tr>
              <td>
                  <div class="cart-product">
                      <img src="${item.image}" alt="${item.name}" width="80">
                      <div class="product-info">
                          <h3>${item.name}</h3>
                          <p>Delicious cake for all occasions</p>
                      </div>
                  </div>
              </td>
              <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input"></td>
              <td>&#8377;${item.price}</td>
              <td>&#8377;${itemTotal}</td>
              <td><button class="remove-btn" data-index="${index}">X</button></td>
          </tr>
      `;
  });

  // Update total price in the summary
  document.querySelector('.cart-summary p span').textContent = totalPrice;
}

// Remove item from the cart
function removeCartItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);  // Remove item at the given index
  localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
  displayCartItems();  // Refresh the cart display
}

function updateCartQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cart));  // Update cart in localStorage
  displayCartItems();  // Refresh the cart display
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  displayCartItems();

  // Listen for remove button clicks
  document.body.addEventListener('click', function(e) {
      if (e.target.classList.contains('remove-btn')) {
          const index = e.target.getAttribute('data-index');
          removeCartItem(index);
      }
  });

  // Listen for quantity input changes
  document.body.addEventListener('change', function(e) {
      if (e.target.classList.contains('quantity-input')) {
          const index = e.target.getAttribute('data-index');
          const newQuantity = parseInt(e.target.value);
          updateCartQuantity(index, newQuantity);
      }
  });
});
