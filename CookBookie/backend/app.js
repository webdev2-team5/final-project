const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PostModel = require('./Models/recipe')

// Connect to MongoDB Atlas
const uri = "mongodb+srv://CookBookieUser:CookBookiePassword@cookbookie.fdz6yqv.mongodb.net/?retryWrites=true&w=majority&appName=CookBookie";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

// Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();
  });


  // ROUTES WILL BE ADDED HERE


  module.exports = app;
