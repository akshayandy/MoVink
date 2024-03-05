const express = require("express");
const chatbotRoutes = express.Router();
const chatbotDAO = require("../dao/chatbot.dao");

// Handle sign-up POST requests
chatbotRoutes.post("/", async (req, res) => {
  try {
    let tag = req.body.fulfillmentInfo.tag;

    switch (tag) {
      case "register":
        await SignUp(req, res);
        break;
      case "signin":
        await SignIn(req, res);
        break;
      case "fetchMovie":
        await findMovie(req, res);
        break;
      case "addToCart":
        await addToCart(req, res);
        break;
      case "viewCart":
        await viewCart(req, res);
        break;
      case "checkout":
        await checkoutCart(req, res);
        break;
      case "viewOrders":
        await viewOrders(req, res);
        break;
      default:
        res.status(400).json({ error: "Invalid tag" });
        break;
    }
  } catch (error) {
    console.error("Error during sign up/sign in:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

//sign-up handle
async function SignUp(req, res) {
  const name = req.body.sessionInfo.parameters["signup_name"];
  const email = req.body.sessionInfo.parameters["signup_email"];
  const password = req.body.sessionInfo.parameters["signup_password"];

  try {
    // const emailRegistered = await chatbotDAO.isEmailRegistered(email);
    // if (emailRegistered) {
    //   return res.status(400).json({ error: "Email already registered" });
    // }

    await chatbotDAO.registerUser(name, email, password);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Registration Successful!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  } catch (error) {
    console.error("Error during sign-up:", error);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Registration Unsuccessful..!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  }
}

//sign-in handle
async function SignIn(req, res) {
  const signinEmail = req.body.sessionInfo.parameters["email"];
  const signinPassword = req.body.sessionInfo.parameters["password"];

  try {
    // Your database query to verify credentials and sign in the user
    const user = await chatbotDAO.userVerify(signinEmail, signinPassword);
    if (user) {
      const username = user.name;
      const jsonResponse = {
        fulfillment_response: {
          messages: [
            {
              text: {
                //fulfillment text response to be sent to the agent
                text: [`Hi, ${username}. Welcome to MoVink..!`],
              },
            },
          ],
        },
      };
      res.send(jsonResponse);
    } else {
      const jsonResponse = {
        fulfillment_response: {
          messages: [
            {
              text: {
                //fulfillment text response to be sent to the agent
                text: ["Not Registered..!"],
              },
            },
          ],
          end_interaction: true
        },
      };
      res.send(jsonResponse);
    }
  } catch (error) {
    console.error("Sign in failed:", error);
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
}

//movie POST request
async function findMovie(req, res) {
  const title = req.body.sessionInfo.parameters["movie_name"];

  try {
    const movie = await chatbotDAO.getMovieByTitle(title);
    const movieTitle = movie.title;
    const movieRating = movie.rating;
    const moviePrice = movie.price;
    const movieImage = movie.image;

    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: [
                `Movie Title: ${movieTitle}
                 Rating     : ${movieRating}
                 Price      : ${moviePrice}`,
              ],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  } catch (error) {
    console.error("Error during Fetching Movie:", error);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Movie not found..!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  }
}

//movie POST request
async function addToCart(req, res) {
  const title = req.body.sessionInfo.parameters["movie_name"];

  try {
    const movie = await chatbotDAO.getMovieByTitle(title);

    const movieTitle = movie.title;
    const movieRating = movie.rating;
    const moviePrice = movie.price;
    const movieImage = movie.image;

    await chatbotDAO.addToCart(movieTitle, moviePrice, movieRating, movieImage);

    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: [`${movieTitle} added to cart..!`],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  } catch (error) {
    console.error("Error during adding Movie to cart:", error);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Movie not added to cart..!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  }
}

async function viewCart(req, res) {
  try {
    const cartData = await chatbotDAO.getCartData();
    const jsonResponse = {
      fulfillment_response: {
        messages: [],
      },
    };

    if (cartData.length === 0) {
      // If cart is empty, send a response indicating that
      const emptyCartResponse = {
        fulfillment_response: {
          messages: [
            {
              text: {
                text: ["Your cart is empty."],
              },
            },
          ],
        },
      };
      res.send(emptyCartResponse);
      return;
    }

    for (let i = 0; i < cartData.length; i++) {
      const cartItem = cartData[i];
      const cartTitle = cartItem.title;

      // Construct the message for each item with sequence number
      const message = {
        text: {
          text: [`${i + 1}. ${cartTitle}`],
        },
      };

      // Add the message to the messages array in jsonResponse
      jsonResponse.fulfillment_response.messages.push(message);
    }

    // Send jsonResponse after the loop completes
    res.send(jsonResponse);
  } catch (error) {
    console.error("Error during viewing cart:", error);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: ["cart failed..!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  }
}

async function checkoutCart(req, res) {

  try {
    const cartData = await chatbotDAO.getCartData();

    if (cartData.length === 0) {
      // If cart is empty, send a response indicating that
      const emptyCartResponse = {
        fulfillment_response: {
          messages: [
            {
              text: {
                text: ["Your cart is empty, cannot checkout..!"],
              },
            },
          ],
        },
      };
      res.send(emptyCartResponse);
      return;
    }
    
    // Insert each movie in the cart into the orders table
    for (const movie of cartData) {
      await chatbotDAO.addOrder(movie);
    }

    await chatbotDAO.emptyCartData();

    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: [`Checkout Successful..!`],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  } catch (error) {
    console.error("Error during Checkout:", error);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Checkout failed..!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  }
}

async function viewOrders(req, res) {
  try {
    const ordersData = await chatbotDAO.getOrdersData();
    const jsonResponse = {
      fulfillment_response: {
        messages: [],
      },
    };

    if (ordersData.length === 0) {
      // If cart is empty, send a response indicating that
      const jsonResponse = {
        fulfillment_response: {
          messages: [
            {
              text: {
                text: ["You haven't ordered anything..!"],
              },
            },
          ],
        },
      };
      res.send(jsonResponse);
      return;
    }

    for (let i = 0; i < ordersData.length; i++) {
      const orderItem = ordersData[i];
      const orderTitle = orderItem.title;

      // Construct the message for each item with sequence number
      const message = {
        text: {
          text: [`\n${i + 1}. ${orderTitle}`],
        },
      };

      // Add the message to the messages array in jsonResponse
      jsonResponse.fulfillment_response.messages.push(message);
    }

    // Send jsonResponse after the loop completes
    res.send(jsonResponse);
  } catch (error) {
    console.error("Error during viewing Orders:", error);
    const jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: ["Orders failed..!"],
            },
          },
        ],
      },
    };
    res.send(jsonResponse);
  }
}

module.exports = chatbotRoutes;
