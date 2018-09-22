import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Jumbotron, Grid, Row, Col, Image, Button } from "react-bootstrap";
import "./Home.css";

export class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>welcome on board</h2>
          <p>this is my site on neuroscience graphics</p>
          <Link to="/about">
            <Button bsStyle="primary"> About </Button>
          </Link>
        </Jumbotron>

        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/neuro1.jpg" circle className="profile-pic" />
            <h3>3d Modeling</h3>
            <p>Visualizzazione 3d del neurone in ambiente opengl con threejs</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/neuro2.jpg" circle className="profile-pic" />
            <h3>Plot the data</h3>
            <p>Visualizzazione delle propriota con d3.js</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/rdf3.jpg" circle className="profile-pic" />
            <h3>3d Modeling</h3>
            <p>Visualizzazione 3d del neurone in ambiente opengl con threejs</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}
