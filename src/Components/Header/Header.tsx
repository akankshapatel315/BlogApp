import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Navigate, useLocation } from "react-router-dom"; // Import Link, Navigate, and useLocation from react-router-dom
import { useSelector } from "react-redux";
import { AddBlog } from "../Blog/AddBlog";

export const Header = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handleModalVisible = () => setModalShow(!modalShow);
  const accessToken = useSelector(
    (state: any) => state.userData?.userData?.accessToken
  );

  return (
    <React.Fragment>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Blog App</Navbar.Brand>
          {(window.localStorage.getItem("accessToken") || accessToken) && (
            <Nav className="me-auto">
              <Nav.Link  href="/allBlogs" className="nav-link">All Articles</Nav.Link > {/* Use Link component for navigation */}
              <Nav.Link  href="/myBlogs" className="nav-link">My Articles</Nav.Link > {/* Use Link component for navigation */}
              <Button onClick={handleModalVisible}>Add Blog</Button>
              <Nav.Link href="/" onClick={()=> window.localStorage.clear()}>Log out</Nav.Link> {/* Use Navigate component for navigation */}
            </Nav>
          )}
        </Container>
      </Navbar>
      <AddBlog
        modalShow={modalShow}
        handleModalVisible={handleModalVisible}
      />
    </React.Fragment>
  );
};
