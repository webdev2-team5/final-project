const mongoose = require('mongoose')

recipeSchema = mongoose.Schema({
    name: {type:String, required: true },
    ingredients: {type:String, required: true },
    instructions:{type:String, required: true},
    createdAt: {type:Date, default: Date.now},
    favorited: {type:Boolean, default: false}
})

module.exports = mongoose.model('Recipe', recipeSchema)
