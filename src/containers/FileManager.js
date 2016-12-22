import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadFile, getLink } from 'adapters';
import { addFile } from 'actions';
import AuthManager from './AuthManager';
// import filter from 'lodash.filter';

export default function FileManager(Component) {
  class Manager extends Component {
    uploadFiles(files, path, collectionId) {
      this.props.validateAuthentication();
      return new Promise((resolve, reject) => {
        Promise.all(files.map(file => uploadFile(path, file)))
        .then(uploadedFiles => {
          Promise.all(uploadedFiles.map(file => getLink(file.path_display)))
          .then((linkedFiles) => {
            const processedFiles = uploadedFiles.map((f, i) => {
              const fileMeta = linkedFiles[i];
              fileMeta.url = fileMeta.url.replace(/.$/,"1");
              return { ...f, ...fileMeta }
            });
            processedFiles.forEach((file) => this.addFile(file, path, collectionId));
          });
        });

      });
    }
    addFile(file, path, collectionId) {
      this.props.validateAuthentication();
      this.props.dispatch(addFile(file, path, collectionId));
    }
    render() {
      const uploadFiles = this.uploadFiles.bind(this);
      return <Component {...this.props} {...{uploadFiles}} />;
    }
  }
  return connect((state) => state)(AuthManager(Manager));
}
