import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProject, removeProject } from '../actions';
import { getFolder } from '../adapters';
import filter from 'lodash.filter';

export default function ProjectManager(Component) {
  class Manager extends Component {
    refreshProjects() {
      return new Promise(resolve => {
        getFolder('')
          .then(({ entries }) => {
            entries.forEach((entry, i) => {
              const isNewProject = !filter(this.props.projects, (p) => p.id === entry.id).length;
              if (isNewProject) {
                this.props.dispatch(addProject(entry));
              }
            });
            const ids = entries.map(e => e.id);
            Object.keys(this.props.projects).forEach(id => {
              if (ids.indexOf(id) === -1) {
                this.props.dispatch(removeProject(id));
              }
            });
            resolve();
          });
      });
    }
    getProjectByName(name) {
      const projects = Object.keys(this.props.projects).map(k => this.props.projects[k]).slice();
      return projects.find(project => project.name === name);
    }
    render() {
      const refreshProjects = this.refreshProjects.bind(this);
      const getProjectByName = this.getProjectByName.bind(this);
      return <Component {...this.props} {...{refreshProjects, getProjectByName}} />;
    }
  }
  return connect((state) => state)(Manager);
}
