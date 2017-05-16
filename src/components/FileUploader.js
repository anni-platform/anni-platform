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
          <h3 className="instructions">Drag your reference images here to upload</h3>
          <span className="tooltip">Drag your reference images here to upload</span>
        </div>

      </Dropzone>
    );
  }
}

export default FileManager(FileDrop);
