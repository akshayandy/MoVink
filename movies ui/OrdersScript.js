document.addEventListener('DOMContentLoaded', function () {
    fetchOrdersData(); // Fetch cart data when the DOM is loaded
});

async function fetchOrdersData() {
    try {
        // Fetch cart data from the backend endpoint
        const response = await fetch('http://localhost:5432/orders');
        const ordersData = await response.json();

        // Get the cart items container
        const ordersItemsContainer = document.getElementById('main');
        
        if (!ordersItemsContainer) {
            console.error('Error: orders-items container not found');
            return;
        }

        // Clear any existing content
        ordersItemsContainer.innerHTML = '';

        // Check if cart is empty
        if (ordersData.length === 0) {
            ordersItemsContainer.innerHTML = '<p>There are no orders..!</p>';
            return;
        }

        // Dynamically generate HTML elements for each cart item
        ordersData.forEach(item => {
            const ordersItemElement = document.createElement('div');
            ordersItemElement.classList.add('orders-item');
            ordersItemElement.innerHTML = `
                <img src="${item.image}" alt="Movie Image">
                <div class="orders-item-info">
                    <h3>${item.title}</h3>
                    <span class="green"><i class="fa-solid fa-star"></i>${item.rating}</span>
                </div>
                <div class="price">
                    <p>$ ${item.price}</p>
                </div>
            `;
            ordersItemsContainer.appendChild(ordersItemElement);
        });
    } catch (error) {
        console.error('Error fetching orders data:', error);
    }   
}