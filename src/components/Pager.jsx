import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Pagination } from "react-bootstrap-v5";

export const Pager = ({page, perPage, itemCount, fetchData}) => {
    const [pages, setPages] = useState([]);
    const [active, setActive] = useState(page);

    useEffect(() => {
        let items = [];
        const numPages = Math.ceil(itemCount / perPage);

        // Don't show pagination if only one page
        if (numPages === 1) {
            setPages([]);
            return;
        }

        for (let number = 1; number <= numPages; number++) {
            items.push(number);
        }

        setPages(items);
    }, [itemCount]);

    const setPage = (number) => {
        if (number !== active) {
            fetchData(null, number);
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

const mapStateToProps = (state) => {
    return {
        page: state.pager.page,
        perPage: state.pager.perPage,
        itemCount: state.pager.itemCount,
    };
};

export const ConnectedPager = connect(mapStateToProps)(Pager);
