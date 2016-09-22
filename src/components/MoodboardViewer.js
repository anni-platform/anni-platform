import React, { Component } from 'react';
import Dropbox from 'dropbox';
const client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });

// import ImageList from './ImageList'

class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      MoodboardItems: []
    };
    const result = client.filesListFolder({path: props.projectPath + '/References'})
      .then(res => res.entries)
      .then(entries => entries.map(entry =>
          client.filesGetTemporaryLink({ path: entry.path_lower })))
      .then(actions => Promise.all(actions).catch(console.log))
      .then(results => results.map(result => ({
          name: result.metadata.name,
          link: result.link
      })))
      .catch(console.log)
    console.log(result);
  }

  render() {
    return (
      <div>
        {/* <ImageList content={this.state.MoodboardItems} /> */}
      </div>
    );
  }
}

export default MoodboardViewer;
