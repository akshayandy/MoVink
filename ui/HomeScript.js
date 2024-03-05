document.addEventListener("DOMContentLoaded", function () {
    // Fetch movie data and dynamically generate HTML elements
    fetchMoviesData();

    const signoutLink = document.getElementById("signout-link");
    const userEmail = localStorage.getItem("userEmail");
  
    if (signoutLink) {
      if (userEmail) {
        // User is logged in, change text to "Sign out"
        console.log(userEmail);
        signoutLink.innerHTML = '<a href="Signin.html">Sign out</a>';
      } else {
        // User is not logged in, change text to "Sign in"
        console.log(userEmail);
        signoutLink.innerHTML = '<a href="Signin.html">Sign in</a>';
      }
    } else {
      console.error("Sign-out link element not found.");
    }
    
    // Add event listener for sign-out link
    if (signoutLink) {
        signoutLink.addEventListener("click", function () {
            // Remove user email from local storage
            localStorage.removeItem("userEmail");
        });
    }
  });
  
  // Function to fetch movie data and generate HTML elements
  async function fetchMoviesData() {
    try {
      const response = await fetch('https://34.49.163.198.nip.io/movies');
      const moviesData = await response.json();
  
      const main = document.getElementById("main");
  
      moviesData.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
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
      console.error("Error fetching movie data:", error);
      // Handle error (e.g., display a message to the user)
    }
  }
  
  // Function to add movie to cart
  async function addToCart(title, price, rating, image) {
    try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            // User is not logged in, redirect to sign-in page
            alert('You need to sign in to add movies to the cart.');
            window.location.href = 'Signin.html';
            return;
        }

        // Check if the movie already exists in the cart
        const cartResponse = await fetch('https://34.49.163.198.nip.io/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-email': userEmail
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
                'Content-Type': 'application/json',
                'user-email': userEmail
            },
            body: JSON.stringify({ title, price, rating, image })
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
  