// CartScript.js

document.addEventListener('DOMContentLoaded', function () {
    fetchCartData(); // Fetch cart data when the DOM is loaded
});

async function fetchCartData() {
    try {
        // Fetch cart data from the backend endpoint
        const response = await fetch('https://34.49.163.198.nip.io/cart');
        const cartData = await response.json();

        // Get the cart items container
        const cartItemsContainer = document.getElementById('main');
        
        if (!cartItemsContainer) {
            console.error('Error: cart-items container not found');
            return;
        }

        // Clear any existing content
        cartItemsContainer.innerHTML = '';

        // Check if cart is empty
        if (cartData.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        // Dynamically generate HTML elements for each cart item
        cartData.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="Movie Image">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <span class="green"><i class="fa-solid fa-star"></i>${item.rating}</span>
                    <button onclick="removeFromCart(${item.movie_id})">Remove</button>
                </div>
                <div class="price">
                    <p>$ ${item.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }   
}

 // Function to remove movie from cart
 async function removeFromCart(movieId) {
    try {
        // Send request to remove movie from cart
        const response = await fetch(`https://34.49.163.198.nip.io/cart/${movieId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // If successful, fetch updated cart data and re-render the cart
            fetchCartData();
        } else {
            console.error('Error removing movie from cart:', response.statusText);
        }
    } catch (error) {
        console.error('Error removing movie from cart:', error);
    }
}

async function checkoutCart() {
    try {
        // Fetch cart data from the backend
        const response = await fetch('https://34.49.163.198.nip.io/cart');
        const cartData = await response.json();

        // Send POST request to checkout endpoint
        const checkoutResponse = await fetch('https://34.49.163.198.nip.io/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        });

        if (checkoutResponse.ok) {
            // Checkout successful, navigate to orders page
            alert("Order placed successfully..!");
            window.location.href = 'Orders.html';
        } else {
            console.error('Failed to checkout');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
}




