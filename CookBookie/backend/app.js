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
    logger("MongoDB Connection successful");
  })
  .catch((err) => {
    logger("MongoDB connection error: " + err, 1);
    process.exit(1);
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next, err) => {
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
  logger(err.stack, 1);
  res.status(500).send("Something broke!");
});

app.use((req, res, next) => {
  logger(req.method + "- " + req.originalUrl, 4);
  next();
});

// ROUTES WILL BE ADDED HERE
// Route to retrieve a new recipe
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    logger(recipes, 5);
    res.json(recipes);
  } catch (err) {
    logger(err, 1);
    res.status(500).json({ message: err.message });
  }
});

// Route to Post a new recipe
app.post("/api/recipes", async (req, res) => {
  const { name, ingredients, instructions, favorited } = req.body;
  const recipe = new Recipe({ name, ingredients, instructions, favorited });
  logger(recipe, 5);

  try {
    const newRecipe = await recipe.save();
    logger("Recipe saved", 5);
    res.status(201).json(newRecipe);
  } catch (err) {
    logger(err, 1);
    res.status(400).json({ message: err.message });
  }
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
    logger("Deleted ID: " + req.params.id, 5);
    res.json({ message: "Deleted Recipe" });
  } catch (err) {
    logger(err, 1);
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
