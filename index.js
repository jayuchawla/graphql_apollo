import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from 'mongoose';

import dotenv from 'dotenv';
dotenv.config()

const MONGODB_CONNECTION_URI = `mongodb+srv://${encodeURIComponent(process.env.MONGOUSER)}:${encodeURIComponent(process.env.MONGOPASS)}@${encodeURIComponent(process.env.MONGOCLUSTER)}/${encodeURIComponent(process.env.MONGODB)}`;

import { typeDefs } from './graphql_specific/typeDefs.js'
import { resolvers } from './graphql_specific/resolvers.js';
const server = new ApolloServer({
    typeDefs,
    resolvers
})

connect(MONGODB_CONNECTION_URI)
    .then(async () => {
        console.log('MongoDB connected!');
        const res = await startStandaloneServer(server, {
            listen: { port: process.env.APP_PORT || 5000 }
        });
        return res;
    })
    .then((res) => {
        console.log(`Server running on ${res.url}`);
    })
    .catch((error) => {
        console.log("Unable to start server...!");
    })