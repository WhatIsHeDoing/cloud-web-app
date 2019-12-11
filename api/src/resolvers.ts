import { User } from "./entities";

import {
    MutationCreateUserArgs,
    MutationDeleteUserArgs,
    MutationSearchSymbolArgs,
    MutationUpdateUserArgs,
    NewsArticle,
    QuerySearchNewsArgs,
    QuerySymbolTimeSeriesArgs,
    SearchSymbolResult,
    SymbolTimeSeries
} from "./generated/graphql";

import { searchNews } from "./services/news-service";
import { searchSymbol, symbolTimeSeries } from "./services/symbol-service";

import {
    createUser,
    deleteUser,
    deleteUsers,
    findAllUsers,
    subscribeToUserChanges,
    updateUser
} from "./services/user-service";

export const resolvers = {
    Mutation: {
        createUser: async (_: any, opts: MutationCreateUserArgs): Promise<User> => createUser(opts),

        deleteUser: async (_: any, { id }: MutationDeleteUserArgs): Promise<User | null> => deleteUser(id),

        deleteUsers: async (): Promise<User[]> => deleteUsers(),

        updateUser: async (_: any, { id, patch }: MutationUpdateUserArgs)
            : Promise<User | null> => updateUser(id, patch),

        searchSymbol: async (_: any, { symbol }: MutationSearchSymbolArgs): Promise<SearchSymbolResult> =>
            searchSymbol(symbol)
    },
    Query: {
        searchNews: async (_: any, { keywords, numberOfResults }: QuerySearchNewsArgs): Promise<NewsArticle[]> =>
            searchNews(keywords, numberOfResults),

        symbolTimeSeries: async (_: any, { symbol }: QuerySymbolTimeSeriesArgs): Promise<SymbolTimeSeries[]> =>
            symbolTimeSeries(symbol),

        users: (): Promise<User[]> => findAllUsers()
    },
    SearchSymbolResult: {
        __resolveType: (model: SearchSymbolResult) => "symbol" in model ? "Symbol" : "PossibleSymbols"
    },
    Subscription: {
        userUpdated: {
            subscribe: () => subscribeToUserChanges()
        }
    }
};
