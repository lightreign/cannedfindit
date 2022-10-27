import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listItems, listProductItems } from "../../store/actions";
import { ButtonGroup, ToggleButton } from "react-bootstrap-v5";
import { ConnectedItemSearch } from "./ItemSearch";
import { ItemTable } from "./ItemTable";
import { ProductItemTable } from "../Product/ProductItemTable";

export const ItemList = ({items, listItems, currentSearch, productItems, listProductItems}) => {
    useEffect(() => {
        listItems(currentSearch);
        listProductItems();
    }, []);

    const [selectedMode, setSelectedMode] = useState('group');

    const modes = [
        { name: 'view_stream', value: 'group' },
        { name: 'list', value: 'list' },
    ];

    return (
    <div>
        <ConnectedItemSearch changeMode={setSelectedMode} search={currentSearch}/>
        <div>
            <legend>Item Inventory</legend>
            <div className='float-end'>
                <ButtonGroup className="list-select mb-2">
                    {modes.map((mode, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`mode-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={mode.value}
                            data-testid={mode.value}
                            checked={selectedMode === mode.value}
                            onChange={(e) => setSelectedMode(e.currentTarget.value)}
                        >
                            <span className="material-icons">{mode.name}</span>
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
        </div>
        { selectedMode === 'group' ?
            <ProductItemTable
                productItems={productItems}
                listProductItems={listProductItems}
                listItems={listItems}
                changeMode={setSelectedMode}
            /> :
            <ItemTable items={items} listItems={listItems}/>
        }
    </div>
)};

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    listItems: PropTypes.func.isRequired,
    currentSearch: PropTypes.object.isRequired,
    productItems: PropTypes.array.isRequired,
    listProductItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        productItems: state.productItems,
        currentSearch: state.pagers.item.filter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        listItems(search, page, perPage) {
            dispatch(listItems(search, page, perPage));
        },
        listProductItems(search, page, perPage) {
            dispatch(listProductItems(search, page, perPage));
        }
    }
};

export const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);