import React, { Component } from "react";
import { createStore, compose } from "redux";
import Navigation from "components/Navigation";
import { Provider } from "react-redux";
import reducer from "reducers";
import { getAccessTokenFromUrl, storeSessionToken } from "adapters";
import { saveState } from "./utils/localStorage";
import StaticJSONFileDatabase from "utils/fileStorage";
import { Loader, Wrapper } from "styled";
import GlobalStyles from 'styled/components/Base';

const PRE_PROD = process.env.NODE_ENV === "development";

let enhancer = null;
let DevTools = null;
if (PRE_PROD) {
  DevTools = require("DevTools").default;
  enhancer = compose(DevTools.instrument());
}

class App extends Component {
  constructor() {
    super();
    this.state = { store: null };
  }
  componentDidMount() {
    const token = getAccessTokenFromUrl();

    if (token) storeSessionToken(token);

    StaticJSONFileDatabase.hydrateStoreFromFileDatabase().then(data => {
      const store = PRE_PROD
        ? createStore(reducer, data, enhancer)
        : createStore(reducer, data);

      store.subscribe(() => {
        saveState(store.getState());
      });
      this.setState({ store });
    });
  }
  render() {

    GlobalStyles()

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
