import React from "react";
import { render } from "react-dom";
import AppContainer from "./AppContainer";

render(<AppContainer />, root);

if (module.hot) {
  module.hot.accept("./AppContainer", () => {
    const NextApp = require("./AppContainer").default
    render(<NextApp />, root)
  })
}
