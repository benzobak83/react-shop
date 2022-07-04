import React from "react";
import ReactDOM from "react-dom";
import { App } from './App.jsx';
import '../assets/scss/main.scss';
document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));
});