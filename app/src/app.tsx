import "react-toastify/dist/ReactToastify.min.css";
import "./app.css";

import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { toast } from "react-toastify";

import { apolloClient } from "./apollo-client";
import { SearchSymbol } from "./search-symbol";
import { Test } from "./test";

toast.configure({
    autoClose: 5000,
    draggable: true,
    position: "bottom-right"
});

export const App: React.FC = () => (
    <ApolloProvider client={apolloClient}>
        <div className="App">
            <header className="App-header">
                <Test />
                <SearchSymbol />
            </header>
        </div>
    </ApolloProvider>
);
