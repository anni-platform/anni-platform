import React, { Component } from 'react';
import { getFilesInFolder } from 'adapters';
import constants from 'constants';
import { updateProject } from 'actions';
import { makeCancelable } from 'utils';
import FileUploader from 'components/FileUploader';
import Loader from 'components/Loader';
import ImageList from './ImageList';
import FileManager from 'containers/FileManager';

const { MOODBOARD } = constants.content;

class MoodboardViewer extends Component {
  constructor(props) {
   super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const project = this.props.project;
    if (project) {
      this.getFiles = makeCancelable(new Promise(r => {
        getFilesInFolder(`/${this.props.projectPath}`)
        .then(moodboardItems => {
          this.getFiles.resolved = true;
          this.props.dispatch(updateProject({ id: project.id, images: moodboardItems }));
        });
      }));
      this.getFiles
      .promise
      .then(() => this.setState({ loading: false }));
    }
  }

  componentWillUnmount() {
    this.getFiles.cancel();
  }

  render() {
    const project = this.props.project;
    if (!project) {
      return null;
    }
    const { id } = project;
    const path = this.props.projectPath;
    const collectionId = MOODBOARD;
    const images = this.props.getCollectionFiles({ path, collectionId });
    const list = images && images.length ? <ImageList content={images} />: null;
    return (
      <div>
        <h1>Moodboard</h1>
        <FileUploader
          path={this.props.projectPath}
          collection="moodboard"
          onUpload={(images) => this.props.dispatch(updateProject({ id, images }))}>
          {list}
          <Loader show={!project} />
        </FileUploader>
      </div>
    );
  }
}

export default FileManager(MoodboardViewer);
