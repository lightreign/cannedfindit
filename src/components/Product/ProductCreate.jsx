import React, {useState} from "react";
import { addErrorNotification, addProduct } from "../../store/actions";
import { connect } from "react-redux";
import { ConnectedTypeSelect } from "../Type/TypeSelect";
import { ConnectedBrandSelect } from "../Brand/BrandSelect";
import { Button, Col, Form, Row } from "react-bootstrap-v5";

export const ProductCreate = ({dispatch}) => {
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [mass, setMass] = useState('');
    const [unit, setUnit] = useState('g');
    const [submitting, setSubmitting] = useState(false);

    const createProduct = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMass(parseInt(mass));

        if (type && brand && mass && !isNaN(mass)) {
            const product = {
                type: {
                    name: type
                },
                brand: {
                    name: brand
                },
            };

            if (unit === 'ml') {
                product.volume = mass;
            } else {
                product.weight = mass;
            }

            dispatch(addProduct(product));
            e.target.reset();
        } else {
            dispatch(addErrorNotification('Product information is missing, please enter details'));
        }

        setSubmitting(false);
    };

    return (
        <Form id="productCreateForm" onSubmit={createProduct} role="ProductForm">
            <legend>Add a Product</legend>

            <ConnectedBrandSelect setProductBrand={e => setBrand(e.target.value)}/>
            <ConnectedTypeSelect setProductType={e => setType(e.target.value)}/>

            <Row>
                <Col>
                    <Form.Group controlId="weightVolume">
                        <Form.Label>Weight / Volume:</Form.Label>
                        <Form.Control name="mass" data-testid="massInput" onChange={e => setMass(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="unit">
                        <Form.Label>Unit:</Form.Label>
                        <Form.Select name="unit" data-testid="unitSelect" onChange={e => setUnit(e.target.value)} defaultValue='g'>
                            <option value="g">grams</option>
                            <option value="ml">millilitres</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Button type="submit" disabled={submitting} className="btn btn-primary">Add Product</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export const ConnectedProductCreate = connect(mapStateToProps)(ProductCreate);