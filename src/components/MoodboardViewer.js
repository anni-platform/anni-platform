import React, { Component } from 'react';
import Dropbox from 'dropbox';
let client = new Dropbox({ accessToken: 'cOE9hfHzuGYAAAAAAAAVgJXmZqSqDCE-1U-3NX7YxciSVg6gccmF1HVL93qXQXdA' });

import ImageList from './ImageList'

class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      MoodboardItems: []
    }

    // Call Dropbox API for content and assign to state
    client.filesListFolder({path: props.projectPath + '/References'})
      .then(result => result.entries)
      .then(entries => entries.map(entry =>
          client.filesGetTemporaryLink({ path: entry.path_lower })))
      .then(actions => Promise.all(actions).catch(console.log))
      .then(results => results.map(result => ({
          name: result.metadata.name,
          link: result.link
      })))
      .then(assign => {
        this.setState({MoodboardItems:assign})
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>Moodboard</h1>
        <ImageList content={this.state.MoodboardItems} />
      </div>
    );
  }
}

export default MoodboardViewer;
