import React, { Component } from 'react';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={false}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

import Navigation from 'components/Navigation';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers';

const enhancer = compose(
  DevTools.instrument()
)

import { saveState } from './utils/localStorage';

import StaticJSONFileDatabase from 'utils/fileStorage';

class App extends Component {
  constructor() {
    super();
    this.state = { store: null };
  }
  componentDidMount() {
    StaticJSONFileDatabase.hydrateStoreFromFileDatabase().then(data => {
      const store = createStore(reducer, data, enhancer);
      store.subscribe(() => {
        saveState(data, store.getState());
      });
      this.setState({ store });
    });
  }
  render() {
    const store = this.state.store;
    return store ? (
      <Provider store={store}>
        <div>
          <Navigation />
          {this.props.children}
          <DevTools />
        </div>
      </Provider>
    ) : <div className="Loading">Loading...</div>;
  }
}


export default App;
