import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function CustomNav() {
    return (
        <Navbar bg="dark" expand="lg" variant="lg" sticky="top">
            <Container className="fluid">
                <Navbar.Brand href="/home">ReactCamp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/campgrounds">Campgrounds</Nav.Link>
                        <Nav.Link href="/campgrounds/new">New Campground</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};
