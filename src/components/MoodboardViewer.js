import React, { Component } from 'react';
import Dropbox from 'dropbox';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
let client = new Dropbox({ accessToken: process.env.CONFIG.DROPBOX_TOKEN });

import ImageList from './ImageList'
import FileDrop from './FileDrop'

class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      path: this.props.projectPath + '/References',
      moodboardItems: []
    }

    // Call Dropbox API for content and assign to state
    client.filesListFolder({path: this.state.path})
      .then(result => result.entries)
      .then(entries => entries.map(entry =>
          client.filesGetTemporaryLink({ path: entry.path_lower })))
      .then(actions => Promise.all(actions).catch(console.log))
      .then(results => results.map(result => ({
          name: result.metadata.name,
          link: result.link
      })))
      .then(assign => {
        this.setState({moodboardItems:assign})
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h2>Moodboard</h2>
        <ImageList content={this.state.moodboardItems} />
        <FileDrop path={this.state.path} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(MoodboardViewer);
