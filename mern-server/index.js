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

    // Database collections
    const bookCollections = client.db("BookInventory").collection("books");
    const cartCollections = client.db("BookInventory").collection("cart");
    const paymentCollections = client.db("BookInventory").collection("payments");

    // --- API Routes ---
    
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.post("/save-payment-info", async (req, res) => {
      const paymentInfo = req.body;
      try {
        const result = await paymentCollections.insertOne(paymentInfo);
        res.status(200).send({ message: 'Payment info saved', id: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: 'Failed to save payment info' });
      }
    });

    app.get("/payments", async (req, res) => {
      const email = req.query.email;
      try {
        const payments = await paymentCollections.find({ email: email }).toArray();
        res.status(200).send(payments);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch payment info' });
      }
    });

    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    app.post("/cart-option", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });

    app.get("/cart-option", async (req, res) => {
      const email = req.query.email;
      const result = await cartCollections.find({ email: email }).toArray();
      res.send(result);
    });

    app.delete("/cart-option/:id", async (req, res) => {
      const id = req.params.id;
      const result = await cartCollections.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.put('/cart-option/:id', async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const result = await cartCollections.updateOne(
        { _id: new ObjectId(id) },
        { $set: { quantity: parseInt(quantity, 10) } },
        { upsert: true }
      );
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const { totalPrice } = req.body;
      const amount = totalPrice * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    app.get("/all-books", async (req, res) => {
      const { search } = req.query;
      let query = {};
      if (search) {
        query.bookTitle = { $regex: search, $options: 'i' };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollections.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const result = await bookCollections.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateBookData },
        { upsert: true }
      );
      res.send(result);
    });

    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollections.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Catch-all route to serve frontend `index.html`
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../mern-client/dist', 'index.html'));
    });

    console.log("Connected to MongoDB!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

// Start the server on PUBLIC IP
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
