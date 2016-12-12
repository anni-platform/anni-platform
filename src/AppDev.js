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
               defaultIsVisible={true}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

import Navigation from './components/Navigation';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './stylus/components/Navigation';

const enhancer = compose(
  DevTools.instrument()
)



import { saveState, loadState } from './utils/localStorage';
const store = createStore(reducer, loadState(), enhancer);
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
          <DevTools />
        </div>
      </Provider>
    );
  }
}


export default App;
