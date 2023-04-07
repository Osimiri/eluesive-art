import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";

// const GlobalStyle = createGlobalStyle`
//   *,
//   *::before, 
//   *::after {
//     box-sizing: border-box;
//   }

//   html, body {
//     margin: 0;
//   }

//   body {
//     font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
//   }
// `;


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);