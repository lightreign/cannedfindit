import React from "react";
import { connect } from 'react-redux';
import { Nav } from "react-bootstrap-v5";
import { LinkContainer } from "react-router-bootstrap";

export const Navigation = () => (
    <Nav activeKey="/" className="sticky-top navbar-dark bg-dark justify-content-center">
        <Nav.Item>
            <LinkContainer to="/">
                <Nav.Link className="navbar-brand logo">C<span className="material-icons">home</span>nnedFindIt!</Nav.Link>
            </LinkContainer>
        </Nav.Item>
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
);

export const ConnectedNavigation = connect(state => state)(Navigation);