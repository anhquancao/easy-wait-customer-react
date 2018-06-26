import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import './styles/index.less';
import App from "./App";

const render = Component =>
    ReactDOM.render(
        <Component/>,
        document.getElementById('root')
    );

render(App);


if (module.hot) module.hot.accept('./App.js', () => {
    console.log("re-render");
    const nextApp = require('./App.js').default;
    render(nextApp)
});