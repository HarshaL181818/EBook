const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const SERVER_URL = "http://52.200.115.42:5000";

const cors = require('cors');
const stripe = require("stripe")('sk_test_51QBMSXBuaLd4buQ1B9RhgJ6xznN3qpwNLa8u6i45kOMpQF0xK33aNTsUv0SuHOQdegjh6hhwkjd27lPmivJVf4ON004HeEAvSm');

// Middleware
app.use(cors());
app.use(express.json());

// Serve the frontend from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// MongoDB configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const bookCollections = client.db("BookInventory").collection("books");
    const cartCollections = client.db("BookInventory").collection("cart");
    const paymentCollections = client.db("BookInventory").collection("payments");

    app.post("/save-payment-info", async (req, res) => {
      const paymentInfo = req.body;
      try {
        const result = await paymentCollections.insertOne(paymentInfo);
        res.status(200).send({ message: 'Payment info saved successfully', id: result.insertedId });
      } catch (error) {
        res.status(500).send({ message: 'Failed to save payment info' });
      }
    });

    app.get("/payments", async (req, res) => {
      const email = req.query.email;
      try {
        const payments = await paymentCollections.find({ email }).toArray();
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

    app.delete('/clear-cart', async (req, res) => {
      const email = req.body.email;
      try {
        const result = await cartCollections.deleteMany({ email });
        res.status(200).send({ message: 'Cart cleared successfully', deletedCount: result.deletedCount });
      } catch (error) {
        res.status(500).send({ message: 'Failed to clear cart' });
      }
    });

    app.post("/cart-option", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });

    app.get("/cart-option", async (req, res) => {
      const email = req.query.email;
      const result = await cartCollections.find({ email }).toArray();
      res.send(result);
    });

    app.get('/cart-option/:id', async (req, res) => {
      const id = req.params.id;
      const result = await cartCollections.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.delete('/cart-option/:id', async (req, res) => {
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
        amount,
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
        { $set: { ...updateBookData } },
        { upsert: true }
      );
      res.send(result);
    });

    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollections.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    console.log("Connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at ${SERVER_URL}`);
});
