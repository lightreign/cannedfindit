import React from "react";
import { connect } from 'react-redux';
import { Nav } from "react-bootstrap-v5";
import { LinkContainer } from "react-router-bootstrap";

export const Navigation = () => (
    <Nav activeKey="/" className="sticky-top navbar-light bg-light justify-content-center">
        <Nav.Item>
            <LinkContainer to="/">
                <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
        </Nav.Item>
        <Nav.Item>
            <LinkContainer to="/item/create">
                <Nav.Link>Create Item</Nav.Link>
            </LinkContainer>
        </Nav.Item>
        <Nav.Item>
            <LinkContainer to="/type/create">
                <Nav.Link>Create Product Type</Nav.Link>
            </LinkContainer>
        </Nav.Item>
        <Nav.Item>
            <LinkContainer to="/brand/create">
                <Nav.Link>Create Brand</Nav.Link>
            </LinkContainer>
        </Nav.Item>
        <Nav.Item>
            <LinkContainer to="/product/create">
                <Nav.Link>Create Product</Nav.Link>
            </LinkContainer>
        </Nav.Item>
        <Nav.Item>
            <LinkContainer to="/location/create">
                <Nav.Link>Create Item Location</Nav.Link>
            </LinkContainer>
        </Nav.Item>
    </Nav>
);

export const ConnectedNavigation = connect(state => state)(Navigation);