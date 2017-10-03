import React, { Component } from "react";
import { createStore, compose } from "redux";
import Navigation from "components/Navigation";
import { Provider } from "react-redux";
import reducer from "reducers";
import { getAccessTokenFromUrl, storeSessionToken } from "adapters";
import { saveState } from "./utils/localStorage";
import StaticJSONFileDatabase from "utils/fileStorage";
import { Loader, Wrapper } from "styled";

let enhancer = null;
let DevTools = null;
if (process.env.NODE_ENV === "development") {
  DevTools = require("DevTools");
  enhancer = compose(DevTools.instrument());
}

class App extends Component {
  constructor() {
    super();
    this.state = { store: null };
  }
  componentDidMount() {
    const token = getAccessTokenFromUrl();
    if (token) {
      storeSessionToken(token);
    }
    StaticJSONFileDatabase.hydrateStoreFromFileDatabase().then(data => {
      let store;
      if (process.env.NODE_ENV === "development") {
        store = createStore(reducer, data, enhancer);
      } else {
        store = createStore(reducer, data);
      }
      store.subscribe(() => {
        saveState(store.getState());
      });
      this.setState({ store });
    });
  }
  render() {
    const store = this.state.store;
    return store
      ? <Provider store={store}>
          <Wrapper>
            <Navigation />
            {this.props.children}
            {DevTools ? <DevTools /> : null}
          </Wrapper>
        </Provider>
      : <Loader fullPage />;
  }
}

export default App;
