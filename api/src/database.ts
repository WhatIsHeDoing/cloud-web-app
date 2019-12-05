import { createConnection } from "typeorm";
import { User } from "./entities";
require("dotenv-defaults").config();

export const connectToDatabase = async () => {
    const connection = await createConnection({
        database: "test",
        entities: [User],
        host: process.env.DB_HOST || "localhost",
        port: +(process.env.DB_PORT || 27017),
        type: "mongodb",
        useUnifiedTopology: true
    });

    if (!connection.isConnected) {
        throw new Error("Could not connect to the database 😢");
    }
};
