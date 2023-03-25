import { model, Schema } from 'mongoose';

const recipeSchema = new Schema({
    name: String, 
    description: String,
    createdAt: String,
    thumbsUp: Number,
    thumbsDown: Number
});

var Recipe = model('Recipe', recipeSchema)
export {Recipe};
// module.exports = Recipe;