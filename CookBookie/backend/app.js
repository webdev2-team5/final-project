const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Recipe = require("./Models/recipe");
const logger = require("./logger");
require("dotenv").config();

// Connect to MongoDB Atlas
const uri = process.env.MONGO_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

logger("Log Level: " + process.env.DEBUG_LEVEL, 0);

mongoose
  .connect(uri, clientOptions)
  .then(() => {
    logger("Successfully connected to MongoDB.", 0);
  })
  .catch((err) => {
    logger("MongoDB connection error: " + err, 1);
    process.exit(1);
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  logger(err.stack, 1);
  res.status(500).send({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

// ROUTES WILL BE ADDED HERE
// Route to retrieve all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    Recipe.find().then(documents => {
      res.status(200).json({
        recipes: documents
      });
    });
  } catch (err) {
    logger("No recipes found", 1);
    res.status(500).json({ message: err.message });
  }
});

// Route to Post a new recipe
app.post("/api/recipes", async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name, 
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    favorited: false,
    createdAt: Date.now()
  })
  recipe.save()
  console.log(recipe)
  res.status(201).json({
    message: "Post added successfully"
});
});

// Route to Delete a recipe
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      logger("Deletion failed, no recipe found", 1);
      return res.status(404).json({ message: "Recipe not found" });
    }

    await recipe.remove();
    logger("Recipe deleted from database: " + recipe.name, 4);
    res.json({ message: "Deleted Recipe" });
  } catch (err) {
    console.error("Recipe not deleted from database.");
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single recipe by id
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    logger("Recipe found and returned: " + recipe.name, 4);
    res.json(recipe);
  } catch (err) {
    logger("Recipe not found.", 1);
    res.status(500).json({ message: err.message });
  }
});

// Route to update a recipe
app.patch("/api/recipes/:id", async (req, res) => {
  const { name, ingredients, instructions, favorited } = req.body;
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (name) recipe.name = name;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (favorited !== undefined) recipe.favorited = favorited;

    const updatedRecipe = await recipe.save();
    logger("Recipe updated: " + recipe.name, 4);
    res.json(updatedRecipe);
  } catch (err) {
    logger("Recipe not updated.", 1);
    res.status(400).json({ message: err.message });
  }
});

module.exports = app;
