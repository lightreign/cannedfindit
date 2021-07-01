import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-datetime/css/react-datetime.css';
import './resources/sass/app.scss';
import { App } from "./components/App";

ReactDOM.render(
    <App/>,
    document.getElementById('mountNode')
);
