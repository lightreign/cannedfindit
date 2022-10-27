import React from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from "react-bootstrap-v5";
import { LinkContainer } from "react-router-bootstrap";

export const Navigation = () => (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
        <Container fluid className="content">
            <Navbar.Brand className="logo">
                <a href="/">C<span className="material-icons">home</span>nnedFindIt!</a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav defaultActiveKey="/" className="me-auto">
                    <Nav.Item>
                        <LinkContainer to="/">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/item/create">
                            <Nav.Link>Add Item</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/product/create">
                            <Nav.Link>Add Product</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/type/create">
                            <Nav.Link>Add Product Type</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/brand/create">
                            <Nav.Link>Add Brand</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/location/create">
                            <Nav.Link>Add Item Location</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
                <Nav className="d-none d-lg-block d-xl-block block">
                    <Nav.Item className="nav-icon">
                        <LinkContainer to="/user">
                            <Nav.Link><span className="material-icons">account_circle</span></Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export const ConnectedNavigation = connect(state => state)(Navigation);