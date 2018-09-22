import React, { Component } from "react";
import { ThreeScene } from "./ThreeScene";
import ReactDOM from "react-dom";
import Slider, { Range } from "rc-slider";
import { Button } from "react-bootstrap";
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import "rc-slider/assets/index.css";
import SplitPane from "react-split-pane";

export class Container extends Component {
  state = {
    value: 50,
    valueScale: 50,
    reload: 0,

    options: {
      velx: 0,
      vely: 0.001,
      scale: 1
    }
  };

  reset = () => {
    this.state.options.vely = 0;
    this.setState({ value: 50 });

    this.state.options.scale = 1;
    this.setState({ valueScale: 50 });
  };

  render() {
    console.log("state: " + this.state);
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize={200} primary="first">
          <div>
            <Button onClick={this.reset} bsStyle="primary" bsSize="large">
              reset
            </Button>
            <h3>rotation</h3>
            <Slider
              min={0}
              max={100}
              value={this.state.value}
              onChange={x => this.onChangeValue(x)}
            />
            <h3>radius scale</h3>
            <Slider
              min={0}
              max={100}
              value={this.state.valueScale}
              onChange={x => this.onChangeScale(x)}
            />
            <h3>Reload</h3>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={() => this.onChangeReload()}
            >
              Reload
            </Button>
          </div>
          <ThreeScene state={this.state} changeMethod={this.onChangeReload} />
          <div />
        </SplitPane>
      </div>
    );
  }

  onChangeValue(newValue) {
    this.setState({ value: newValue }, function() {
      this.state.options.vely = (this.state.value - 50) / 1000;
    });
  }

  onChangeScale(newValue) {
    this.setState({ valueScale: newValue }, function() {
      this.state.options.scale = (this.state.valueScale - 50) / 100 + 1;
    });
  }

  onChangeReload = () => {
    console.log("realoa" + this.state.reload);
    var recalculate = (this.state.reload + 1) % 2;
    this.setState({ reload: recalculate });
  };
}
