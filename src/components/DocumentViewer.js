import React, { Component } from 'react';
import Dropbox from 'dropbox';
let client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });

import ImageList from './ImageList'

class DocumentViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {documentItem:[]};

    client.filesUpload({path: props.projectPath + '/Documents'})
      .then(assign => {
        console.log(this);
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>Script</h1>
      </div>
    );
  }
}

export default DocumentViewer;
