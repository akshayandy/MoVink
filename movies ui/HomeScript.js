document.addEventListener('DOMContentLoaded', function () {
    fetchMoviesData(); // Fetch movie data when the DOM is loaded

    async function fetchMoviesData() {
        try {
            // Fetch movie data from the backend endpoint
            const response = await fetch('http://localhost:5432/');
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
        // Send a POST request to add movie to cart
        const response = await fetch('http://localhost:5432/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, price, rating, image}) // Include movie_id parameter
        });

        if (response.ok) {
            // Movie added successfully, update UI or show a message
            alert("Movie added to Cart..!");
            console.log('Movie added to cart successfully!');
        } else {
            // Movie addition failed, handle error or show a message
            console.error('Failed to add movie to cart');
        }
    } catch (error) {
        console.error('Error adding movie to cart:', error);
    }
}



    
