import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProject, removeProject, deleteFile, removeFileFromCollection } from 'actions';
import { getFolder, removeFolder } from 'adapters';
import filter from 'lodash.filter';
import { FILE_DATABASE_DIRECTORY } from 'constants/file';

export default function ProjectManager(Component) {
  class Manager extends Component {
    refreshProjects() {
      return new Promise(resolve => {
        getFolder('')
          .then(({ entries }) => {
            entries.forEach((entry, i) => {
              if (entry.name === FILE_DATABASE_DIRECTORY) {
                return;
              }
              const isNewProject = !filter(this.props.projects.toJS(), (p) => p.id === entry.id).length;
              if (isNewProject) {
                this.props.dispatch(addProject(entry));
              }
            });
            const ids = entries.map(e => e.id);
            Object.keys(this.props.projects.toJS()).forEach(id => {
              if (ids.indexOf(id) === -1) {
                this.props.dispatch(removeProject(id));
              }
            });
            resolve();
          });
      });
    }
    getProjectByName(name) {
      const projects = Object.keys(this.props.projects.toJS()).map(k => this.props.projects.toJS()[k]).slice();
      return projects.find(project => project.name === name);
    }
    removeProject(id) {
      const project = this.getProjectByName(id);
      return new Promise(done => {
        removeFolder(project.path_display).then(() => {
          const collectionKeys = Object.keys(this.props.files.toJS().collections);
          // remove all unused files from store
          Object.keys(this.props.files.toJS().archive).forEach(file => {
            const fileUsed = collectionKeys.map(collection => collection.indexOf(file));
            if (!filter(fileUsed, i => i > -1).length) {
              this.props.dispatch(deleteFile(file));
            }
          });
        });
        this.cleanCollections().then(() => {
          this.props.dispatch(removeProject(project.id, id));
          done();
        });
      });
      
    }
    cleanCollections() {
      const { files, dispatch } = this.props;
      const collections = files.get("collections");
      const archive = files.get("archive");
      return new Promise(done => {
        collections.keySeq().toJS().forEach(k => {
          let collection = collections.get(k).toJS();
          collection.forEach((item, index) => {
            if (!archive.has(item)) {
              dispatch(removeFileFromCollection(item.id, k));
            }
          });
        });
        done();
      });
    }
    render() {
      const refreshProjects = this.refreshProjects.bind(this);
      const getProjectByName = this.getProjectByName.bind(this);
      const removeProject = this.removeProject.bind(this);
      return <Component {...this.props} {...{refreshProjects, getProjectByName, removeProject}} />;
    }
  }
  return connect((state) => state)(Manager);
}
