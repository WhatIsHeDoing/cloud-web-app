import { Symbol, User } from "./entities";

import {
    CreateUserOptions, FindUserOptions, NewsArticle, PossibleSymbols, SearchNewsOptions,
    SearchSymbolOptions, SymbolTimeSeries, SymbolTimeSeriesOptions, UpdateUserOptions
} from "./models";

import { searchNews } from "./services/news-service";
import { searchSymbol, symbolTimeSeries } from "./services/symbol-service";
import { createUser, deleteUser, deleteUsers, findAllUsers, subscribeToUserChanges, updateUser } from "./services/user-service";

export const resolvers = {
    Mutation: {
        createUser: async (_: any, opts: CreateUserOptions): Promise<User> => createUser(opts),

        deleteUser: async (_: any, { id }: FindUserOptions): Promise<User | null> => deleteUser(id),

        deleteUsers: async (): Promise<User[]> => deleteUsers(),

        updateUser: async (_: any, { id, patch }: UpdateUserOptions): Promise<User | null> => updateUser(id, patch),

        searchSymbol: async (_: any, { symbol }: SearchSymbolOptions): Promise<Symbol | PossibleSymbols> =>
            searchSymbol(symbol)
    },
    Query: {
        searchNews: async (_: any, { keywords, numberOfResults }: SearchNewsOptions): Promise<NewsArticle[]> =>
            searchNews(keywords, numberOfResults),

        symbolTimeSeries: async (_: any, { symbol }: SymbolTimeSeriesOptions): Promise<SymbolTimeSeries[]> =>
            symbolTimeSeries(symbol),

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
