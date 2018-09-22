import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";
import "./News.css";

export class News extends Component {
  render() {
    return (
      <div>
        <Image src="assets/neurohead.jpg" className="header-image" />
        <Grid>
          <h2>News</h2>
          <Row>
            <Col xs="8" className="main-section">
              <p>
                Automatically, all of these beautiful, beautiful things will
                happen. That's a crooked tree. We'll send him to Washington.
                We're trying to teach you a technique here and how to use it. If
                you don't think every day is a good day - try missing a few.
                You'll see. Just think about these things in your mind and drop
                It all happens automatically. Without washing the brush, I'm
                gonna go right into some Van Dyke Brown, some Burnt Umber, and a
                little bit of Sap Green. Little trees and bushes grow however
                makes them happy. Don't fight it, use what happens.
              </p>
              <p>
                Automatically, all of these beautiful, beautiful things will
                happen. That's a crooked tree. We'll send him to Washington.
                We're trying to teach you a technique here and how to use it. If
                you don't think every day is a good day - try missing a few.
                You'll see. Just think about these things in your mind and drop
                It all happens automatically. Without washing the brush, I'm
                gonna go right into some Van Dyke Brown, some Burnt Umber, and a
                little bit of Sap Green. Little trees and bushes grow however
                makes them happy. Don't fight it, use what happens.
              </p>
              <p>
                Automatically, all of these beautiful, beautiful things will
                happen. That's a crooked tree. We'll send him to Washington.
                We're trying to teach you a technique here and how to use it. If
                you don't think every day is a good day - try missing a few.
                You'll see. Just think about these things in your mind and drop
                It all happens automatically. Without washing the brush, I'm
                gonna go right into some Van Dyke Brown, some Burnt Umber, and a
                little bit of Sap Green. Little trees and bushes grow however
                makes them happy. Don't fight it, use what happens.
              </p>
            </Col>
            <Col xs="4" className="sidebar-section">
              <Image src="assets/rdf3.jpg" rounded />
              <p>
                Automatically, all of these beautiful, beautiful things will
                happen. That's a crooked tree. We'll send him to Washington.
                We're trying to teach you a technique here and how to use it.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
