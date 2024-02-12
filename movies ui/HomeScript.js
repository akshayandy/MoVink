document.addEventListener('DOMContentLoaded', function () {
    const main = document.getElementById('main');
    fetchMoviesData(); // Fetch movie data when the DOM is loaded

    async function fetchMoviesData() {
        try {
            // Fetch movie data from the backend endpoint
            const response = await fetch('http://localhost:5432/');
            const moviesData = await response.json();

            // Dynamically generate HTML elements for each movie
            moviesData.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${movie.image}" alt="Movie Image">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <span class="green"><i class="fa-solid fa-star"></i>${movie.rating}</span>
                        <button onclick="addToCart('${movie.title}', ${movie.price}, ${movie.rating}, '${movie.image}')">Add to Cart</button>
                    </div>
                    <div class="price">
                        <p>$ ${movie.price}</p>
                    </div>
                `;
                main.appendChild(movieElement);
            });
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }
});

// Other functions related to adding to cart, checkout, etc.




// let orders = JSON.parse(localStorage.getItem('orders')) || [];

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// function addToCart(title, price, rating, image) {
//     const existingItem = cart.find(cartItem => cartItem.title === title);
//     if (existingItem) {
//         existingItem.quantity = (existingItem.quantity || 1) + 1;
//     } else {
//         const item = { title, price, rating, image, quantity: 1 };
//         cart.push(item);
//     }
//     updateCartDisplay();
// }

// function updateCartDisplay() {
//     const cartItemsContainer = document.getElementById('cart-items');

//     if (cartItemsContainer) {
//         cartItemsContainer.innerHTML = '';

//         cart.forEach((item, index) => {
//             const cartItem = document.createElement('div');
//             cartItem.classList.add('cart-item');
//             cartItem.innerHTML = `
//                 <div class="movie">
//                     <img src="${item.image}" alt="Movie Image"> <!-- Update the image source here -->
//                     <div class="movie-info">
//                         <h3>${item.title}</h3>
//                         <span class="green"><i class="fa-solid fa-star"></i>${item.rating}</span>
//                         <button onclick="removeFromCart(${index})">Remove</button>
//                     </div>
//                     <div class="price">
//                         <p>$ ${item.price}</p>
//                     </div>
//                 </div>
//             `;
//             cartItemsContainer.appendChild(cartItem);
//         });
//     }
//     saveCartToLocalStorage();
// }


// function removeFromCart(indexToRemove) {


//     // Check if the index is valid
//     if (indexToRemove >= 0 && indexToRemove < cart.length) {
//         // Remove the item at the specified index
//         cart.splice(indexToRemove, 1);
//     }

//     // cart.pop();
//     updateCartDisplay();
//     saveCartToLocalStorage();
// }

// function saveCartToLocalStorage() {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }
// updateCartDisplay();




// function checkout() {
    
//     // Assuming you want to move checked out items from cart to orders
//     const checkedOutItems = cart.slice(); // Copy the cart items

//     // Add checked out items to orders
//     checkedOutItems.forEach(item => {
//         const existingOrder = orders.find(orderItem => orderItem.title === item.title);
//         if (!existingOrder) {
//             orders.push(item);
//         }
//     });

//     cart = []; // Empty the cart
//     // Update display for both cart and orders
//     updateCartDisplay();
//     updateOrdersDisplay();

//     // Save the updated cart and orders to local storage
    
//     saveOrdersToLocalStorage();

//     // Perform any additional actions related to checkout
//     alert('Checkout successful!');
// }

// function updateOrdersDisplay() {
//     const orderItemsContainer = document.getElementById('order-items');

//     if (orderItemsContainer) {
//         orderItemsContainer.innerHTML = '';

//         orders.forEach(item => {
//             const orderItem = document.createElement('div');
//             orderItem.classList.add('order-item');
//             orderItem.innerHTML = `
//                 <div class="movie">
//                     <img src="${item.image}" alt="Movie Image">
//                     <div class="movie-info">
//                         <h3>${item.title}</h3>
//                         <span class="green"><i class="fa-solid fa-star"></i>${item.rating}</span>
//                     </div>
//                     <div class="price">
//                         <p>$ ${item.price}</p>
//                     </div>
//                 </div>
//             `;
//             orderItemsContainer.appendChild(orderItem);
//         });
//     }
// }

// // Function to save orders to local storage
// function saveOrdersToLocalStorage() {
//     localStorage.setItem('orders', JSON.stringify(orders));
// }


    
