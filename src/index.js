import React from 'react';
import App from './App';
import Projects from './components/ProjectList';
import Project from './components/Project';
import Landing from './components/Landing';
import Auth from './components/Auth';
import 'normalize.css';
import './stylus/Main.styl';
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
      <IndexRoute component={Landing} />
      <Route path="/dashboard" component={Projects} />
      <Route path="/auth" component={Auth} />
      <Route path="/edit/projects/:action" component={Project} />
      <Route path="/project/:id" component={ProjectDetail}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('root'));
