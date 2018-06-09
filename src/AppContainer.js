import React from 'react';
import Patterns from 'routes/patterns';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Auth from './routes/auth';
import Dashboard from 'routes/dashboard';
import Project from 'routes/project';
import Animation from 'components/Animation';
import Login from 'routes/login';
import FourOhFour from 'styled/FourOhFour';
const NoMatch = () => (
  <FourOhFour>
    <h1>404</h1>
  </FourOhFour>
);
let history = browserHistory;

const Placeholder = ({ children, ...rest }) => (
  <div>
    {children}
    <pre>{JSON.stringify(rest, null, 2)}</pre>
  </div>
);

export default function AppContainer() {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auth" component={Auth} />
        <Route path="/project" component={Placeholder}>
          <Route path=":id" component={Project} />
          <Route path=":id/animation" component={Animation} />
        </Route>
        <Route path="/patterns" component={Patterns} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  );
}
