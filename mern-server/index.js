const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const stripe = require("stripe")('sk_test_51QBMSXBuaLd4buQ1B9RhgJ6xznN3qpwNLa8u6i45kOMpQF0xK33aNTsUv0SuHOQdegjh6hhwkjd27lPmivJVf4ON004HeEAvSm');

// middleware
app.use(cors());
app.use(express.json());

//ThgW0Ek4kJe1X5HS

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// mongodb configuration


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:ThgW0Ek4kJe1X5HS@cluster0.6jpld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a collection of documents
    const bookCollections = client.db("BookInventory").collection("books");
    const cartCollections = client.db("BookInventory").collection("cart");

    // Assuming you have a payments collection in the same database
const paymentCollections = client.db("BookInventory").collection("payments");

// Endpoint to save payment info
app.post("/save-payment-info", async (req, res) => {
    const paymentInfo = req.body;

    try {
        const result = await paymentCollections.insertOne(paymentInfo);
        res.status(200).send({ message: 'Payment info saved successfully', id: result.insertedId });
    } catch (error) {
        console.error("Error saving payment info:", error);
        res.status(500).send({ message: 'Failed to save payment info' });
    }
});


// Endpoint to get payment info by email
app.get("/payments", async (req, res) => {
  const email = req.query.email; // get user email from query
  try {
    const payments = await paymentCollections.find({ email: email }).toArray();
    res.status(200).send(payments);
  } catch (error) {
    console.error("Error fetching payment info:", error);
    res.status(500).send({ message: 'Failed to fetch payment info' });
  }
});



    // insert a book to the db: post method

    app.post("/upload-book",async(req, res) => {
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.send(result);

    })

     // all cart operations

    // Clear cart for a specific user
app.delete('/clear-cart', async (req, res) => {
  const email = req.body.email; // get user email from request body
  const filter = { email: email };

  try {
      const result = await cartCollections.deleteMany(filter);
      res.status(200).send({ message: 'Cart cleared successfully', deletedCount: result.deletedCount });
  } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).send({ message: 'Failed to clear cart' });
  }
}); 



    //posting cart to db
    app.post("/cart-option", async(req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
  })

    //get carts using email
    app.get("/cart-option", async(req, res) => {
      const email = req.query.email;
      const filter = {email: email};
      const result = await cartCollections.find(filter).toArray();
      res.send(result)
  })

   // get specific cart
   app.get('/cart-option/:id', async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await cartCollections.findOne(filter);
    res.send(result)
   })

   // delete items from cart
   app.delete('/cart-option/:id', async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await cartCollections.deleteOne(filter);
    res.send(result)
   })

   // update cart quantity
   app.put('/cart-option/:id', async(req, res) => {
    const id = req.params.id;
    const {quantity} = req.body;
    const filter = { _id: new ObjectId(id)};
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        quantity: parseInt(quantity, 10)
      },
    };

    const result = await cartCollections.updateOne(filter, updateDoc, options);
   });


   // stripe payment routes
   // Create a PaymentIntent with the order amount and currency
   app.post("/create-payment-intent", async (req, res) => {
    const { totalPrice } = req.body;
    const amount = totalPrice*100;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      
      payment_method_types: ["card"],
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });




    // get all books from database
    //app.get("/all-books", async(req, res) => {
        //const books = bookCollections.find();
        //const result = await books.toArray();
        //res.send(result);
    //})


    // update a book data : patch or update methods
    app.patch("/book/:id", async(req, res) => {
        const id = req.params.id;
        // console.log(id);
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = { upsert: true };

        const updateDoc = {
            $set: {
                ...updateBookData
            }
        }

        // update
        const result = await bookCollections.updateOne(filter, updateDoc, options );
        res.send(result);
    })

    // delete a book data
    app.delete("/book/:id", async(req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await bookCollections.deleteOne(filter);
        res.send(result);
    })


    // find by category
    app.get("/all-books", async (req, res) => {
      const { search } = req.query; // Get search query
      let query = {};
    
      if (search) {
        query.bookTitle = { $regex: search, $options: 'i' }; // Case-insensitive search
      }
    
      const result = await bookCollections.find(query).toArray(); // Query the database
      res.send(result); // Send the result
    });

    // to get single book data
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const result = await bookCollections.findOne(filter);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})