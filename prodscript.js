 const cartIcon = document.getElementById('cart-icon');
 const cartOverlay = document.getElementById('cart-overlay');
 const cartBackdrop = document.getElementById('cart-backdrop');
 const closeCart = document.getElementById('close-cart');
 const cartItemsContainer = document.getElementById('cart-items');
 const cartTotalElement = document.getElementById('cart-total');
 const addToCartButtons = document.querySelectorAll('.add-to-cart');
 const hamburger = document.getElementById('hamburger');
 const mobileMenu = document.getElementById('mobile-menu');

 let cart = [];
 let total = 0;

 // Function to update cart count
 function updateCartCount() {
     const cartCountElement = document.getElementById('cart-count');
     cartCountElement.textContent = cart.length; // Update the count based on the cart length
 }

 // Toggle cart visibility
 function toggleCart() {
     cartOverlay.classList.toggle('hidden');
     cartBackdrop.classList.toggle('hidden');
 }

 // Close cart
 function closeCartHandler() {
     cartOverlay.classList.add('hidden');
     cartBackdrop.classList.add('hidden');
 }

 // Update cart display
 function updateCartDisplay() {
     cartItemsContainer.innerHTML = '';

     if (cart.length === 0) {
         cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-10">Your cart is empty</p>';
         cartTotalElement.textContent = 'P0';
     } else {
         cart.forEach(item => {
             const cartItemElement = document.createElement('div');
             cartItemElement.className = 'flex justify-between items-center mb-4';
             cartItemElement.innerHTML = `
                 <div>
                     <h4 class="font-medium">${item.name}</h4>
                     <p class="text-gray-600">P${item.price.toLocaleString()}</p>
                 </div>
                 <button class="text-red-500 remove-item" data-id="${item.id}">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                 </button>
             `;
             cartItemsContainer.appendChild(cartItemElement);
         });

         // Update total
         total = cart.reduce((sum, item) => sum + item.price, 0);
         cartTotalElement.textContent = `P${total.toLocaleString()}`;
     }

     // Update cart count
     updateCartCount();

     // Add event listeners to remove buttons
     document.querySelectorAll('.remove-item').forEach(button => {
         button.addEventListener('click', (e) => {
             const itemId = parseInt(e.target.closest('button').getAttribute('data-id'));
             removeFromCart(itemId);
         });
     });
 }

 // Add to cart
 function addToCart(name, price) {
     const newItem = {
         id: Date.now(), // Unique ID
         name,
         price: parseInt(price)
     };

     cart.push(newItem);
     updateCartDisplay();
 }

 // Remove from cart
 function removeFromCart(id) {
     cart = cart.filter(item => item.id !== id);
     updateCartDisplay();
 }


 cartIcon.addEventListener('click', toggleCart);
 closeCart.addEventListener('click', closeCartHandler);
 cartBackdrop.addEventListener('click', closeCartHandler);

 addToCartButtons.forEach(button => {
     button.addEventListener('click', (e) => {
         const name = e.target.getAttribute('data-name');
         const price = e.target.getAttribute('data-price');
         addToCart(name, price);

         // Open cart when adding an item
         if (cartOverlay.classList.contains('hidden')) {
             toggleCart();
         }
     });
 });

 // Hamburger menu toggle
 hamburger.addEventListener('click', () => {
     mobileMenu.classList.toggle('hidden');
 });

 // Drag and Drop functionality
 const products = document.querySelectorAll('.grid div[draggable="true"]');

 products.forEach(product => {
     product.addEventListener('dragstart', (e) => {
         e.dataTransfer.setData('text/plain', JSON.stringify({
             name: product.getAttribute('data-name'),
             price: product.getAttribute('data-price')
         }));
     });
 });

 cartIcon.addEventListener('dragover', (e) => {
     e.preventDefault(); // Prevent default to allow drop
 });

 cartIcon.addEventListener('drop', (e) => {
     e.preventDefault();
     const data = e.dataTransfer.getData('text/plain');
     const item = JSON.parse(data);
     addToCart(item.name, item.price);
 });