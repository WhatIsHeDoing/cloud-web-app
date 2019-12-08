import { Symbol, User } from "./entities";
import { CreateUserOptions, FindUserOptions, PossibleSymbols, SearchSymbolOptions, UpdateUserOptions } from "./models";
import { searchSymbol } from "./services/symbol-service";
import { createUser, deleteUser, deleteUsers, findAllUsers, subscribeToUserChanges, updateUser } from "./services/user-service";

export const resolvers = {
    Mutation: {
        createUser: async (_: any, opts: CreateUserOptions): Promise<User> => createUser(opts),

        deleteUser: async (_: any, { id }: FindUserOptions): Promise<User | null> => deleteUser(id),

        deleteUsers: async (): Promise<User[]> => deleteUsers(),

        updateUser: async (_: any, { id, patch }: UpdateUserOptions): Promise<User | null> => updateUser(id, patch),

        searchSymbol: async (_: any, { symbol }: SearchSymbolOptions): Promise<Symbol | PossibleSymbols> => searchSymbol(symbol)
    },
    Query: {
        users: (): Promise<User[]> => findAllUsers()
    },
    SearchSymbolResult: {
        __resolveType: (model: Symbol | PossibleSymbols) => "symbol" in model ? "Symbol" : "PossibleSymbols"
    },
    Subscription: {
        userUpdated: {
            subscribe: () => subscribeToUserChanges()
        }
    }
};
