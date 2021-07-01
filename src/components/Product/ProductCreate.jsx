import React from "react";
import { addProduct } from "../../store/actions";
import { connect } from "react-redux";
import { ConnectedTypeSelect } from "../Type/TypeSelect";
import { ConnectedBrandSelect } from "../Brand/BrandSelect";
import { Button, Col, Form, Row } from "react-bootstrap-v5";

export const ProductCreate = ({createProduct, setType, setBrand, setMass, setUnit}) => (
    <Form id="productCreateForm" onSubmit={createProduct}>
        <legend>Add a Product</legend>

        <ConnectedBrandSelect setProductBrand={setBrand}/>
        <ConnectedTypeSelect setProductType={setType}/>

        <Row>
            <Col>
                <Form.Group controlId="weightVolume">
                    <Form.Label>Weight / Volume:</Form.Label>
                    <Form.Control name="mass" onChange={setMass} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="unit">
                    <Form.Label>Unit:</Form.Label>
                    <Form.Control as="select" name="unit" onChange={setUnit} defaultValue='g'>
                        <option value="g">grams</option>
                        <option value="ml">millilitres</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>

        <Button type="submit" className="btn btn-primary">Add Product</Button>
    </Form>
);

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        types: state.types,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createProduct(e) {
            e.preventDefault();

            if (ownProps.type && ownProps.brand) {
                const product = {
                    type: {
                        name: ownProps.type
                    },
                    brand: {
                        name: ownProps.brand
                    },
                };

                if (ownProps.unit === 'ml') {
                    product.volume = ownProps.mass;
                } else {
                    product.weight = ownProps.mass;
                }

                dispatch(addProduct(product));
                e.target.reset();
            } else {
                // TODO: error message
            }
        },
        setType(e) {
            ownProps.type = e.target.value;
        },
        setBrand(e) {
            ownProps.brand = e.target.value;
        },
        setMass(e) {
            ownProps.mass = e.target.value;
        },
        setUnit(e) {
            ownProps.unit = e.target.value;
        }
    };
};

export const ConnectedProductCreate = connect(mapStateToProps, mapDispatchToProps)(ProductCreate);