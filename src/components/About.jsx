import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./About.css";

export class About extends Component {
  render() {
    return (
      <div>
        <Image src="assets/neurohead.jpg" className="header-image" />
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
            <Image
              src="assets/neuro1.jpg"
              rounded
              className="about-profile-pic"
            />
            <h3>
              Automatically, all of these beautiful, beautiful things will
              happen.
            </h3>
            <p>
              Automatically, all of these beautiful, beautiful things will
              happen. That's a crooked tree. We'll send him to Washington. We're
              trying to teach you a technique here and how to use it.
            </p>

            <p>
              If you don't think every day is a good day - try missing a few.
              You'll see. Just think about these things in your mind and drop
              em' on canvas.
            </p>

            <p>
              It all happens automatically. Without washing the brush, I'm gonna
              go right into some Van Dyke Brown, some Burnt Umber, and a little
              bit of Sap Green. Little trees and bushes grow however makes them
              happy. Don't fight it, use what happens.
            </p>
          </Col>
        </Grid>
      </div>
    );
  }
}
