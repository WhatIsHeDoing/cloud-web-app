import { getMongoManager } from "typeorm";
import { User } from "./models/user";

export const resolvers = {
    Mutation: {
        createUser: async (_: any, opts: CreateOptions): Promise<User> => {
            const manager = getMongoManager();
            const user = manager.create(User, opts);
            await manager.save(user);
            return user;
        },

        deleteUser: async (_: any, { id }: FindOptions): Promise<User | null> => {
            const manager = getMongoManager();
            const user = await manager.findOne(User, id);

            if (!user) {
                return null;
            }

            const userClone = { ...user };
            await manager.remove(user);
            return userClone;
        },

        deleteUsers: async (): Promise<boolean> => (await getMongoManager().deleteMany(User, {})) && true
    },
    Query: {
        users: (): Promise<User[]> => getMongoManager().find(User)
    }
};

interface CreateOptions {
    firstName: string;
    lastName: string;
}

interface FindOptions {
    id: string;
}
