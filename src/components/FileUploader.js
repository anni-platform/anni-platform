import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../styles/components/FileDrop.styl';
import FileManager from '../containers/FileManager';

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
