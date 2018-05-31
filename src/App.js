import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import Navigation from 'components/Navigation';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import { getAccessTokenFromUrl, storeSessionToken, getAuthUrl } from 'adapters';
import { saveState } from './utils/localStorage';
import StaticJSONFileDatabase from 'utils/fileStorage';
import { Loader, Wrapper } from 'styled';
import GlobalStyles from 'styled/components/Base';

let enhancer = null;
let DevTools = null;
if (process.env.NODE_ENV === 'development') {
  DevTools = require('DevTools').default;
  enhancer = compose(DevTools.instrument());
}

const test = {
  a: 1,
  b: 2,
};

class App extends Component {
  constructor() {
    super();
    this.state = { store: null };
  }
  componentDidMount() {
    const token = getAccessTokenFromUrl();
    window.loginDropbox = function() {
      window.location.href = getAuthUrl();
    };
    if (token) {
      storeSessionToken(token);
    }
    StaticJSONFileDatabase.hydrateStoreFromFileDatabase().then(data => {
      let store;
      if (process.env.NODE_ENV === 'development') {
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
    GlobalStyles();

    const store = this.state.store;
    return store ? (
      <Provider store={store}>
        <Wrapper>
          <Navigation />
          {this.props.children}
          {DevTools ? <DevTools /> : null}
        </Wrapper>
      </Provider>
    ) : (
      <Loader fullPage />
    );
  }
}

export default App;
