import React, { Component } from 'react';
import Navigation from 'components/Navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers';


import { saveState } from 'utils/localStorage';
import StaticJSONFileDatabase from 'utils/fileStorage';

class App extends Component {
  constructor() {
    super();
    this.state = { store: null };
  }

  componentDidMount() {
    StaticJSONFileDatabase.hydrateStoreFromFileDatabase().then(data => {
      const store = createStore(reducer, data);
      store.subscribe(() => {
        saveState(data, store.getState());
      });
      this.setState({ store });
    });
  }
  render() { 
    const store = this.state.store;
    return store ? (
      <Provider store={store || {}}>
        <div>
          <Navigation />
          {this.props.children}
        </div>
      </Provider>
    ) : <div className="Loading">Loading...</div>;
  }
}


export default App;
