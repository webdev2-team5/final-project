const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PostModel = require('./Models/recipe')

// Connect to MongoDB Atlas
mongoose.connect('REPLACE WITH CONNECTION STRING')
.then(()=>{
    console.log('Connected to database')
})
.catch((error) => {
    console.log('Connection error:', error.message);
  })


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