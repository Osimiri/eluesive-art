import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserProvider"; // import UserProvider here
import "./index.css";
import App from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider> {/* Wrap App with UserProvider */}
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

