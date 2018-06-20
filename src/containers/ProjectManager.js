import React from 'react';
import { connect } from 'react-redux';
import {
  addProject,
  removeProject,
  deleteFile,
  removeFileFromCollection,
  getFilesInProject,
  requestSharedLinks,
} from 'actions';
import {
  getFolder,
  removeFolder,
  // getFilesInFolder,
  // getFolderFiles,
} from 'adapters';
import filter from 'lodash.filter';
import { FILE_DATABASE_DIRECTORY } from 'constants/file';

export default function ProjectManager(Component) {
  class Manager extends Component {
    componentDidMount() {
      this.refreshProjects();
    }
    fetchCurrentProjectFiles = () => {
      this.props.fetchProject(this.props.project.path_display);
    };
    refreshProjects() {
      return new Promise(resolve => {
        getFolder('').then(({ entries }) => {
          entries.forEach((entry, i) => {
            if (entry.name === FILE_DATABASE_DIRECTORY) {
              return;
            }
            const isNewProject = !filter(
              this.props.projects.toJS(),
              p => p.id === entry.id
            ).length;
            if (isNewProject) {
              this.props.addProject(entry);
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
      const projects = Object.keys(this.props.projects.toJS())
        .map(k => this.props.projects.toJS()[k])
        .slice();
      return projects.find(project => project.name === name);
    }
    removeProject(id) {
      const project = this.getProjectByName(id);
      return new Promise(done => {
        removeFolder(project.path_display).then(() => {
          const collectionKeys = Object.keys(
            this.props.files.toJS().collections
          );
          // remove all unused files from store
          Object.keys(this.props.files.toJS().archive).forEach(file => {
            const fileUsed = collectionKeys.map(collection =>
              collection.indexOf(file)
            );
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
      const collections = files.get('collections');
      const archive = files.get('archive');
      return new Promise(done => {
        collections
          .keySeq()
          .toJS()
          .forEach(k => {
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

      const props = {
        ...this.props,
        refreshProjects,
        getProjectByName,
        removeProject,
        fetchCurrentProjectFiles: this.fetchCurrentProjectFiles,
      };

      return <Component {...props} />;
    }
  }
  function mapDispatchToProps(dispatch, props, state) {
    return {
      addProject: project => dispatch(addProject(project)),
      fetchProject: path => dispatch(getFilesInProject(path)),
      requestSharedLinks: path => dispatch(requestSharedLinks(path)),
    };
  }

  function mergeProps(stateProps, dispatchProps, ownProps) {
    const { id: projectId } = ownProps.params || {};
    const projects = Object.values(stateProps.projects.toJS());

    return {
      ...stateProps,
      ...ownProps,
      ...dispatchProps,
      project: projects.find(p => p.name === projectId),
    };
  }
  return connect(
    state => state,
    mapDispatchToProps,
    mergeProps
  )(Manager);
}
