import React from "react";
import {
  Button,
  Form,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
} from "react-bootstrap";
import "./header.css"
export const Header = () => {
  return (
    <React.Fragment>
      <Navbar
        collapseOnSelect
        expand="sm"
        bg="light"
        variant="light"
        className="mb-3"
      >
        <Navbar.Brand className="mx-3">BG Logger</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link  href="/myblogs">My Blogs</Nav.Link>
            <Nav.Link>All Blogs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="float-right">
          <Button className="mar">Log out</Button>
        </div>
      </Navbar>
    </React.Fragment>
  );
};
