import React, { Component } from 'react';
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import Navigation from 'components/Navigation';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import { getAccessTokenFromUrl, storeSessionToken, getAuthUrl } from 'adapters';
import { saveState } from './utils/localStorage';
import StaticJSONFileDatabase from 'utils/fileStorage';
import { Loader, Wrapper } from 'styled';
import GlobalStyles from 'styled/components/Base';
import sagas from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const PRE_PROD = process.env.NODE_ENV === 'development';

let enhancer = compose(applyMiddleware(sagaMiddleware));

if (PRE_PROD) {
  enhancer = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = { store: null };
  }
  componentDidMount() {
    const token = getAccessTokenFromUrl();

    window.loginDB = function() {
      window.location.href = getAuthUrl();
    };

    if (token) storeSessionToken(token);

    StaticJSONFileDatabase.hydrateStoreFromFileDatabase().then(data => {
      const store = createStore(reducer, data, enhancer);
      sagaMiddleware.run(sagas);

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
        </Wrapper>
      </Provider>
    ) : (
      <Loader fullPage />
    );
  }
}

export default App;
