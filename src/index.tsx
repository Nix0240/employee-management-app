import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { makeServer } from "./server/server";
import store from "./redux/store";
import App from "./App";
import "./App.css";

makeServer();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
