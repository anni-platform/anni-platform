import React, { Component } from 'react';
import Dropbox from 'dropbox';

let client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });


class FileUpload extends Component {
  constructor(props) {
   super(props);
    this.state = {
      path: this.props.path,
      uploadedFile: []
    }
    console.log(this.props.path);
  }

  componentDidMount() {
    const tempFile = new File([""], "filename.txt", { type: "text/plain", lastModified: "date" });

    // Call Dropbox API for content and assign to state
    client.filesUpload({path: this.state.path, contents: tempFile})
      .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.error(error);
        });
  }

  render() {
    return (
      <div />
    )
  }
}

export default FileUpload;
