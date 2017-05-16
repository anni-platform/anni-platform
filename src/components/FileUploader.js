import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FileManager from 'containers/FileManager';

class FileDrop extends Component {
  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.props.uploadFiles(files, this.props.path, this.props.collection);
  }

  render() {
    return (
      <Dropzone
        onDrop={this.onDrop}
        className="FileUploader"
        activeClassName="active"
        disableClick={true}>
        {this.props.children}
        <div>
          <span>Drop files here</span>
          <span className="activeMessage">Hello</span>
        </div>

      </Dropzone>
    );
  }
}

export default FileManager(FileDrop);
