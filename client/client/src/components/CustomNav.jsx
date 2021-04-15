import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { UserContext } from '../UserContext.js';

export default function CustomNav() {
    return (
        <UserContext.Consumer>
            {(user, setUser) => 
                <Navbar bg="dark" expand="lg" variant="lg" sticky="top">
                    <Container className="fluid">
                        <Navbar.Brand href="/home">ReactCamp</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/campgrounds">Campgrounds</Nav.Link>
                                { user ? (
                                    <Nav.Link href="/campgrounds/new">New Campground</Nav.Link>
                                ) : ('')}
                            </Nav>
                            <Nav className="justify-content-end" activeKey="/home">
                                { user ? 
                                    (<Nav.Item>
                                        <Nav.Link href="/logout">Logout</Nav.Link>
                                    </Nav.Item>): 
                                    (<>
                                    <Nav.Item>
                                        <Nav.Link href="/register">Register</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                    </Nav.Item>
                                    </>)
                                }
                                 
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
            </Navbar>
            }
        </UserContext.Consumer>
    )
};
