import React, { Component } from 'react';
import { getFilesInFolder } from '../adapters';
import ImageList from './ImageList'
import FileDrop from './FileDrop'
import Loader from './Loader';

export default class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      path: this.props.projectPath,
      moodboardItems: [],
      loading: true
    }
    this.addFile = this.addFile.bind(this);
  }

  componentDidMount() {
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
        <h1>{this.props.projectPath} Moodboard</h1>
        <ImageList content={this.state.moodboardItems} />
        <Loader show={this.state.loading} />
        <FileDrop path={this.state.path} addFile={this.addFile}/>
      </div>
    );
  }
}
