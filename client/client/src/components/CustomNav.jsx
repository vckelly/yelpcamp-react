import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "@material-ui/core/Button";

import { UserContext } from "../UserContext.js";

export default function CustomNav() {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  //console.log('From nav', user, setUser);

  const handleLogout = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setUser({ user: "" });
        history.push({
          pathname: "/campgrounds",
          state: {
            from: "logout",
          },
        });
      }
    });
  };
  return (
    <Navbar bg="dark" expand="lg" variant="lg" sticky="top" className="nav">
      <Container className="fluid">
        <Navbar.Brand href="/">ReactCamp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/campgrounds">Campgrounds</Nav.Link>
            {user?.user ? (
              <Nav.Link href="/campgrounds/new">New Campground</Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          <Nav className="justify-content-end" activeKey="/home">
            {user?.user ? (
              <Nav.Item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
