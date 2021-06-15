import React, { useState } from 'react';

import { inventory } from '../inventory';

export default function App() {
    console.log(inventory.getState());

    const [count, setCount] = useState(0);
    return (
        <div>
            <p>
                This is a sample stateful and server-side
                rendered React application.
            </p>
            <br/>
            <p>
                Here is a button that will track
                how many times you click it:
            </p>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    );
}

