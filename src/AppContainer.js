import React from 'react';
import Patterns from 'routes/patterns';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Auth from './routes/auth';
import Dashboard from 'routes/dashboard';
import Project from 'routes/project';
import Login from 'routes/login';
const NoMatch = () => (
  <div className="fourOhFour">
    <h1>404</h1>
  </div>
);
let history = browserHistory;

export default function AppContainer() {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auth" component={Auth} />
        <Route path="/project/:id" component={Project} />
        <Route path="/patterns" component={Patterns} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  );
}
