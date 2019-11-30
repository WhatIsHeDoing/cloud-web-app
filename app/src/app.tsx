import React from "react";
import "./app.css";
import logo from "./logo.svg";

export const App: React.FC = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Edit <code>src/App.tsx</code> and save to reload.</p>
            <a className="App-link" href="https://reactjs.org">Learn React</a>
        </header>
    </div>
);
