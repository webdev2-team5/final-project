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
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (err) {
    logger("Error retrieving recipes", 1);
    res.status(500).json({ message: err.message });
  }
});

// Add new recipe
app.post("/api/recipes", async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    favorited: false,
    createdAt: Date.now()
  });

  try {
    await recipe.save();
    logger("New Recipe created: " + recipe.name, 4);
    res.status(201).json({
      message: "Recipe added successfully",
      recipeId: recipe._id
    });
  } catch (err) {
    logger("Failed to create recipe.", 1);
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    const result = await Recipe.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    logger("Recipe deleted", 4);
    res.status(200).json({ message: "Recipe deleted" });
  } catch (err) {
    logger("Failed to delete recipe.", 1);
    res.status(500).json({ message: err.message });
  }
});

// Route to update a recipe
app.patch("/api/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.name = req.body.name || recipe.name;
    recipe.ingredients = req.body.ingredients || recipe.ingredients;
    recipe.instructions = req.body.instructions || recipe.instructions;

    const updatedRecipe = await recipe.save();
    logger("Recipe updated: " + recipe.name, 4);
    res.json({
      message: "Recipe updated",
      recipe: updatedRecipe
    });
  } catch (err) {
    logger("Recipe update failed.", 1);
    res.status(400).json({ message: err.message });
  }
});

// Error catching middleware
app.use((err, req, res, next) => {
  logger(err.stack, 1);
  res.status(500).send({
    error: "Internal Server Error",
    message: err.message,
  });
});

module.exports = app;
