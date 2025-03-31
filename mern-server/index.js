const express = require('express');
const cors = require('cors');
const stripe = require("stripe")('sk_test_51QBMSXBuaLd4buQ1B9RhgJ6xznN3qpwNLa8u6i45kOMpQF0xK33aNTsUv0SuHOQdegjh6hhwkjd27lPmivJVf4ON004HeEAvSm');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from `mern-client/dist`
app.use(express.static(path.join(__dirname, '../mern-client/dist')));

// MongoDB configuration
const uri = "mongodb+srv://mern-book-store:ThgW0Ek4kJe1X5HS@cluster0.6jpld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    // Database collections
    const db = client.db("BookInventory");
    const bookCollections = db.collection("books");
    const cartCollections = db.collection("cart");
    const paymentCollections = db.collection("payments");

    // --- API Routes ---

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.post("/save-payment-info", async (req, res) => {
      try {
        const result = await paymentCollections.insertOne(req.body);
        res.status(200).send({ message: 'Payment info saved', id: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: 'Failed to save payment info' });
      }
    });

    app.get("/payments", async (req, res) => {
      try {
        const payments = await paymentCollections.find({ email: req.query.email }).toArray();
        res.status(200).send(payments);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch payment info' });
      }
    });

    app.post("/upload-book", async (req, res) => {
      const result = await bookCollections.insertOne(req.body);
      res.send(result);
    });

    app.post("/cart-option", async (req, res) => {
      const result = await cartCollections.insertOne(req.body);
      res.send(result);
    });

    app.get("/cart-option", async (req, res) => {
      const result = await cartCollections.find({ email: req.query.email }).toArray();
      res.send(result);
    });

    app.delete("/cart-option/:id", async (req, res) => {
      const result = await cartCollections.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    app.put('/cart-option/:id', async (req, res) => {
      const result = await cartCollections.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { quantity: parseInt(req.body.quantity, 10) } },
        { upsert: true }
      );
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const { totalPrice } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.get("/all-books", async (req, res) => {
      const query = req.query.search ? { bookTitle: { $regex: req.query.search, $options: 'i' } } : {};
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    app.get("/book/:id", async (req, res) => {
      const result = await bookCollections.findOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    app.patch("/book/:id", async (req, res) => {
      const result = await bookCollections.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { upsert: true }
      );
      res.send(result);
    });

    app.delete("/book/:id", async (req, res) => {
      const result = await bookCollections.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // Catch-all route to serve frontend `index.html`
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../mern-client/dist', 'index.html'));
    });

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}
run();

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running at http://52.200.115.42:${port}`);
});
