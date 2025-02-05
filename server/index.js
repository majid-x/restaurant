const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 7781;
require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { fileLoader } = require("ejs");
const uri = `mongodb+srv://abdulmajidasd4:${process.env.DB_PASS}@cluster0.3sh82.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const jwt = require("jsonwebtoken");
//middleware
app.use(cors());
app.use(express.json());

//

mongoose
  .connect(
    `mongodb+srv://abdulmajidasd4:${process.env.DB_PASS}@cluster0.3sh82.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(console.log("Mongodb connected"))
  .catch((error) => console.log(error));
//jwt
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1hr" });
  res.send({ token });
});
//verify jwt token

// import routes
const menuRoutes = require("./api/routes/menuRoutes");
app.use("/menu", menuRoutes);
const cartRoutes = require("./api/routes/cartRouter");
app.use("/carts", cartRoutes);

const userRoutes = require("./api/routes/userRoutes");
app.use("/users", userRoutes);
/* Create a MongoClient with a MongoClientOptions object to set the Stable API version
//const client = new MongoClient(uri, {
//  serverApi: {
//    version: ServerApiVersion.v1,
//    strict: true,
//    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("demo").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    //database and collections
    const menuCollections = client.db("demo").collection("menus");
    const cartCollections = client.db("demo").collection("cartItems");
    //all menu items operation
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });
    // cart operations
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    });

    app.get("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await cartCollections.findOne(filter);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    });

    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quatity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quatity: parseInt(quatity, 10),
        },
      };
      const result = await cartCollections.updateOne(
        filter,
        updateDoc,
        options
      );
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
*/
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`app lisening ${port}`);
});
