import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App";
import { reduxStore } from "./reduxStore";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={reduxStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
