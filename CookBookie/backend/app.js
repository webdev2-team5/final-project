const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Recipe = require('./Models/recipe')
require('dotenv').config()

// Connect to MongoDB Atlas
const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const port = 3001;

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req, res, next, err)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );

    next();
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


// ROUTES WILL BE ADDED HERE
// Route to retrieve a new recipe
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to Post a new recipe
app.post('/api/recipes', async (req, res) => {
  const { name, ingredients, instructions, favorited } = req.body;
  const recipe = new Recipe({ name, ingredients, instructions, favorited });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    await recipe.remove();
    res.json({ message: "Deleted Recipe" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  module.exports = app;
