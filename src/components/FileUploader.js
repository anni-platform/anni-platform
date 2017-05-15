import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FileManager from 'containers/FileManager';

class FileDrop extends Component {

  onDrop(files) {
    this.props.uploadFiles(files, this.props.path, this.props.collection);
  }

  render() {
    return (
      <Dropzone
        onDrop={this.onDrop.bind(this)}
        className="FileDrop"
        activeClassName="active"
        disableClick={true}>
        {this.props.children}
        <p>Drop files here</p>
      </Dropzone>
    );
  }
}

export default FileManager(FileDrop);
