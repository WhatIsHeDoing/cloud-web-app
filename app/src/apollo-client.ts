import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost";
import introspectionQueryResultData from "./generated/graphql.schema.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

export const apolloClient = new ApolloClient({
    cache,
    uri: "http://localhost:4000"
});
