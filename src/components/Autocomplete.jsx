import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap-v5";

export const Autocomplete = ({list, setValue, lineEntry, selectJson = false, testId = 'data-autocomplete'}) => {
    const [search, setSearch] = useState('');
    const [dropdownClasses, setClasses] = useState('dropdown d-none');
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    itemRefs.current = list.map((_, i) => itemRefs.current[i] || React.createRef());
    
    useEffect(() => {
        function handleClick(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                hideList();
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const selectItem = (event) => {
        const item = event.target;

        setSearch(item.innerText);

        selectJson ? setValue(item.attributes['data-json'].value) : setValue(item.innerText);
        hideList();
    };

    const suggest = (event) => {
        setSearch(event.target.value);
        showList();
    };

    const showList = () => {
        // setSearch(''); On focus in
        setClasses('dropdown d-block');
    };

    const hideList = () => {
        setClasses('dropdown d-none');
    }

    return (
        <div className="autocomplete" ref={containerRef}>
            <Form.Control type="text" onChange={suggest} onFocus={showList} value={search} placeholder="Select an option or type to filter" data-testid={testId} />
            <div className={dropdownClasses}>
                {list
                .filter(item => search ? RegExp('^' + search, 'i').test(lineEntry ? lineEntry(item) : item.name) : true)
                .map((item, i) => 
                        <div className="item" key={item._id} data-id={item._id} data-json={JSON.stringify(item)} role="option" onClick={selectItem}>
                            {lineEntry ? lineEntry(item) : item.name}
                        </div> 
                    )
                }
                </div>
        </div>
    );
};

Autocomplete.propTypes = {
    list: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired,
    lineEntry: PropTypes.func,
    selectJson: PropTypes.bool,
    testId: PropTypes.string,
};
