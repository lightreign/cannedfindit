import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Pagination } from "react-bootstrap-v5";
import { getItemsCount } from "../store/actions";

export const Pager = ({page = 1, perPage, itemCount, fetchData, getItemsCount }) => {
    const [items, setItems] = useState([]);
    const [active, setActive] = useState(page);

    useEffect(() => {
        getItemsCount();
    }, []);

    useEffect(() => {
        let items = [];
        const pages = Math.ceil(itemCount / perPage);

        // Dont show pagination if only one page
        if (pages === 1) {
            return;
        }

        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} activeLabel="" onClick={() => setPage(number) }>
                    {number}
                </Pagination.Item>,
            );
        }

        setItems(items);
    }, [itemCount]);

    const setPage = (number) => {
        if (number !== active) {
            fetchData(perPage, number);
            setActive(number);
        }
    };

    return (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        page: state.pager.page,
        perPage: state.pager.perPage,
        itemCount: state.pager.itemCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItemsCount() {
            dispatch(getItemsCount());
        }
    }
};

export const ConnectedPager = connect(mapStateToProps, mapDispatchToProps)(Pager);
