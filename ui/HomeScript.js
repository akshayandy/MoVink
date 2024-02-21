document.addEventListener('DOMContentLoaded', function () {
    fetchMoviesData(); // Fetch movie data when the DOM is loaded

    async function fetchMoviesData() {
        try {
            // Fetch movie data from the backend endpoint
            const response = await fetch('https://34.49.163.198.nip.io/movies');
            const moviesData = await response.json();
            
            const main = document.getElementById('main');

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


// Function to add movie to cart
async function addToCart(title, price, rating, image) {

    try {
        // Check if the movie already exists in the cart
        const cartResponse = await fetch('https://34.49.163.198.nip.io/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!cartResponse.ok) {
            console.error('Failed to fetch cart data');
            return;
        }

        const cartData = await cartResponse.json();
        const existingMovie = cartData.find(movie => movie.title === title);

        if (existingMovie) {
            // Movie already exists in cart, show alert
            alert('Movie already exists in cart');
            return;
        }

        // If movie does not exist in cart, add it
        // Send a POST request to add movie to cart
        const response = await fetch('https://34.49.163.198.nip.io/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, price, rating, image}) // Include movie_id parameter
        });

        if (response.ok) {
            // Movie added successfully, update UI or show a message
            alert("Movie added to Cart..!");
        } else {
            // Movie addition failed, handle error or show a message
            console.error('Failed to add movie to cart');
        }
    } catch (error) {
        console.error('Error adding movie to cart:', error);
    }
}



    
