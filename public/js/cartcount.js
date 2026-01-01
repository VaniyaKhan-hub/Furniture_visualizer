    document.addEventListener('DOMContentLoaded', function () {
  const cartCountSpan = document.querySelector('.addcount');

  function updateCartCount() {
   fetch('/cart/cartcount')
  .then(res => res.json())
  .then(data => {
    document.querySelector('.addcount').innerText = data.count || 0;
  })
      .catch(err => {
        console.error('Error fetching cart count:', err);
        cartCountSpan.innerText = 0;
      });
  }

  // Load on page ready
  updateCartCount();

  // Re-check after adding to cart
  const cartButtons = document.querySelectorAll('.add-to-cart-btn');
  cartButtons.forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(updateCartCount, 500);
    });
  });
});


