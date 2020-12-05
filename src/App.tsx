import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chat from "./Components/Chat";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Chat user="Gianni" left="1vh" />
        <Chat user="Pinotto" left="400px" />
      </header>
    </div>
  );
}

export default App;
