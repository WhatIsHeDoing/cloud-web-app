import { User } from "./entities";
import { CreateUserOptions, FindUserOptions, UpdateUserOptions } from "./models";
import { createUser, deleteUser, deleteUsers, findAllUsers, subscribeToUserChanges, updateUser } from "./services/user-service";

export const resolvers = {
    Mutation: {
        createUser: async (_: any, opts: CreateUserOptions): Promise<User> => createUser(opts),

        deleteUser: async (_: any, { id }: FindUserOptions): Promise<User | null> => deleteUser(id),

        deleteUsers: async (): Promise<User[]> => deleteUsers(),

        updateUser: async (_: any, { id, patch }: UpdateUserOptions): Promise<User | null> => updateUser(id, patch)
    },
    Query: {
        users: (): Promise<User[]> => findAllUsers()
    },
    Subscription: {
        userUpdated: {
            subscribe: () => subscribeToUserChanges()
        }
    }
};
