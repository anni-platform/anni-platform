import React, { Component } from 'react';
import Navigation from 'components/Navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers';


import { saveState } from 'utils/localStorage';
import StaticJSONFileDatabase from 'utils/fileStorage';
const store = createStore(reducer, StaticJSONFileDatabase.hydrateStoreFromFileDatabase());
store.subscribe(() => {
  saveState(store.getState());
});

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <div>
          <Navigation />
          {this.props.children}
        </div>
      </Provider>
    );
  }
}


export default App;
