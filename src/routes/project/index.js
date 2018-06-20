import React, { PureComponent } from 'react';
import { Router } from '@reach/router';
import Headline from './components/Headline';
import { connect } from 'react-redux';
import { Container } from 'styled';
import { FileCollection, Animation } from 'components';
import {
  ProjectControls,
  ProjectSectionNavItem,
} from './components/ProjectControls';
import Script from 'routes/project/script';
import { getProject } from 'selectors/project';
import { getFilesInProject, requestSharedLinks } from 'actions';

function getRoutes({ project }) {
  return [
    {
      default: true,
      Component: Headline,
      project,
      path: '',
      title: project.name,
    },
    {
      Component: Script,
      project,
      path: 'script',
      title: 'Script',
    },
    {
      Component: FileCollection,
      path: 'moodboard',
      title: 'Moodboard',
      project,
    },
    {
      Component: FileCollection,
      path: 'storyboard',
      title: 'Storyboard',
      project,
    },
    {
      Component: FileCollection,
      path: 'styleframes',
      title: 'Styleframes',
      project,
    },
    {
      Component: Animation,
      path: 'animation',
      title: 'Animation',
      project,
    },
  ];
}

class Project extends PureComponent {
  componentDidMount() {
    const { getFilesInProject, requestSharedLinks, project } = this.props;
    const { path_display } = project || {};
    getFilesInProject(path_display);
    requestSharedLinks(path_display);
  }
  render() {
    const routes = getRoutes(this.props);
    return (
      <Container>
        <Router>
          {routes.map(({ Component, ...props }) => (
            <Component key={props.path} {...props} />
          ))}
        </Router>
        <ProjectControls>
          {routes.map(({ to, path, title }) => (
            <ProjectSectionNavItem key={path} to={path} name={title} />
          ))}
        </ProjectControls>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => ({
  project: getProject(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFilesInProject: path => dispatch(getFilesInProject(path)),
  requestSharedLinks: path => dispatch(requestSharedLinks(path)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
