import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import { App } from "./components/App";

ReactDOM.render(
    <App/>,
    document.getElementById('mountNode')
);
