import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Pagination } from "react-bootstrap-v5";

export const Pager = ({page, perPage, total, fetchData}) => {
    const [pages, setPages] = useState([]);
    const [active, setActive] = useState(page);

    useEffect(() => {
        let items = [];
        const numPages = Math.ceil(total / perPage);

        // Don't show pagination if only one page
        if (numPages === 1) {
            setPages([]);
            return;
        }

        for (let number = 1; number <= numPages; number++) {
            items.push(number);
        }

        setPages(items);
    }, [total]);

    const setPage = (number) => {
        if (number !== active) {
            fetchData(null, number, perPage);
            setActive(number);
        }
    };

    return (
        <div role="Pager">
            <Pagination>
                {pages.map(number => (
                    <Pagination.Item key={number} active={number === active} activeLabel="" onClick={() => setPage(number) }>
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

Pager.propTypes = {
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    fetchData: PropTypes.func.isRequired
}

const mapItemStateToProps = (state) => {
    return {
        page: state.pagers.item.page ?? 1,
        perPage: state.pagers.item.perPage ?? 20,
        total: state.pagers.item.total ?? 0,
    };
};

const mapProductItemStateToProps = (state) => {
    return {
        page: state.pagers.productItem.page ?? 1,
        perPage: state.pagers.productItem.perPage ?? 20,
        total: state.pagers.productItem.total ?? 0,
    };
};

export const ConnectedItemPager = connect(mapItemStateToProps)(Pager);

export const ConnectedProductItemPager = connect(mapProductItemStateToProps)(Pager);