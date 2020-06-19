import React, { Component } from "react";
import "./App.css";
import Cellular from "./Cellular.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conway's Brilliant Game Of Life!</h1>
        <Cellular />
      </div>
    );
  }
}

export default App;
