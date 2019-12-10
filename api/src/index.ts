import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import "reflect-metadata";

import { connectToDatabase } from "./database";
import { resolvers } from "./resolvers";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const server = new ApolloServer({
    resolvers,
    typeDefs
});

// tslint:disable: no-console
server
    .listen()
    .then(async ({ url }) => {
        await connectToDatabase();
        console.log(`🚀 GraphQL ready at ${url}`);
    })
    .catch(console.error);
