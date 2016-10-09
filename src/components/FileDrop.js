import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadFile, getLink } from '../adapters';

const STATES = {
  EMPTY: 1,
  PREVIEW: 2,
  DONE: 3
};

export default class FileDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.props.path,
      state: STATES.EMPTY,
      src: '',
      preview: null,
      file: null
    }
    this.onDrop = this.onDrop.bind(this);
    this.reUpload = this.reUpload.bind(this);
    this.undo = this.undo.bind(this);
    this.save = this.save.bind(this);
  }

  onDrop(file) {
    this.setState({
      state: STATES.PREVIEW,
      file: file[0],
      preview: file[0].preview
    });
  }

  reUpload() {
    this.setState({
      state: STATES.EMPTY
    });
  }

  undo() {
    const { src, preview } = this.state;
    if (src) {
      this.setState({
        state: STATES.DONE
      });
    } else if (preview) {
      this.setState({
        state: STATES.PREVIEW
      });
    }
  }

  save() {
    uploadFile(this.props.path, this.state.file)
        .then(response => {
          getLink(response.path_display)
            .then((metadata) => {
              const src = metadata.url.replace(/.$/,"1");
              this.setState({ src, state: STATES.DONE });
            });
        })
        .catch(error => {
          console.error(error);
        });
  }

  render() {
    const { state, src, preview } = this.state;
    const { EMPTY, PREVIEW } = STATES;
    const dropzone = (
      <Dropzone onDrop={this.onDrop} multiple={false}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    );
    const imageSource = state === PREVIEW ? preview : src;
    const image = <img src={ imageSource } alt='' />;
    if (state === EMPTY) {
      return (
        <div>
          {dropzone}
          {(preview || src ? <button onClick={ this.undo }>Undo</button>: null)}
        </div>);
    } else {
      return (
        <div>
          {image}
          {(preview ? <button onClick={ this.save }>Save</button> : null)}
          <button onClick={ this.reUpload }>Replace</button>
        </div>
      );
    }
  }
}
