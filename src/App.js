import React, { Component } from "react";
import Navbar from "./components/layout/navbar";
import "./App.css";

class App extends Component {
  name = () => "John Doe";
  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" />
        <h1>Hello {this.name()}</h1>
      </div>
    );
  }
}

export default App;
