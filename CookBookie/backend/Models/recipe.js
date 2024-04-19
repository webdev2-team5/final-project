const mongoose = require('mongoose')

recipeSchema = mongoose.Schema({
    name: {type:String, required: true },
    ingredients: {type:String, required: true },
    instructions:{type:String, require: true}
})

module.exports = mongoose.model('Recipe', recipeSchema)