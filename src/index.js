import React from 'react';
import App from './App';
import Projects from './containers/Projects';
import Project from './components/Project';
import ProjectDetail from './views/ProjectDetail';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
const NoMatch = null;

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Projects} />
      <Route path="/edit/projects/:action" component={Project} />
      <Route path="/project/:id" component={ProjectDetail}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'));
