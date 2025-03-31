const express = require('express');
const cors = require('cors');
const stripe = require("stripe")('sk_test_51QBMSXBuaLd4buQ1B9RhgJ6xznN3qpwNLa8u6i45kOMpQF0xK33aNTsUv0SuHOQdegjh6hhwkjd27lPmivJVf4ON004HeEAvSm');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const PORT = 5000; // API Port
const PUBLIC_IP = "52.200.115.42"; // Set your public IP

app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json()); // Enable JSON parsing

// MongoDB Connection
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
    console.log("✅ Connected to MongoDB");

    const bookCollections = client.db("BookInventory").collection("books");
    const cartCollections = client.db("BookInventory").collection("cart");
    const paymentCollections = client.db("BookInventory").collection("payments");

    // Upload Book
    app.post("/api/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // Get All Books
    app.get("/api/all-books", async (req, res) => {
      const { search } = req.query;
      let query = {};
      if (search) {
        query.bookTitle = { $regex: search, $options: 'i' };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    // Get Single Book
    app.get("/api/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollections.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Update Book
    app.patch("/api/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const result = await bookCollections.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateBookData } },
        { upsert: true }
      );
      res.send(result);
    });

    // Delete Book
    app.delete("/api/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollections.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    console.log("✅ All routes are set up!");
  } catch (error) {
    console.error("❌ Error starting the server:", error);
  }
}
run();

// Start the Server on Public IP
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ API Server running at http://${PUBLIC_IP}:${PORT}`);
});
