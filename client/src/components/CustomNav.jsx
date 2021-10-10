import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "@material-ui/core/Button";
// import '../CustomNav.css';
import { UserContext } from "../UserContext.js";

import { QueryClient, useQueryClient, QueryCache } from "react-query";

export default function CustomNav(props) {
  const [userCon, setUser] = useContext(UserContext);
  const history = useHistory();
  const user = window.localStorage.getItem("user");
  //console.log('From nav', user, setUser);

  // const queryCache = new QueryCache({
  //   onError: error => {
  //     console.log(error)
  //   },
  // });
  // const query = queryCache.findAll('user');
  // console.log('From nav', query, user);

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
        window.localStorage.setItem("user", "");
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
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="md"
      variant="dark"
      sticky="top"
      className="nav"
      style={{"padding": "0.5em 2em 0.5em 2em"}}
    >
      <Navbar.Brand href="/">ReactCamp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
      <Navbar.Collapse id="responsive-navbar-nav" variant="light">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/campgrounds">Campgrounds</Nav.Link>
          {user ? (
            <Nav.Link href="/campgrounds/new">New Campground</Nav.Link>
          ) : (
            ""
          )}
        </Nav>
        <Nav className="justify-content-end" activeKey="/home">
          {user.length > 0 ? (
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
    </Navbar>
  );

}
