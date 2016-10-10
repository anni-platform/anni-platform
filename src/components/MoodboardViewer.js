import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import { getFilesInFolder } from '../adapters';

import ImageList from './ImageList'
import FileDrop from './FileDrop'
import Loader from './Loader';

class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      path: this.props.projectPath,
      moodboardItems: [],
      loading: true
    }
    this.addFile = this.addFile.bind(this);
    // Call Dropbox API for content and assign to state
    getFilesInFolder(`/${this.props.projectPath}`)
      .then(moodboardItems => this.setState({ moodboardItems, loading: false }));
  }

  addFile(src) {
    let items =  this.state.moodboardItems.slice();
    items.push({ src });
    this.setState({
      moodboardItems: items
    });
  }

  render() {
    return (
      <div>
        <h2>{this.props.projectPath} Moodboard</h2>
        <ImageList content={this.state.moodboardItems} />
        <Loader show={this.state.loading} />
        <FileDrop path={this.state.path} addFile={this.addFile}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(MoodboardViewer);
