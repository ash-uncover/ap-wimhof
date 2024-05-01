import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import { BrowserRouter, HashRouter } from "react-router-dom";

import {
  defaultTheme,
  Provider as SpectrumProvider,
} from "@adobe/react-spectrum";

// Import translation module
import "lib/utils/i18n";

// Should be imported before first access to the reducers
import store from "store";

// Import components
import Root from "routes/__layout";
import CONFIG from "config";

let Router = BrowserRouter;
if (CONFIG.AP_WIMHOF_ENVIRONMENT === "github") {
  Router = HashRouter;
}

const containerRoot = document.getElementById("reactroot")!;
const root = createRoot(containerRoot);

root.render(
  <SpectrumProvider theme={defaultTheme}>
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  </SpectrumProvider>
);
