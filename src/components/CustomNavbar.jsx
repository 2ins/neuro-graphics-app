import React, { Component } from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomNavbar.css";

export class CustomNavbar extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to=""> Neuro Graphics </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}>
              <Link to="/Home">Home </Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/About">About</Link>
            </NavItem>
            <NavItem eventKey={3}>
              <Link to="/News">News </Link>
            </NavItem>
            <NavItem eventKey={3}>
              <Link to="/ThreeScene">Neuro 3D</Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
