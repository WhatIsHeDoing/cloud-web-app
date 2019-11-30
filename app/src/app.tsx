import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import "./app.css";
import { Test } from "./test";

const client = new ApolloClient({
    uri: "http://localhost:4000"
});

export const App: React.FC = () => (
    <ApolloProvider client={client}>
        <div className="App">
            <header className="App-header">
                <Test />
            </header>
        </div>
    </ApolloProvider>
);
