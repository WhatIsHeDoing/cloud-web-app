import { createConnection } from "typeorm";
import { User } from "./entities";

export const connectToDatabase = async () => {
    const connection = await createConnection({
        database: "test",
        entities: [User],
        host: "localhost",
        port: 27017,
        type: "mongodb",
        useUnifiedTopology: true
    });

    if (!connection.isConnected) {
        throw new Error("Could not connect to the database 😢");
    }
};
