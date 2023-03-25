import { Recipe } from '../models/recipe.js';

const resolvers = {
    Query: {
        recipe: async (_, { ID }) => {
            return await Recipe.findById(ID);
        },
        getRecipies: async (_, { amount }) => {
            return await Recipe.find().sort({ createdAt: -1 }).limit(amount)
        }
    },
    Mutation: {
        createRecipe: async (_, { recipeInput: { name, description } }) => {
            const createdRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0
            });

            const res = await createdRecipe.save(); // save to DB
            return {
                id: res.id,
                ...res._doc
            }
        },

        deleteRecipe: async (_, { ID }) => {
            const deleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
            return deleted;
        },

        editRecipe: async (_, { ID, recipeInput: { name, description } }) => {
            const modified = (await Recipe.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
            return modified;
        }
    }
}

// module.exports = resolvers;
export { resolvers };