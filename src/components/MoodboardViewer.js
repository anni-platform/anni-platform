import React, { Component } from 'react';
import Dropbox from 'dropbox';
const client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });


class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      MoodboardItems: []
    };
    client.filesListFolder({path: props.projectPath + '/References'})
      .then(FolderContent => {
        this.setState({MoodboardItems: FolderContent.entries});
      }
    );
  }

  render() {
    return (
      <div>Moodboard Viewer Here</div>
    );
  }
}

export default MoodboardViewer;
