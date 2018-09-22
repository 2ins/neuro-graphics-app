import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { News } from "./components/News";
import { About } from "./components/About";
import { ThreeScene } from "./components/ThreeScene";
import { ThreeScene1 } from "./components/ThreeScene1";
import { CustomNavbar } from "./components/CustomNavbar";
import { Container } from "./components/three/Container";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <CustomNavbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/News" component={News} />
          <Route exact path="/About" component={About} />
          <Route exact path="/ThreeScene" component={ThreeScene} />
          <Route exact path="/ThreeScene_1" component={ThreeScene1} />
          <Route exact path="/Container" component={Container} />
        </div>
      </Router>
    );
  }
}

export default App;
