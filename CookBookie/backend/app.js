const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Recipe = require('./Models/recipe')
require('dotenv').config()

// Connect to MongoDB Atlas
const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.debug("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
// Route to retrieve all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.debug("All recipes returned:");
    console.debug(recipes);
    res.json(recipes);
  } catch (err) {
    console.error("No recipes found");
    res.status(500).json({ message: err.message });
  }
});

// Route to Post a new recipe
app.post('/api/recipes', async (req, res) => {
  const { name, ingredients, instructions, favorited } = req.body;
  const recipe = new Recipe({ name, ingredients, instructions, favorited });

  try {
    const newRecipe = await recipe.save();
    console.debug("New Recipe created and added to the database: ", recipe.name);
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("New Recipe not created.");
    res.status(400).json({ message: err.message });
  }
});

// Route to Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    await recipe.remove();
    console.debug("Recipe deleted from database: ", recipe.name);
    res.json({ message: "Deleted Recipe" });
  } catch (err) {
    console.error("Recipe not deleted from database.");
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single recipe by id
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    console.debug("Recipe found and returned: ", recipe.name);
    res.json(recipe);
  } catch (err) {
    console.error("Recipe not found.");
    res.status(500).json({ message: err.message });
  }
});

// Route to update a recipe
app.patch('/api/recipes/:id', async (req, res) => {
  const { name, ingredients, instructions, favorited } = req.body;
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (name) recipe.name = name;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (favorited !== undefined) recipe.favorited = favorited;

    const updatedRecipe = await recipe.save();
    console.debug("Recipe updated: ", recipe.name);
    res.json(updatedRecipe);
  } catch (err) {
    console.error("Recipe not updated.");
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
