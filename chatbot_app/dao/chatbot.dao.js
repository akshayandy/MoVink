const pool = require("../db-connect");

async function userVerify(email, password) {
  try {
    // Perform database query to add movie to cart
    const query = `
            SELECT * FROM users WHERE email = $1 AND password = $2`;

    const values = [email, password];
    const result = await pool.query(query, values);

    return result.rows[0]; // Return the added movie if needed
  } catch (error) {
    console.error("Error adding movie to cart:", error);
    throw error;
  }
}

// Function to Register User
async function registerUser(name, email, password) {
  try {
    // Perform database query to add movie to cart
    const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`;

    const values = [name, email, password];
    const result = await pool.query(query, values);

    console.log(result.rows);
  } catch (error) {
    console.error("Error Registering new User", error);
    throw error;
  }
}

// Function to check if an email is already registered
async function isEmailRegistered(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const result = await pool.query(query, values);
  return result.rowCount > 0;
}

async function getMovieByTitle(title) {
  const query = "SELECT * FROM movies_data WHERE title ILIKE $1"; // %lord of rings%
  const values = [`%${title}%`]; // Using ILIKE for case-insensitive search
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Function to add movie to cart
async function addToCart(movieTitle, moviePrice, movieRating, movieImage) {
  try {
    // Perform database query to add movie to cart
    const query = `
            INSERT INTO cart (movie_id, title, price, rating, image)
            VALUES ((SELECT id FROM movies_data WHERE title = $1), $1, $2, $3, $4)
            RETURNING *;`;

    const values = [movieTitle, moviePrice, movieRating, movieImage];
    await pool.query(query, values);
  } catch (error) {
    console.error("Error adding movie to cart:", error);
    throw error;
  }
}

async function getCartData() {
  try {
    const query = `
            SELECT * FROM cart;`;
    const result = await pool.query(query);

    return result.rows; // Return the cart data
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
}

async function emptyCartData() {
  try {
    const query = `
            DELETE FROM cart;`;
    const result = await pool.query(query);

    return result.rows; // Return the cart data
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
}

async function addOrder(movie) {
  try {
      // Perform database query to insert movie into orders table
      const query = `
          INSERT INTO orders (movie_id, title, price, rating, image)
          VALUES ($1, $2, $3, $4, $5);`;

      const values = [movie.movie_id, movie.title, movie.price, movie.rating, movie.image];
      await pool.query(query, values);
  } catch (error) {
      console.error('Error adding movie to orders:', error);
      throw error;
  }
}

async function getOrdersData() {
  try {
      const query = `
      SELECT * FROM orders
      ORDER BY id DESC
      LIMIT 5;`;
      const result = await pool.query(query);

      return result.rows; // Return the orders data
  } catch (error) {
      console.error('Error fetching orders data:', error);
      throw error;
  }
}

module.exports = {
  isEmailRegistered,
  registerUser,
  userVerify,
  getMovieByTitle,
  addToCart,
  getCartData,
  emptyCartData,
  getOrdersData,
  addOrder
};
