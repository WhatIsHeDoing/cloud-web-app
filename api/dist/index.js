"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const fs_1 = require("fs");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./models/user");
const typeDefs = fs_1.readFileSync("./schema.graphql", { encoding: "utf-8" });
const resolvers = {
    Mutation: {
        deleteUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const manager = typeorm_1.getMongoManager();
            const user = yield manager.findOne(user_1.User, id);
            if (!user) {
                return null;
            }
            const userClone = Object.assign({}, user);
            yield manager.remove(user);
            return userClone;
        })
    },
    Query: {
        users: () => typeorm_1.getMongoManager().find(user_1.User)
    }
};
const server = new apollo_server_1.ApolloServer({
    resolvers,
    typeDefs
});
// tslint:disable-next-line: no-console
server
    .listen()
    .then(({ url }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀  Server ready at ${url}`);
    const connection = yield typeorm_1.createConnection({
        database: "test",
        entities: [user_1.User],
        host: "localhost",
        port: 27017,
        type: "mongodb",
        useUnifiedTopology: true
    });
    if (!connection.isConnected) {
        throw new Error("Could not connect to the datbase 😢");
    }
    const manager = typeorm_1.getMongoManager();
    const user = new user_1.User();
    user.firstName = "Amanda";
    user.lastName = "Huggenkiss";
    yield manager.save(user);
    console.log("User saved! ID:", user.id);
}))
    .catch(console.error);
