import React from "react";
import "./App.css";
import ChatInterface from "./components/ChatInterface";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to SoLogue</h1>
        <ChatInterface />
      </header>
    </div>
  );
};

export default App;
