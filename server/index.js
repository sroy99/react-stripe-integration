const cors = require("cors");
const express = require("express");
require("dotenv").config();
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")("sk_test_51KWbYBSCxTDAyqXLFnkOMw6pbohSBHMGmEKd5gpz0qLRzRSwdWSQGI7UNKE6ip5hS7sQskVAVdy6gLjostWh8ZJi00jFg56bED");
const uuid = require("uuid");

//initialize express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("Product is", product);
  console.log("Price is ", product.price);
  const idempontencyKey = uuid.v4();

  return stripe.customers
    .creat({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Your purchase is ${product.name}`
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

//listen
app.listen(8000, () => console.log("Listening to port 8000"));
