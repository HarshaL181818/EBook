require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require("stripe")('sk_test_51QBMSXBuaLd4buQ1B9RhgJ6xznN3qpwNLa8u6i45kOMpQF0xK33aNTsUv0SuHOQdegjh6hhwkjd27lPmivJVf4ON004HeEAvSm');


const app = express();
const port = process.env.PORT || 5000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB Configuration
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

// Database Initialization
async function initializeDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected!");

    const db = client.db("BookInventory");
    const bookCollections = db.collection("books");
    const cartCollections = db.collection("cart");
    const paymentCollections = db.collection("payments");

    // Home Route
    app.get('/', (req, res) => res.send('Book Store API is running 🚀'));

    // 📌 Payments Routes
    app.post("/save-payment-info", async (req, res) => {
      try {
        const result = await paymentCollections.insertOne(req.body);
        res.status(200).send({ message: 'Payment saved!', id: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: 'Error saving payment', error });
      }
    });

    app.get("/payments", async (req, res) => {
      try {
        const payments = await paymentCollections.find({ email: req.query.email }).toArray();
        res.status(200).send(payments);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching payments', error });
      }
    });

    // 📌 Cart Routes
    app.post("/cart-option", async (req, res) => {
      try {
        const result = await cartCollections.insertOne(req.body);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error adding to cart', error });
      }
    });

    app.get("/cart-option", async (req, res) => {
      try {
        const result = await cartCollections.find({ email: req.query.email }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching cart', error });
      }
    });

    app.delete('/cart-option/:id', async (req, res) => {
      try {
        const result = await cartCollections.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error deleting cart item', error });
      }
    });

    app.put('/cart-option/:id', async (req, res) => {
      try {
        const result = await cartCollections.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { quantity: parseInt(req.body.quantity, 10) } }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error updating cart quantity', error });
      }
    });

    // 📌 Books Routes
    app.post("/upload-book", async (req, res) => {
      try {
        const result = await bookCollections.insertOne(req.body);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error uploading book', error });
      }
    });

    app.get("/all-books", async (req, res) => {
      try {
        const query = req.query.search
          ? { bookTitle: { $regex: req.query.search, $options: 'i' } }
          : {};
        const result = await bookCollections.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching books', error });
      }
    });

    app.get("/book/:id", async (req, res) => {
      try {
        const result = await bookCollections.findOne({ _id: new ObjectId(req.params.id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching book', error });
      }
    });

    app.patch("/book/:id", async (req, res) => {
      try {
        const result = await bookCollections.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error updating book', error });
      }
    });

    app.delete("/book/:id", async (req, res) => {
      try {
        const result = await bookCollections.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error deleting book', error });
      }
    });

    // 📌 Stripe Payment Route
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: req.body.totalPrice * 100,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).send({ message: 'Error creating payment intent', error });
      }
    });

    // 📌 Clear Cart Route
    app.delete('/clear-cart', async (req, res) => {
      try {
        const result = await cartCollections.deleteMany({ email: req.body.email });
        res.status(200).send({ message: 'Cart cleared', deletedCount: result.deletedCount });
      } catch (error) {
        res.status(500).send({ message: 'Error clearing cart', error });
      }
    });

    // 📌 Serve Frontend (Vite React)
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    // Start Server
    app.listen(port, '0.0.0.0', () => console.log(`✅ Server running at ${SERVER_URL}:${port}`));
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

// Run the database initialization
initializeDB();
