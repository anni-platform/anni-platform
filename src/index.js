import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Auth from 'routes/auth';
import Dashboard from 'routes/dashboard';
import Project from 'routes/project';
import Login from 'routes/login';
import Patterns from 'routes/patterns';
import 'normalize.css';
import 'styles/Main';

// TODO: Add 404 component to replace this null
const NoMatch = null;

let App;
if (process.env.NODE_ENV === 'development') {
  App = require('./AppDev').default;
} else {
  App = require('./App').default;
}

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth" component={Auth} />
      <Route path="/edit/projects/:action" component={Project} />
      <Route path="/project/:id" component={Project}/>
      <Route path="/patterns" component={Patterns}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'));
